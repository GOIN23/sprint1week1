"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routerBlogs_1 = require("./routers/routerBlogs");
const routerPosts_1 = require("./routers/routerPosts");
const routerDeleteDate_1 = require("./routers/routerDeleteDate");
const repositoryBlogs_1 = require("./Repository/repositoryBlogs");
const repositoryPosts_1 = require("./Repository/repositoryPosts");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/blogs", (0, routerBlogs_1.routerBlogs)());
exports.app.use("/api/posts", (0, routerPosts_1.routerPosts)());
exports.app.use("/api/testing/all-data", (0, routerDeleteDate_1.routerDeletDate)(repositoryBlogs_1.dbB, repositoryPosts_1.dbP));
