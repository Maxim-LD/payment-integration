import express from "express"
import { initializePayment, verifyPayment } from '../../controller/v2/payment.js'

const v2Router = express.Router()

v2Router.post("/v2/payment", initializePayment)
v2Router.get("/v2/payment/:reference", verifyPayment)

export default v2Router
