"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryBlogs = exports.dbB = void 0;
exports.dbB = {
    dbBlogs: [
        {
            id: "1",
            description: "DSDSDS",
            name: "Ali",
            websiteUrl: "https://sinyakov.com/frontend/problems.html",
        },
    ],
};
// export let dbBlogs: BlogViewModelT[] = [
//   {
//     id: "1",
//     description: "DSDSDS",
//     name: "Ali",
//     websiteUrl: "https://sinyakov.com/frontend/problems.html",
//   },
// ];
exports.repositoryBlogs = {
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.dbB.dbBlogs;
        });
    },
    createBlogs(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let idBlogs = Math.random();
            let newBlog = {
                id: idBlogs.toString(),
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl,
            };
            exports.dbB.dbBlogs.push(newBlog);
            return newBlog;
        });
    },
    findBlogs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = exports.dbB.dbBlogs.find((b) => b.id === id);
            if (!result) {
                return null;
            }
            return result;
        });
    },
    updatBlogs(body, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            (blog.name = body.name), (blog.description = body.description);
            blog.websiteUrl = body.websiteUrl;
        });
    },
    deleteBlogs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.dbB.dbBlogs = exports.dbB.dbBlogs.filter((b) => b.id !== id);
        });
    },
};
