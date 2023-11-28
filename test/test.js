require("chai").should();
let request = require("supertest");

let Allroutes = [
  "fridges",
  "users",
  "warnings",
  "fridgecontrols",
  "receptioncontrols",
  "suppliers",
  "goods",
];

const base = `http://localhost:3002`;

describe(`data list`, function () {
  //routes test

  for (let i = 0; i < Allroutes.length; i++) {
    let route = Allroutes[i];

    it(`should return ${route} Data`, (done) => {
      request = request(`${base}`);

      request
        .get(`/${route}`)
        .expect(200)
        .end((error, response) => {
          
try {

          const result = JSON.parse(response.text);
          result.should.be.an("array")}
          catch{
            if (error) {
              return done(error);
            }

          }
          finally {
            return done();

          }
         
          
        });

      /**********************POST TEST */

     /* request
        .post(`/goods`)
        .send({ name: "fromage" })
        .expect(200)
        .end((error, response) => {
          if (error) {
            return done(error);
          }
          const result = JSON.parse(response.text);
          console.log(response.text)

          result.should.be.an("string");
          return done();
        });*/
    });
  }
});
