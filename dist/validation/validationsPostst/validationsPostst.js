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
exports.validablogIdPostsCustm = exports.validablogIdPosts = exports.validaContentPosts = exports.validaShortDescriptionPosts = exports.validaTitlePosts = void 0;
const express_validator_1 = require("express-validator");
const repositoryBlogs_1 = require("../../Repository/repositoryBlogs");
exports.validaTitlePosts = (0, express_validator_1.body)("title").trim().exists().isString().isLength({ max: 30, min: 1 });
exports.validaShortDescriptionPosts = (0, express_validator_1.body)("shortDescription").trim().exists().isString().isLength({ max: 100, min: 1 });
exports.validaContentPosts = (0, express_validator_1.body)("content").trim().exists().isString().isLength({ max: 1000, min: 1 });
exports.validablogIdPosts = (0, express_validator_1.body)("blogId").trim().exists().isString().isLength({ min: 1 });
exports.validablogIdPostsCustm = (0, express_validator_1.body)("blogId").custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repositoryBlogs_1.repositoryBlogs.findBlogs(value);
    if (!user) {
        throw new Error('E-mail already in use');
    }
}));
