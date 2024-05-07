import { app } from "../src/app";
import request from "supertest";
import { ADMIN_AUTH } from "../src/auth/authMiddleware";
import { BlogViewModelT } from "../src/types/typeBlog";
import { SETTINGS } from "../src/seting/seting";
import { PostViewModelT } from "../src/types/typePosts";

let blogsTestIdTest: BlogViewModelT;
let PostsTest: PostViewModelT;
const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
let codedAuth: string = buff2.toString("base64");

describe("/test for users", () => {
  beforeAll(async () => {
    await request(app).delete("/api/testing/all-data").expect(204);
  });
  it("GET products = []", async () => {
    await request(app).get("/api/posts").expect([]);
  });

  it("unauthorized request ", async () => {
    await request(app)
      .post("/api/posts")
      .send({
        title: "aloig",
        shortDescription: "jn",
        content: "nnnn",
        blogId: "ytyy",
      })
      .expect(401);
  });

  it("failed request body blogId", async () => {
    await request(app)
      .post("/api/posts")
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        title: "aloig",
        shortDescription: "jn",
        content: "nnnn",
        blogId: "ytyy",
      })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_400, {
        errorsMessages: [
          {
            message: "E-mail already in use",
            field: "blogId",
          },
        ],
      });

    await request(app).get("/api/posts").expect([]);
  });

  it("failed request", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        name: "string",
        description: "string",
        websiteUrl: "https://A9k3dqXmQg09DnH9pEgGN0-v64.yh9pEgmrf0I6mSDkAh-3H2-0M_SxHf5WEboprgrfa4jCt1-9i4cbFk_xfbEzkeLJ7",
      })
      .expect(201);

    blogsTestIdTest = res.body;

    await request(app)
      .post("/api/posts")
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        title: "",
        shortDescription: "",
        content: "",
        blogId: blogsTestIdTest.id,
      })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_400, {
        errorsMessages: [
          {
            message: "Invalid value",
            field: "title",
          },

          {
            message: "Invalid value",
            field: "shortDescription",
          },
          {
            message: "Invalid value",
            field: "content",
          },
        ],
      });

    await request(app).get("/api/posts").expect([]);
  });

  it("successful post and authorization", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        title: "ali",
        shortDescription: "jan",
        content: "dasdsq",
        blogId: blogsTestIdTest.id,
      })
      .expect(201);

    PostsTest = res.body;
    await request(app)
      .get("/api/posts")
      .expect([
        {
          ...PostsTest,
          title: "ali",
          shortDescription: "jan",
          content: "dasdsq",
          blogId: blogsTestIdTest.id,
        },
      ]);
  });

  it("GET product by ID with correct id", async () => {
    await request(app)
      .get("/api/posts/" + PostsTest.id)
      .expect(PostsTest);
  });

  it("- PUT product by ID with incorrect data", async () => {
    await request(app)
      .put("/api/posts/" + 1223)
      .set({ Authorization: "Basic " + codedAuth })
      .send({ title: "title", author: "title" })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_404);

    const res = await request(app).get("/api/posts/");
    expect(res.body[0]).toEqual(PostsTest);
  });

  it("+ PUT product by ID with correct data", async () => {
    await request(app)
      .put("/api/posts/" + PostsTest!.id)
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        title: "saday",
        shortDescription: "jan",
        content: "blas asdsa",
        blogId: blogsTestIdTest.id,
      })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_204);

    const res = await request(app).get("/api/posts/");
    expect(res.body[0]).toEqual({
      ...PostsTest,
      title: "saday",
      shortDescription: "jan",
      content: "blas asdsa",
    });

    PostsTest = res.body[0];
  });

  it("- DELETE product by incorrect ID", async () => {
    await request(app)
      .delete("/api/posts/876328")
      .set({ Authorization: "Basic " + codedAuth })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_404);

    const res = await request(app).get("/api/posts/");
    expect(res.body[0]).toEqual(PostsTest);
  });

  it("+ DELETE product by  ID", async () => {
    await request(app)
      .delete(`/api/posts/${PostsTest.id}`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_204);

    const res = await request(app).get("/api/posts/");
    expect(res.body).toEqual([]);
  });
});
