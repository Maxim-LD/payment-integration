import dotenv from 'dotenv'
import { asyncHandler } from '../../middleware/errorHandler.js'

dotenv.config()

const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const URL = 'https://api.paystack.co/transaction/'

const initializePayment = asyncHandler(async (req, res) => {
  const { name, email, amount } = req.body
  const amountInKobo = amount * 100

  if (!name || !email || !amount) {
    res.status(400).json({ message: "Please provide all fields" })
  }
  const response = await fetch(`${URL}initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      amount: amountInKobo,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    return res.status(response.status).json({ message: errorData.message })
  }

  const data = await response.json()
  res.status(200).json(data)
})

const verifyPayment = asyncHandler ( async(req, res) => {
    const { reference } = req.params

    const response = await fetch(`${URL}verify/${reference}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${SECRET_KEY}`
        }
    })

    if (response.status === 'success') {
        res.status(200).json({
            payment: response.data,
            status: true,
            message: 'Payment verified successfully',
        })
    } else {
        res.status(400).json({
            status: false,
            message: 'Payment not verified'
        })
    }

})


export { 
    initializePayment,
    verifyPayment
}