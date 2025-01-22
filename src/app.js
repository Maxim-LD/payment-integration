import express from "express"
import v1Router from ".//route/v1/paymentRoutes.js"
import v2Router from "./route/v2/paymentRoutes.js"


const app = express()

app.use(express.json())

app.use("/api", v1Router)
app.use("/api", v2Router)

app.use((req, res) => {
  res.status(404).json({ message: "This endpoints does not exist" })
})

export default app