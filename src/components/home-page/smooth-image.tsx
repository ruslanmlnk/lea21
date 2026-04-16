'use client'

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type SyntheticEvent,
} from 'react'

type SmoothImageProps = ComponentPropsWithoutRef<'img'> & {
  reveal?: 'decode' | 'load' | 'none'
}

export function SmoothImage({
  className,
  onError,
  onLoad,
  reveal = 'decode',
  src,
  ...props
}: SmoothImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(reveal === 'none')

  const revealImage = (image: HTMLImageElement) => {
    const finish = () => {
      window.requestAnimationFrame(() => {
        setLoaded(true)
      })
    }

    if (reveal === 'decode' && typeof image.decode === 'function') {
      void image.decode().then(finish, finish)
      return
    }

    finish()
  }

  useEffect(() => {
    if (reveal === 'none') {
      setLoaded(true)
      return
    }

    setLoaded(false)

    const image = imageRef.current

    if (!image) {
      return
    }

    if (image.complete) {
      if (image.naturalWidth > 0) {
        revealImage(image)
      } else {
        setLoaded(true)
      }
    }
  }, [reveal, src])

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (reveal === 'none') {
      setLoaded(true)
      onLoad?.(event)
      return
    }

    revealImage(event.currentTarget)
    onLoad?.(event)
  }

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true)
    onError?.(event)
  }

  return (
    <img
      {...props}
      ref={imageRef}
      src={src}
      className={['smooth-image', className].filter(Boolean).join(' ')}
      data-loaded={loaded ? 'true' : 'false'}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}
