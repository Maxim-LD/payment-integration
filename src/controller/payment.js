import dotenv from 'dotenv'
import axios from 'axios'
import { asyncHandler } from '../middleware/errorHandler.js'

dotenv.config()


const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

const URL = 'https://api.paystack.co/transaction/'

const initializePayment = asyncHandler ( async(req, res) =>{
    const { name, email, amount } = req.body
    const amountInKobo = amount * 100
    
    if (!name || !email || !amount) {
        res.status(400).json({message: 'Please provide all fields'})
    }

    const response = await axios({
      method: 'POST',
      url: `${URL}initialize`,
      headers: {
        'Authorization': `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      data : JSON.stringify({
        name,
        email,
        amount: amountInKobo
      })
    })
        res.status(200).json({
        payment: response.data,
        //status: true,
        // message: 'Payment initialized successfully',
       
    })
})

const verifyPayment = asyncHandler ( async(req, res) => {
    const { reference } = req.params

    const response = await axios({
        method: 'GET',
        url: `${URL}verify/${reference}`,
        headers: {
            Authorization: `Bearer ${SECRET_KEY}`
        }
    })
    if (response.data.data.status === 'success') {
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
    // const consoleResponse = JSON.stringify({
    //   status: response.data.data.status,
    //   amount: response.data.data.amount,
    //   reference: response.data.data.reference,
    //   email: response.data.data.customer.email,
    // })
    // console.log(consoleResponse)
    
})

const initializePaymentNew = asyncHandler ( async(req, res) =>{
    const { name, email, amount } = req.body
    const amountInKobo = amount * 100

        if (!name || !email || !amount) {
        res.status(400).json({ message: "Please provide all fields" })
        }
    const response = await fetch(`${URL}initialize`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            amount: amountInKobo
        })
    })

    if (!response.ok) {
        const errorData = await response.json()
        return res.status(response.status).json({ message: errorData.message })
    }

    const data = await response.json()
    res.status(200).json(data)
})





export { 
    initializePayment,
    verifyPayment,
    initializePaymentNew
}