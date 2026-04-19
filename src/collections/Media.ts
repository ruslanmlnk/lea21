import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      localized: true,
      type: 'text',
      required: true,
    },
    {
      name: 'seedKey',
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
      },
      index: true,
      unique: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*'],
  },
}
