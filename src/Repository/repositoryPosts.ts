import { PostViewModelT, PostInputModelT, dbPT } from "./../types/typePosts";



export const dbP: dbPT = {
  dbPosts: [
    {
      id: "1",
      blogId: "1",
      blogName: "alidas",
      content: "dsadasdsa",
      shortDescription: "dsdsds",
      title: "sdsds",
    },
   
  ],
};



export const repositoryPosts = {
  async getPosts(): Promise<PostViewModelT[]> {
    return dbP.dbPosts;
  },

  async creatPosts(body: PostInputModelT): Promise<PostViewModelT> {
    let idPostss = Math.random()

    const newPosts: PostViewModelT = {
      id:  idPostss.toString(),
      title: body.title,
      shortDescription: body.shortDescription,
      blogId: body.blogId,
      blogName: "no name",
      content: body.content,
    };

    dbP.dbPosts.push(newPosts);

    return newPosts
  },

  async findPosts(id: string): Promise<PostViewModelT | null> {
    const result = dbP.dbPosts.find((b) => b.id === id);
    if (!result) {
      return null;
    }
    return result;
  },

  async updatPosts(body: PostInputModelT, posts: PostViewModelT): Promise<void> {
    (posts.title = body.title), (posts.shortDescription = body.shortDescription), (posts.content = body.content), (posts.blogId = body.blogId);
  },

  async deletePosts(id: string): Promise<void> {
    dbP.dbPosts = dbP.dbPosts.filter((b) => b.id !== id);
  },
};
