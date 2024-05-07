import { app } from "../src/app";
import request from "supertest";
import { ADMIN_AUTH } from "../src/auth/authMiddleware";
import { BlogViewModelT } from "../src/types/typeBlog";
import { SETTINGS } from "../src/seting/seting";

let blogsTest: BlogViewModelT;
const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
let codedAuth: string = buff2.toString("base64");

describe("/test for users", () => {
  beforeAll(async () => {
    await request(app).delete("/api/testing/all-data").expect(204);
  });
  it("GET products = []", async () => {
    await request(app).get("/api/blogs").expect([]);
  });
  it("successful post and authorization", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        name: "string",
        description: "string",
        websiteUrl: "https://A9k3dqXmQg09DnH9pEgGN0-v64.yh9pEgmrf0I6mSDkAh-3H2-0M_SxHf5WEboprgrfa4jCt1-9i4cbFk_xfbEzkeLJ7",
      })
      .expect(201);

    blogsTest = res.body;

    await request(app).get("/api/blogs").expect([blogsTest]);
  });

  it("unauthorized request ", async () => {
    await request(app)
      .post("/api/blogs")
      .send({
        name: "string",
        description: "string",
        websiteUrl: "https://A9k3dqXmQg09DnH9pEgGN0-v64.yh9pEgmrf0I6mSDkAh-3H2-0M_SxHf5WEboprgrfa4jCt1-9i4cbFk_xfbEzkeLJ7",
      })
      .expect(401);
  });

  it("failed request ", async () => {
    await request(app)
      .post("/api/blogs")
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        name: "",
        description: "string",
        websiteUrl: "https://A9k3dqXmQg09DnH9pEgGN0-v64.yh9pEgmrf0I6mSDkAh-3H2-0M_SxHf5WEboprgrfa4jCt1-9i4cbFk_xfbEzkeLJ7",
      })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_400, {
        errorsMessages: [
          {
            message: "Invalid value",
            field: "name",
          },
        ],
      });

    await request(app).get("/api/blogs").expect([blogsTest]);
  });

  it("failed request absolut", async () => {
    await request(app)
      .post("/api/blogs")
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        name: "",
        description: "",
        websiteUrl: "://A9k3dqXmQg09DnH9pEgGN0-v64.yh9pEgmrf0I6mSDkAh-3H2-0M_SxHf5WEboprgrfa4jCt1-9i4cbFk_xfbEzkeLJ7",
      })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_400, {
        errorsMessages: [
          {
            message: "Invalid value",
            field: "name",
          },
          {
            message: "Invalid value",
            field: "description",
          },
          {
            message: "Invalid value",
            field: "websiteUrl",
          },
        ],
      });

    await request(app).get("/api/blogs").expect([blogsTest]);
  });

  it("GET product by ID with correct id", async () => {
    await request(app)
      .get("/api/blogs/" + blogsTest.id)
      .expect(blogsTest);
  });

  it("- PUT product by ID with incorrect data", async () => {
    await request(app)
      .put("/api/blogs/" + 1223)
      .set({ Authorization: "Basic " + codedAuth })
      .send({ title: "title", author: "title" })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_404);

    const res = await request(app).get("/api/blogs/");
    expect(res.body[0]).toEqual(blogsTest);
  });

  it("+ PUT product by ID with correct data", async () => {
    await request(app)
      .put("/api/blogs/" + blogsTest!.id)
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        name: "sadsad",
        description: "alo",
        websiteUrl: "https://AzjaYxsAsfCef-pmSQL8r4APHKA0jMx1435xE7iUl-3rhu0bNLJu88YAWsTeIaFEbUaw5rBoK_nukHlv15VtRjL1UXLp",
      })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_204);

    const res = await request(app).get("/api/blogs/");
    expect(res.body[0]).toEqual({
      ...blogsTest,
      name: "sadsad",
      description: "alo",
      websiteUrl: "https://AzjaYxsAsfCef-pmSQL8r4APHKA0jMx1435xE7iUl-3rhu0bNLJu88YAWsTeIaFEbUaw5rBoK_nukHlv15VtRjL1UXLp",
    });

    console.log(res.body[0]);
    blogsTest = res.body[0];
  });

  it("- DELETE product by incorrect ID", async () => {
    await request(app)
      .delete("/api/blogs/876328")
      .set({ Authorization: "Basic " + codedAuth })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_404);

    const res = await request(app).get("/api/blogs/");
    expect(res.body[0]).toEqual(blogsTest);
  });

  it("+ DELETE product by  ID", async () => {
    await request(app)
      .delete(`/api/blogs/${blogsTest.id}`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(SETTINGS.HTTPCOD.HTTPCOD_204);

    const res = await request(app).get("/api/blogs/");
    expect(res.body).toEqual([]);
  });
});
