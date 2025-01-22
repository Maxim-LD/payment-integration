import express from 'express'
import { initializePayment, verifyPayment } from '../../controller/v1/payment.js'

const v1Router = express.Router()

v1Router.post("/v1/payment", initializePayment)
v1Router.get("/v1/payment/:reference", verifyPayment)

export default v1Router