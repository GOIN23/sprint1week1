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
exports.routerPosts = void 0;
const express_1 = __importDefault(require("express"));
const repositoryPosts_1 = require("../Repository/repositoryPosts");
const seting_1 = require("../seting/seting");
const express_validator_1 = require("express-validator");
const validationsPostst_1 = require("../validation/validationsPostst/validationsPostst");
const errors_1 = require("../utilt/errors");
const authMiddleware_1 = require("../auth/authMiddleware");
const routerPosts = () => {
    const router = express_1.default.Router();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield repositoryPosts_1.repositoryPosts.getPosts();
        res.status(seting_1.SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
        return;
    }));
    router.post("/", authMiddleware_1.authMiddleware, validationsPostst_1.validaTitlePosts, validationsPostst_1.validaShortDescriptionPosts, validationsPostst_1.validaContentPosts, validationsPostst_1.validablogIdPosts, validationsPostst_1.validablogIdPostsCustm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(seting_1.SETTINGS.HTTPCOD.HTTPCOD_400).json((0, errors_1.errorValid)(errors.array({ onlyFirstError: true })));
            return;
        }
        let newPosts = yield repositoryPosts_1.repositoryPosts.creatPosts(req.body);
        res.status(seting_1.SETTINGS.HTTPCOD.HTTPCOD_201).send(newPosts);
        return;
    }));
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield repositoryPosts_1.repositoryPosts.findPosts(req.params.id);
        if (!result) {
            res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_404);
            return;
        }
        res.status(seting_1.SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
        return;
    }));
    router.put("/:id", authMiddleware_1.authMiddleware, validationsPostst_1.validaTitlePosts, validationsPostst_1.validaShortDescriptionPosts, validationsPostst_1.validaContentPosts, validationsPostst_1.validablogIdPosts, validationsPostst_1.validablogIdPostsCustm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let resilt = yield repositoryPosts_1.repositoryPosts.findPosts(req.params.id);
        if (!resilt) {
            res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_404);
            return;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json((0, errors_1.errorValid)(errors.array({ onlyFirstError: true })));
            return;
        }
        yield repositoryPosts_1.repositoryPosts.updatPosts(req.body, resilt);
        res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_204);
    }));
    router.delete("/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield repositoryPosts_1.repositoryPosts.findPosts(req.params.id);
        if (!result) {
            res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_404);
            return;
        }
        repositoryPosts_1.repositoryPosts.deletePosts(req.params.id);
        res.sendStatus(seting_1.SETTINGS.HTTPCOD.HTTPCOD_204);
        return;
    }));
    return router;
};
exports.routerPosts = routerPosts;
