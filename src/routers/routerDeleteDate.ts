import express, { Request, Response } from "express";
import { BlogViewModelT, dbBl } from "../types/typeBlog";
import { PostViewModelT, dbPT } from "../types/typePosts";

export const routerDeletDate = (dbBlog: dbBl, dbPosts: dbPT) => {
  const router = express.Router();

  router.delete("/", (req: Request, res: Response) => {
    let a = {}
    dbBlog.dbBlogs = [];
    dbPosts.dbPosts = [];

    res.sendStatus(204);
    return;
  });

  return router;
};
