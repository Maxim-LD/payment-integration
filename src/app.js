import express from "express"
import paymentRouter from "./route/paymentRouter.js"


const app = express()

app.use(express.json())

app.use("/api", paymentRouter)

app.use((req, res) => {
  res.status(404).json({ message: "This endpoints does not exist" })
})

export default app