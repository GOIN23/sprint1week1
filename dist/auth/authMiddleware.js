"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.ADMIN_AUTH = void 0;
exports.ADMIN_AUTH = "admin:qwerty"; // get from SETTINGS
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization; // 'Basic xxxx'
    console.log(auth);
    if (!auth) {
        res.sendStatus(401);
        return;
    }
    const buff2 = Buffer.from(exports.ADMIN_AUTH, "utf8");
    const codedAuth = buff2.toString("base64");
    if (auth.slice(6) !== codedAuth || auth.slice(0, 6) !== "Basic ") {
        res.sendStatus(401);
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
