export type DBtypes = { blogs: blogType[]; posts: postType[] };

export type blogType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export type postType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
