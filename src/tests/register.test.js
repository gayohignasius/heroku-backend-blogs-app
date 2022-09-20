const request = require("supertest");
const app = require("../../app");
const { User } = require("../database/models");

describe("test user sign up", () => {
  it("can sign up as new user", async () => {
    const res = await request(app).post("/api/registration").send({
      fullName: "test user",
      email: "testing@gmail.com",
      password: "Password@123!?#",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email");
  });
});
afterEach(async () => {
  const user = await User.findOne({ where: { email: "testing@gmail.com" } });
  expect(user.fullName).toBeTruthy();
  expect(user.email).toBeTruthy();
  const deletedUser = await User.destroy({
    where: {
      id: user.id,
    },
  });
  expect(deletedUser);
});
