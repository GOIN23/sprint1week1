import express from "express";
import { routerBlogs } from "./routers/routerBlogs";
import { routerPosts } from "./routers/routerPosts";
import { routerDeletDate } from "./routers/routerDeleteDate";
import { dbB } from "./Repository/repositoryBlogs";
import { dbP } from "./Repository/repositoryPosts";

export const app = express();

app.use(express.json());
app.use("/api/blogs", routerBlogs());
app.use("/api/posts", routerPosts());
app.use("/api/testing/all-data", routerDeletDate(dbB, dbP));
