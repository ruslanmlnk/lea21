import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    plural: 'Заявки з форми',
    singular: 'Заявка з форми',
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'status', 'updatedAt'],
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'firstName',
      label: 'Імʼя',
      required: true,
      type: 'text',
    },
    {
      name: 'lastName',
      label: 'Прізвище',
      required: true,
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      required: true,
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Телефон',
      required: true,
      type: 'text',
    },
    {
      name: 'message',
      label: 'Повідомлення',
      required: true,
      type: 'textarea',
    },
    {
      name: 'status',
      label: 'Статус',
      defaultValue: 'new',
      options: [
        {
          label: 'Нова',
          value: 'new',
        },
        {
          label: 'В обробці',
          value: 'in-progress',
        },
        {
          label: 'Опрацьована',
          value: 'resolved',
        },
      ],
      type: 'select',
    },
  ],
}
