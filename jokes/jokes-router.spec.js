const request = require("supertest");
const server = require("../api/server");
const { generateToken } = require("../auth/genToken");

describe("server", function () {
  describe("GET jokes", function () {
    it("should return status 400 no creds", async function () {
      const response = await request(server).get("/api/jokes/").send();
      expect(response.status).toBe(400);
    });
    // it("should return 401 wrong creds", async function () {
    //   userGet = {
    //     username: "treynew",
    //     password: "sprint",
    //     Authorization: "e",
    //   };
    //   const response = await request(server).get("/api/jokes/").send(userGet);
    //   expect(response.status).toBe(401);
    // });
    it("should throw error when gen token func not passed username and id", function () {
      const brokenArg = {
        name: "bob",
        role: "none",
      };
      expect(() => generateToken(brokenArg)).toThrow();
    });
  });
});
