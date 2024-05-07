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
exports.repositoryPosts = exports.dbP = void 0;
exports.dbP = {
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
exports.repositoryPosts = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.dbP.dbPosts;
        });
    },
    creatPosts(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let idPostss = Math.random();
            const newPosts = {
                id: idPostss.toString(),
                title: body.title,
                shortDescription: body.shortDescription,
                blogId: body.blogId,
                blogName: "no name",
                content: body.content,
            };
            exports.dbP.dbPosts.push(newPosts);
            return newPosts;
        });
    },
    findPosts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = exports.dbP.dbPosts.find((b) => b.id === id);
            if (!result) {
                return null;
            }
            return result;
        });
    },
    updatPosts(body, posts) {
        return __awaiter(this, void 0, void 0, function* () {
            (posts.title = body.title), (posts.shortDescription = body.shortDescription), (posts.content = body.content), (posts.blogId = body.blogId);
        });
    },
    deletePosts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.dbP.dbPosts = exports.dbP.dbPosts.filter((b) => b.id !== id);
        });
    },
};
