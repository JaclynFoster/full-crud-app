const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const {getPatterns, makePattern, deletePattern, updatePattern} = require("./controller")

app.get("/patterns", getPatterns)
app.post("/makePattern", makePattern)
app.delete("/deletePattern/:id", deletePattern)
app.put("/updatePattern/:id", updatePattern)

app.listen(4500, () => {
    console.log("Listening on port 4500")
})