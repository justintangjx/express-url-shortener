import url from '../models/url';
process.env.ENV = "test";

const app = require("../../app");
const request = require("supertest");
const url = require("../../models/url");
const mongoose = require("mongoose");

describe("src/url", () => {
    let db;
  
    beforeAll(async () => {
      const dbUrl = "mongodb://localhost/express-url-shortener";
      db = await mongoose.connect(dbUrl, () => {
        console.log("connected to test DB successfully");
      });
  
      await url.deleteMany().exec();
    });

    it("POST /return a hash key with requested url", async () => {
        const testURL = "wwww.govtech.sg";
        const hash = encode(request.url, existingURLs);
    
        const response = await request(app)
          .post("/")
          .send({ url: testURL,
            });
    
        expect(response.status).toEqual(200);
        expect(response.body["content-type"]).toContain("application/json");
    
        expect(response.body.hash).toEqual(hash);
        
      });

    it("GET /should return full long url property of hash key", async () => {
        const decodedUrl = await decode(request.params.hash, existingURLs)
    
        const response = await request(app).get("/:hash");
    
        expect(response.status).toEqual(200);
        expect(response.body["content-type"]).toContain("application/json");
        expect(response.body).toEqual(decodedUrl);
      });

      afterAll(async () => {
        await url.deleteMany().exec();
        await db.close();
      });
});
