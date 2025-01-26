
import app from "../src/app.js"
import nock from "nock"
import dotenv from "dotenv"
import request from "supertest" // Correct import for supertest
//import { describe } from "mocha" // Added missing import

dotenv.config()

const chai = await import("chai")
const { expect } = chai


const PAYSTACK_URL = "https://api.paystack.co"
const reference = "3lpa2kuj8h"

describe("Payment API Test", () => {
  // Test for initializing payment
  it("should initialize a payment successfully", (done) => {
    nock(PAYSTACK_URL)
      .post("/transaction/initialize")
      .reply(200, {
        status: true,
        message: "Authorization URL created",
        data: {
          authorization_url: "https://checkout.paystack.com/authorize",
          reference,
        },
      })

    request(app)
      .post("/api/v1/payment")
      .send({ name: "Elon Musk", email: "test@gmail.com", amount: 10000 })
      .end((err, response) => {
        expect(response.status).to.equal(200)
        expect(response.body.payment).to.have.property("status", true)
        expect(response.body.payment.data).to.have.property(
          "authorization_url",
          "https://checkout.paystack.com/authorize"
        )
        done()
      })
  })

  //Test for verifying payment
  it("should successfully verify a payment", (done) => {
    nock(PAYSTACK_URL)
      .get(`/transaction/verify/${reference}`)
      .reply(200, {
        status: true,
        message: "Verification successful!",
        data: { status: "success", reference },
      })

    // Make a GET request to the payment verification endpoint and verify the response
    request(app)
      .get(`/api/v1/payment/${reference}`)
      .end((err, response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("status", true)
        expect(response.body.payment.data).to.have.property("status", "success")
        done()
      })
  })
})
