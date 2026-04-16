'use client'

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type SyntheticEvent,
} from 'react'

type SmoothImageProps = ComponentPropsWithoutRef<'img'>

export function SmoothImage({
  className,
  onError,
  onLoad,
  src,
  ...props
}: SmoothImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  const revealImage = (image: HTMLImageElement) => {
    const finish = () => {
      window.requestAnimationFrame(() => {
        setLoaded(true)
      })
    }

    if (typeof image.decode === 'function') {
      void image.decode().then(finish, finish)
      return
    }

    finish()
  }

  useEffect(() => {
    setLoaded(false)

    const image = imageRef.current

    if (!image) {
      return
    }

    const handleNativeLoad = () => {
      revealImage(image)
    }

    const handleNativeError = () => {
      setLoaded(true)
    }

    image.addEventListener('load', handleNativeLoad)
    image.addEventListener('error', handleNativeError)

    if (image.complete) {
      if (image.naturalWidth > 0) {
        revealImage(image)
      } else {
        setLoaded(true)
      }
    }

    return () => {
      image.removeEventListener('load', handleNativeLoad)
      image.removeEventListener('error', handleNativeError)
    }
  }, [src])

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
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
