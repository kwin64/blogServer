export type DBtypes = { blogs: blogType[]; posts: postType[] };

export type postType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export type blogType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
