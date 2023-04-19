import express from "express"
import connection from "./models/index.js"
import cors from "cors"
import "dotenv/config"
import codeRoute from "./routes/codeRoute.js"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors()); 

app.get("/",(req,res)=>{
res.send("Backend is working")
})

app.use("/code",codeRoute)

app.listen(process.env.PORT || 8000,async()=>{
  console.log("Server has started");
  try{
  await connection.authenticate();
  connection.sync();
  console.log("successfully connected to db");
  }
  catch(err){
      console.log("error during connecting to db",err);
  }
})