const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const dataUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "1234",
};

//test untuk api register
describe("POST /user/register", () => {
  it("should send response with 201", (done) => {
    //setup
    request(app)
      .post("/users/register")
      .send(dataUser)
      //execute
      .expect(201)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
        expect(res.body).toHaveProperty("email");
        expect(res.body.email).toEqual("admin@mail.com");   
        done();
      });
  });
});

describe("POST /users/login", () => {
  beforeAll(async () => {
    try {
      await User.create(dataUser);
    } catch (err) {
      console.log(err);
    }
  });
  it("should send response with 200", (done) => {
    //setup
    request(app)
      .post("/users/login")
      .send({
        email: dataUser.email,
        password: dataUser.password,
      })
        //execute
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          
        expect(res.body).toHaveProperty("token");
        expect(typeof res.body.token).toEqual("string");
        done();
      });
  });

  it("should send response with 401", (done) => {
    //setup
    request(app)
      .post("/users/login")
      .send({
        email: dataUser.email,
        password: "salahpassword",
      })
      //execute
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Invalid password");
        done();
      });
  });
  afterAll(async () => {
    try {
      await User.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });
});
