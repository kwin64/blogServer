export type BlogsServiceinputDataType = {
  name: 'string';
  description: 'string';
  websiteUrl: 'string';
};

export type PostsServiceinputDataType = {
  title: 'string';
  shortDescription: 'string';
  content: 'string';
  blogId: 'string';
  blogName: 'string';
};
