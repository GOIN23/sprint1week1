import { BlogInputModelT, BlogViewModelT, dbBl, } from "../types/typeBlog";



export const dbB: dbBl = {
  dbBlogs: [
    {
      id: "1",
      description: "DSDSDS",
      name: "Ali",
      websiteUrl: "https://sinyakov.com/frontend/problems.html",
    },
   
  ],
};








export const repositoryBlogs = {
  async getBlogs(): Promise<BlogViewModelT[]> {
    return dbB.dbBlogs;
  },
  async createBlogs(body: BlogInputModelT): Promise<BlogViewModelT> {
    let idBlogs = Math.random()
    let newBlog: BlogViewModelT = {
      id: idBlogs.toString(),
      name: body.name,
      description: body.description,
      websiteUrl: body.websiteUrl,
    };

    dbB.dbBlogs.push(newBlog);
    return newBlog
  },
  async findBlogs(id: string): Promise<BlogViewModelT | null> {
    const result = dbB.dbBlogs.find((b) => b.id === id);
    if (!result) {
      return null;
    }
    return result;
  },
  async updatBlogs(body: BlogInputModelT, blog: BlogInputModelT): Promise<void> {
    (blog.name = body.name), (blog.description = body.description);
    blog.websiteUrl = body.websiteUrl;
  },
  async deleteBlogs(id: string): Promise<void> {
    dbB.dbBlogs = dbB.dbBlogs.filter((b) => b.id !== id);
  },
};
