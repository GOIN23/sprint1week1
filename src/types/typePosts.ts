export type PostViewModelT = {
  id: string;
  title:string,
  shortDescription:string,
  content:string,
  blogId:string,
  blogName:string
};

export type PostInputModelT = {
  title:string,
  shortDescription:string,
  content:string,
  blogId:string,
};


export type dbPT = {
  dbPosts:PostViewModelT[]
}