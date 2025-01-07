import { DBtypes } from './DB.types';

const DB: DBtypes = {
  posts: [
    {
      id: 'string',
      title: 'string',
      shortDescription: 'string',
      content: 'string',
      blogId: 'string',
      blogName: 'string',
    },
  ],
  blogs: [
    {
      id: 'string',
      name: 'string',
      description: 'string',
      websiteUrl: 'string',
    },
  ],
};
export default DB;
