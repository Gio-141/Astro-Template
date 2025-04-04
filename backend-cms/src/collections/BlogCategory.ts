import type { CollectionConfig } from 'payload';

export const BlogCategory: CollectionConfig = {
  slug: 'blog-category',
  labels: {
    singular: 'Blog Category',
    plural: 'Blog Categories',
  }, access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
  ],
};
