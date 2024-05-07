"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // добавление переменных из файла .env в process.env
exports.SETTINGS = {
    PORT: process.env.PORT || 3005,
    PATH: {
        VIDEOS: "/api/videos",
    },
    HTTPCOD: {
        HTTPCOD_200: 200,
        HTTPCOD_201: 201,
        HTTPCOD_400: 400,
        HTTPCOD_404: 404,
        HTTPCOD_204: 204,
        HTTPCOD_401: 401,
    },
};
