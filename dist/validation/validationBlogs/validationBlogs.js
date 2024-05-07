"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaWebsiteUrlBlogs = exports.validaDescriptionBlogs = exports.validaNameBlogs = void 0;
const express_validator_1 = require("express-validator");
exports.validaNameBlogs = (0, express_validator_1.body)("name").trim().exists().isString().isLength({ max: 15, min: 1 });
exports.validaDescriptionBlogs = (0, express_validator_1.body)("description").trim().exists().isString().isLength({ max: 500, min: 1 });
exports.validaWebsiteUrlBlogs = (0, express_validator_1.body)("websiteUrl")
    .trim()
    .exists()
    .isString()
    .isLength({ max: 100, min: 1 })
    .matches("^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$");
