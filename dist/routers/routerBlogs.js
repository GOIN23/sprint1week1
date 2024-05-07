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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBlogs = void 0;
const express_1 = __importDefault(require("express"));
const seting_1 = require("../seting/seting");
const validationBlogs_1 = require("../validation/validationBlogs/validationBlogs");
const express_validator_1 = require("express-validator");
const errors_1 = require("../utilt/errors");
const repositoryBlogs_1 = require("../Repository/repositoryBlogs");
const authMiddleware_1 = require("../auth/authMiddleware");
const routerBlogs = () => {
    const router = express_1.default.Router();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield repositoryBlogs_1.repositoryBlogs.getBlogs();
        res.status(seting_1.SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
        return;
    }));
    router.post("/", authMiddleware_1.authMiddleware, validationBlogs_1.validaNameBlogs, validationBlogs_1.validaDescriptionBlogs, validationBlogs_1.validaWebsiteUrlBlogs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send((0, errors_1.errorValid)(errors.array({ onlyFirstError: true })));
            return;
        }
        let newBlog = yield repositoryBlogs_1.repositoryBlogs.createBlogs(req.body);
        res.status(seting_1.SETTINGS.HTTPCOD.HTTPCOD_201).send(newBlog);
    }));
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield repositoryBlogs_1.repositoryBlogs.findBlogs(req.params.id);
        if (!result) {
            res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_404);
            return;
        }
        res.status(seting_1.SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
    }));
    router.put("/:id", authMiddleware_1.authMiddleware, validationBlogs_1.validaNameBlogs, validationBlogs_1.validaDescriptionBlogs, validationBlogs_1.validaWebsiteUrlBlogs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield repositoryBlogs_1.repositoryBlogs.findBlogs(req.params.id);
        if (!result) {
            res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_404);
            return;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json((0, errors_1.errorValid)(errors.array({ onlyFirstError: true })));
            return;
        }
        yield repositoryBlogs_1.repositoryBlogs.updatBlogs(req.body, result);
        res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_204);
        return;
    }));
    router.delete("/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield repositoryBlogs_1.repositoryBlogs.findBlogs(req.params.id);
        if (!result) {
            res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_404);
            return;
        }
        yield repositoryBlogs_1.repositoryBlogs.deleteBlogs(req.params.id);
        res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_204);
        return;
    }));
    return router;
};
exports.routerBlogs = routerBlogs;
