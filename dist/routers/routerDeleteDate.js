"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerDeletDate = void 0;
const express_1 = __importDefault(require("express"));
const routerDeletDate = (dbBlog, dbPosts) => {
    const router = express_1.default.Router();
    router.delete("/", (req, res) => {
        let a = {};
        dbBlog.dbBlogs = [];
        dbPosts.dbPosts = [];
        res.sendStatus(204);
        return;
    });
    return router;
};
exports.routerDeletDate = routerDeletDate;
