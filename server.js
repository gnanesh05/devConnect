const express =  require('express');
const app = express();


app.get("/",(req,res)=>{
    res.send("backend api");
})

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`running in port ${port}`));