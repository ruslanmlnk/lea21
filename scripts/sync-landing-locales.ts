import { getPayload } from 'payload'

import configPromise from '../src/payload.config'
import { syncLandingPageGlobal } from '../src/lib/landing-media'

const payload = await getPayload({ config: configPromise })

await syncLandingPageGlobal(payload)

await payload.destroy()
