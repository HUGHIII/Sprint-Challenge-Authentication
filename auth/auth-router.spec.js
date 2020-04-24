const request = require("supertest");
const server = require("../api/server");

describe("server", function () {
  describe("login", function () {
    it("should return status 200", async function () {
      const user = {
        username: "hughlloyd2",
        password: "treytrey2",
      };

      const response = await request(server).post("/api/auth/login").send(user);
      expect(response.status).toBe(200);
    });
    it("should return status 401", async function () {
      const nouser = {
        username: "no",
        password: "nahnahnah",
      };
      const response = await request(server)
        .post("/api/auth/login")
        .send(nouser);
      expect(response.status).toBe(401);
    });
  });
  describe("register", function () {
    it("should return fail 500", async function () {
      const user = {};
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toBe(500);
    });
    it("should return success 201", async function () {
      const newuser = Date.now();
      const user = {
        username: `trey${newuser}`,
        password: "trey123",
      };
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toBe(201);
    });
  });
});
