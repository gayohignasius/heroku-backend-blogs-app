const request = require("supertest");

describe("test user sign up", () => {
  it("can sign up as new user", async () => {
    const res = await request(app)
      .post(`${process.env.URL}/api/registration`)
      .send({
        fullName: "Ignasius Gayoh",
        email: "gayohignasius@gmail.com",
        password: "Password@123!?#",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
  });
});
