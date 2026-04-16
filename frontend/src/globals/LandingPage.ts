import type { DefaultValue, Field, GlobalConfig } from 'payload'

import { landingPageCmsDefaults } from '@/lib/landing-media'

const imageAssetField = (
  name: string,
  label: string,
): Field => ({
  name,
  label,
  relationTo: 'media',
  required: true,
  type: 'upload',
})

const linkFields: Field[] = [
  {
    name: 'label',
    label: 'Текст',
    required: true,
    type: 'text',
  },
  {
    name: 'href',
    label: 'Посилання',
    required: true,
    type: 'text',
  },
]

const collapsedArrayAdmin = {
  initCollapsed: true,
}

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Контент',
  },
  label: 'Лендінг',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контент',
          description: 'Основні секції лендингу та програма.',
          fields: [
            {
              name: 'seo',
              label: 'SEO',
              type: 'group',
              defaultValue: landingPageCmsDefaults.seo as DefaultValue,
              fields: [
                {
                  name: 'metaTitle',
                  label: 'Meta title',
                  required: true,
                  type: 'text',
                },
                {
                  name: 'metaDescription',
                  label: 'Meta description',
                  required: true,
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'header',
              label: 'Шапка',
              type: 'group',
              defaultValue: landingPageCmsDefaults.header as DefaultValue,
              fields: [
                {
                  name: 'logoText',
                  label: 'Логотип',
                  required: true,
                  type: 'text',
                },
                {
                  name: 'ctaLabel',
                  label: 'Текст кнопки',
                  required: true,
                  type: 'text',
                },
                {
                  name: 'navItems',
                  label: 'Пункти меню',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.header as { navItems?: unknown[] } | undefined)
                      ?.navItems ?? [],
                  admin: {
                    hidden: true,
                  },
                  fields: linkFields,
                },
              ],
            },
            {
              name: 'hero',
              label: 'Перший екран',
              type: 'group',
              defaultValue: landingPageCmsDefaults.hero as DefaultValue,
              fields: [
                { name: 'titleLineOne', label: 'Перший рядок', required: true, type: 'text' },
                { name: 'titleLineTwo', label: 'Другий рядок', required: true, type: 'text' },
                { name: 'script', label: 'Script-слово', required: true, type: 'text' },
                { name: 'subtitle', label: 'Підзаголовок', required: true, type: 'text' },
                { name: 'description', label: 'Опис mobile', required: true, type: 'textarea' },
                {
                  name: 'desktopDescription',
                  label: 'Опис desktop',
                  required: true,
                  type: 'textarea',
                },
                { name: 'availability', label: 'Текст формату', required: true, type: 'textarea' },
                { name: 'durationValue', label: 'Тривалість', required: true, type: 'text' },
                {
                  name: 'durationLabel',
                  label: 'Підпис тривалості',
                  required: true,
                  type: 'text',
                },
                imageAssetField('backgroundImage', 'Фон секції'),
                imageAssetField('figureImage', 'Основне зображення'),
              ],
            },
            {
              name: 'project',
              label: 'Проєкт',
              type: 'group',
              defaultValue: landingPageCmsDefaults.project as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'scriptTitle', label: 'Script-заголовок', required: true, type: 'text' },
                { name: 'intro', label: 'Інтро', required: true, type: 'textarea' },
                { name: 'body', label: 'Основний текст', required: true, type: 'textarea' },
                { name: 'ctaLabel', label: 'Текст кнопки', required: true, type: 'text' },
                {
                  name: 'ctaHref',
                  label: 'Посилання кнопки',
                  required: true,
                  type: 'text',
                  admin: {
                    hidden: true,
                  },
                },
                imageAssetField('image', 'Зображення блоку'),
              ],
            },
            {
              name: 'forWho',
              label: 'Для кого',
              type: 'group',
              defaultValue: landingPageCmsDefaults.forWho as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'scriptTitle', label: 'Script-заголовок', required: true, type: 'text' },
                {
                  name: 'primaryItems',
                  label: 'Перший ряд',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.forWho as { primaryItems?: unknown[] } | undefined)
                      ?.primaryItems ?? [],
                  admin: collapsedArrayAdmin,
                  fields: [
                    {
                      name: 'icon',
                      label: 'Іконка',
                      required: true,
                      type: 'select',
                      options: [
                        { label: 'battery', value: 'battery' },
                        { label: 'heart', value: 'heart' },
                        { label: 'mind', value: 'mind' },
                        { label: 'shield', value: 'shield' },
                        { label: 'smile', value: 'smile' },
                        { label: 'apple', value: 'apple' },
                        { label: 'flower', value: 'flower' },
                      ],
                    },
                    {
                      name: 'label',
                      label: 'Текст',
                      required: true,
                      type: 'textarea',
                    },
                  ],
                },
                {
                  name: 'secondaryItems',
                  label: 'Другий ряд',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.forWho as { secondaryItems?: unknown[] } | undefined)
                      ?.secondaryItems ?? [],
                  admin: collapsedArrayAdmin,
                  fields: [
                    {
                      name: 'icon',
                      label: 'Іконка',
                      required: true,
                      type: 'select',
                      options: [
                        { label: 'battery', value: 'battery' },
                        { label: 'heart', value: 'heart' },
                        { label: 'mind', value: 'mind' },
                        { label: 'shield', value: 'shield' },
                        { label: 'smile', value: 'smile' },
                        { label: 'apple', value: 'apple' },
                        { label: 'flower', value: 'flower' },
                      ],
                    },
                    {
                      name: 'label',
                      label: 'Текст',
                      required: true,
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
            {
              name: 'results',
              label: 'Результати',
              type: 'group',
              defaultValue: landingPageCmsDefaults.results as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'summary', label: 'Короткий опис', required: true, type: 'textarea' },
                imageAssetField('backgroundImage', 'Фон секції'),
                imageAssetField('image', 'Зображення блоку'),
                {
                  name: 'items',
                  label: 'Пункти результатів',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.results as { items?: unknown[] } | undefined)
                      ?.items ?? [],
                  admin: collapsedArrayAdmin,
                  fields: [
                    { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                    { name: 'description', label: 'Опис', required: true, type: 'textarea' },
                  ],
                },
              ],
            },
            {
              name: 'process',
              label: 'Як працює проєкт',
              type: 'group',
              defaultValue: landingPageCmsDefaults.process as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'scriptTitle', label: 'Script-заголовок', required: true, type: 'text' },
                {
                  name: 'steps',
                  label: 'Кроки',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.process as { steps?: unknown[] } | undefined)
                      ?.steps ?? [],
                  admin: collapsedArrayAdmin,
                  fields: [
                    { name: 'title', label: 'Назва', required: true, type: 'text' },
                    { name: 'description', label: 'Опис', required: true, type: 'textarea' },
                    { name: 'raised', label: 'Піднята картка', type: 'checkbox' },
                  ],
                },
              ],
            },
            {
              name: 'program',
              label: 'Програма',
              type: 'group',
              defaultValue: landingPageCmsDefaults.program as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                {
                  name: 'modules',
                  label: 'Модулі',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.program as { modules?: unknown[] } | undefined)
                      ?.modules ?? [],
                  admin: collapsedArrayAdmin,
                  fields: [
                    { name: 'title', label: 'Назва модуля', required: true, type: 'text' },
                    { name: 'description', label: 'Текст', type: 'textarea' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Довіра',
          description: 'Експертність, сертифікати та відгуки.',
          fields: [
            {
              name: 'expertise',
              label: 'Про мене',
              type: 'group',
              defaultValue: landingPageCmsDefaults.expertise as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'scriptTitle', label: 'Script-заголовок', required: true, type: 'text' },
                {
                  name: 'description',
                  label: 'Опис праворуч',
                  required: true,
                  type: 'textarea',
                },
                { name: 'intro', label: 'Лівий текст', required: true, type: 'textarea' },
                imageAssetField('image', 'Фото'),
                {
                  name: 'stats',
                  label: 'Переваги / статистика',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.expertise as { stats?: unknown[] } | undefined)
                      ?.stats ?? [],
                  admin: collapsedArrayAdmin,
                  fields: [
                    { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                    { name: 'description', label: 'Опис', required: true, type: 'text' },
                    {
                      name: 'align',
                      label: 'Вирівнювання',
                      required: true,
                      type: 'select',
                      options: [
                        { label: 'start', value: 'start' },
                        { label: 'end', value: 'end' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'certificates',
              label: 'Сертифікати',
              type: 'group',
              defaultValue: landingPageCmsDefaults.certificates as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'scriptWordOne', label: 'Script-слово 1', required: true, type: 'text' },
                { name: 'scriptWordTwo', label: 'Script-слово 2', required: true, type: 'text' },
                {
                  name: 'items',
                  label: 'Сертифікати',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.certificates as { items?: unknown[] } | undefined)
                      ?.items ?? [],
                  admin: collapsedArrayAdmin,
                  fields: [
                    {
                      name: 'label',
                      label: 'Label',
                      required: true,
                      type: 'text',
                      admin: {
                        hidden: true,
                        readOnly: true,
                      },
                    },
                    imageAssetField('image', 'Зображення сертифіката'),
                  ],
                },
              ],
            },
            {
              name: 'reviews',
              label: 'Відгуки',
              type: 'group',
              defaultValue: landingPageCmsDefaults.reviews as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'scriptTitle', label: 'Script-заголовок', required: true, type: 'text' },
                {
                  name: 'items',
                  label: 'Елементи відгуків',
                  type: 'blocks',
                  defaultValue:
                    (landingPageCmsDefaults.reviews as { items?: unknown[] } | undefined)?.items ??
                    [],
                  admin: {
                    description: 'Натисни "Add" і вибери тип блоку: відео або текстовий відгук.',
                    initCollapsed: true,
                  },
                  blocks: [
                    {
                      slug: 'videoReview',
                      labels: {
                        singular: 'Відео-відгук',
                        plural: 'Відео-відгуки',
                      },
                      fields: [
                        {
                          name: 'video',
                          label: 'Відеофайл',
                          relationTo: 'media',
                          type: 'upload',
                          admin: {
                            description:
                              'Завантаж реальне відео для відгуку. Підходять mp4 / mov / webm, і на фронті воно відкриється після кліку по картці.',
                          },
                        },
                        {
                          name: 'image',
                          label: 'Обкладинка відео',
                          relationTo: 'media',
                          required: true,
                          type: 'upload',
                        },
                        {
                          name: 'avatar',
                          label: 'Аватар',
                          relationTo: 'media',
                          required: true,
                          type: 'upload',
                        },
                        { name: 'name', label: 'Ім’я', required: true, type: 'text' },
                      ],
                    },
                    {
                      slug: 'textReview',
                      labels: {
                        singular: 'Текстовий відгук',
                        plural: 'Текстові відгуки',
                      },
                      fields: [
                        {
                          name: 'text',
                          label: 'Текст відгуку',
                          required: true,
                          type: 'textarea',
                        },
                        {
                          name: 'avatar',
                          label: 'Аватар',
                          relationTo: 'media',
                          required: true,
                          type: 'upload',
                        },
                        { name: 'name', label: 'Ім’я', required: true, type: 'text' },
                      ],
                    },
                  ],
                },
                {
                  name: 'videoItems',
                  label: 'Legacy video reviews',
                  type: 'array',
                  defaultValue: [],
                  admin: {
                    hidden: true,
                  },
                  fields: [
                    {
                      name: 'image',
                      label: 'Preview image',
                      relationTo: 'media',
                      required: true,
                      type: 'upload',
                    },
                    {
                      name: 'avatar',
                      label: 'Avatar image',
                      relationTo: 'media',
                      required: true,
                      type: 'upload',
                    },
                    { name: 'name', label: 'Ім’я', required: true, type: 'text' },
                  ],
                },
                {
                  name: 'textItems',
                  label: 'Legacy text reviews',
                  type: 'array',
                  defaultValue: [],
                  admin: {
                    hidden: true,
                  },
                  fields: [
                    { name: 'text', label: 'Відгук', required: true, type: 'textarea' },
                    {
                      name: 'avatar',
                      label: 'Avatar image',
                      relationTo: 'media',
                      required: true,
                      type: 'upload',
                    },
                    { name: 'name', label: 'Ім’я', required: true, type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Конверсія',
          description: 'Заклик до дії, форма та футер.',
          fields: [
            {
              name: 'cta',
              label: 'CTA',
              type: 'group',
              defaultValue: landingPageCmsDefaults.cta as DefaultValue,
              fields: [
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'description', label: 'Опис', required: true, type: 'textarea' },
                { name: 'buttonLabel', label: 'Текст кнопки', required: true, type: 'text' },
                {
                  name: 'buttonHref',
                  label: 'Посилання кнопки',
                  required: true,
                  type: 'text',
                  admin: {
                    hidden: true,
                  },
                },
                imageAssetField('backgroundImage', 'Фон секції'),
              ],
            },
            {
              name: 'contact',
              label: 'Форма',
              type: 'group',
              defaultValue: landingPageCmsDefaults.contact as DefaultValue,
              fields: [
                { name: 'eyebrow', label: 'Eyebrow', required: true, type: 'text' },
                { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                { name: 'script', label: 'Script-заголовок', required: true, type: 'text' },
                imageAssetField('image', 'Зображення секції'),
                {
                  name: 'placeholders',
                  label: 'Плейсхолдери',
                  type: 'group',
                  fields: [
                    { name: 'firstName', label: 'Ім’я', required: true, type: 'text' },
                    { name: 'lastName', label: 'Прізвище', required: true, type: 'text' },
                    { name: 'email', label: 'Email', required: true, type: 'text' },
                    { name: 'phone', label: 'Телефон', required: true, type: 'text' },
                    { name: 'message', label: 'Повідомлення', required: true, type: 'text' },
                  ],
                },
                { name: 'submitLabel', label: 'Текст кнопки', required: true, type: 'text' },
                {
                  name: 'successMessage',
                  label: 'Повідомлення успіху',
                  required: true,
                  type: 'text',
                },
                {
                  name: 'errorMessage',
                  label: 'Повідомлення помилки',
                  required: true,
                  type: 'text',
                },
              ],
            },
            {
              name: 'footer',
              label: 'Footer',
              type: 'group',
              defaultValue: landingPageCmsDefaults.footer as DefaultValue,
              fields: [
                {
                  name: 'leftLinks',
                  label: 'Ліві посилання',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.footer as { leftLinks?: unknown[] } | undefined)
                      ?.leftLinks ?? [],
                  admin: {
                    hidden: true,
                  },
                  fields: linkFields,
                },
                {
                  name: 'rightLinks',
                  label: 'Праві посилання',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.footer as { rightLinks?: unknown[] } | undefined)
                      ?.rightLinks ?? [],
                  admin: {
                    hidden: true,
                  },
                  fields: linkFields,
                },
                { name: 'logoText', label: 'Лого', required: true, type: 'text' },
                {
                  name: 'socialLinks',
                  label: 'Соцмережі',
                  type: 'array',
                  defaultValue:
                    (landingPageCmsDefaults.footer as { socialLinks?: unknown[] } | undefined)
                      ?.socialLinks ?? [],
                  admin: {
                    hidden: true,
                  },
                  fields: [
                    { name: 'label', label: 'Скорочення', required: true, type: 'text' },
                    { name: 'url', label: 'URL', required: true, type: 'text' },
                  ],
                },
                {
                  name: 'contact',
                  label: 'Контакт для зв’язку',
                  type: 'group',
                  admin: {
                    hidden: true,
                  },
                  fields: [
                    { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                    { name: 'label', label: 'Текст', required: true, type: 'text' },
                    { name: 'href', label: 'Посилання', required: true, type: 'text' },
                  ],
                },
                {
                  name: 'write',
                  label: 'Написати мені',
                  type: 'group',
                  admin: {
                    hidden: true,
                  },
                  fields: [
                    { name: 'title', label: 'Заголовок', required: true, type: 'text' },
                    { name: 'label', label: 'Текст', required: true, type: 'text' },
                    { name: 'href', label: 'Посилання', required: true, type: 'text' },
                  ],
                },
                {
                  name: 'socialsTitle',
                  label: 'Заголовок соцмереж',
                  required: true,
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
