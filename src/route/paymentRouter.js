import express from 'express'
import { initializePayment, initializePaymentNew, verifyPayment } from '../controller/payment.js'

const router = express.Router()

router.post("/v1/payment", initializePayment)
router.post("/v2/payment", initializePaymentNew)
router.get("/v1/payment/:reference", verifyPayment)

export default router