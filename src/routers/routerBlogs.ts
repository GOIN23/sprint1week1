import express, { Request, Response } from "express";
import { SETTINGS } from "../seting/seting";
import { validaDescriptionBlogs, validaNameBlogs, validaWebsiteUrlBlogs } from "../validation/validationBlogs/validationBlogs";
import { validationResult } from "express-validator";
import { errorValid } from "../utilt/errors";
import { repositoryBlogs } from "../Repository/repositoryBlogs";
import { authMiddleware } from "../auth/authMiddleware";

export const routerBlogs = () => {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    let result = await repositoryBlogs.getBlogs();
    res.status(SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
    return;
  });

  router.post("/", authMiddleware, validaNameBlogs, validaDescriptionBlogs, validaWebsiteUrlBlogs, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send(errorValid(errors.array({ onlyFirstError: true })));
      return;
    }

    let newBlog = await repositoryBlogs.createBlogs(req.body);

    res.status(SETTINGS.HTTPCOD.HTTPCOD_201).send(newBlog);
  });

  router.get("/:id", async (req: Request, res: Response) => {
    let result = await repositoryBlogs.findBlogs(req.params.id);

    if (!result) {
      res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_404);
      return;
    }
    res.status(SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
  });

  router.put("/:id", authMiddleware, validaNameBlogs, validaDescriptionBlogs, validaWebsiteUrlBlogs, async (req: Request, res: Response) => {
    let result = await repositoryBlogs.findBlogs(req.params.id);
    if (!result) {
      res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_404);
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errorValid(errors.array({ onlyFirstError: true })));
      return;
    }

    await repositoryBlogs.updatBlogs(req.body, result);
    res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_204);
    return;
  });

  router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    let result = await repositoryBlogs.findBlogs(req.params.id);
    if (!result) {
      res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_404);
      return;
    }

    await repositoryBlogs.deleteBlogs(req.params.id);

    res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_204);
    return;
  });

  return router;
};
