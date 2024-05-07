import express, { Request, Response } from "express";
import { repositoryPosts } from "../Repository/repositoryPosts";
import { SETTINGS } from "../seting/seting";
import { validationResult } from "express-validator";
import { validaContentPosts, validaShortDescriptionPosts, validaTitlePosts, validablogIdPosts, validablogIdPostsCustm } from "../validation/validationsPostst/validationsPostst";
import { errorValid } from "../utilt/errors";
import { authMiddleware } from "../auth/authMiddleware";

export const routerPosts = () => {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    let result = await repositoryPosts.getPosts();
    res.status(SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
    return;

  });

  router.post(
    "/",
    authMiddleware,
    validaTitlePosts,
    validaShortDescriptionPosts,
    validaContentPosts,
    validablogIdPosts,
    validablogIdPostsCustm,
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(SETTINGS.HTTPCOD.HTTPCOD_400).json(errorValid(errors.array({onlyFirstError:true})));
         return;

      }
     let newPosts =  await repositoryPosts.creatPosts(req.body);

      res.status(SETTINGS.HTTPCOD.HTTPCOD_201).send(newPosts);
      return;
    }
  );

  router.get("/:id", async (req: Request, res: Response) => {
    let result = await repositoryPosts.findPosts(req.params.id);

    if (!result) {
      res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_404);
      return;

    }

    res.status(SETTINGS.HTTPCOD.HTTPCOD_200).send(result);
    return;

  });

  router.put(
    "/:id",
    authMiddleware,
    validaTitlePosts,
    validaShortDescriptionPosts,
    validaContentPosts,
    validablogIdPosts,
    validablogIdPostsCustm,
    async (req: Request, res: Response) => {
      let resilt = await repositoryPosts.findPosts(req.params.id);

      if (!resilt) {
        res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_404);
        return;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errorValid(errors.array({onlyFirstError:true})));
        return;
      }

      await repositoryPosts.updatPosts(req.body, resilt);
      res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_204);
    }
  );

  router.delete("/:id",authMiddleware, async (req: Request, res: Response) => {
    let result = await repositoryPosts.findPosts(req.params.id);
    if (!result) {
      res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_404);
      return;
    }
    repositoryPosts.deletePosts(req.params.id);
    res.sendStatus(SETTINGS.HTTPCOD.HTTPCOD_204);
    return;


  });

  return router;
};
