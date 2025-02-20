const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authroutes = require("./routes/authRoutes");
const toDoRoutes = require("./routes/ToDoRoutes");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("server start")
})

app.use(authroutes);
app.use(toDoRoutes);

mongoose.connect(process.env.DB_URL).then((result) => {

    console.log("DB Connected succesfully ");
    
}).catch((error) => {
    console.log(error.message)
}
);


app.listen(port, () => {
    console.log(`server start port at ${port}`);
})
