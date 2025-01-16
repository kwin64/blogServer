export type DBtypes = { blogs: blogType[]; posts: postType[] };

export type blogType = {
  name: string;
  description: string;
  websiteUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type postType = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
