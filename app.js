const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/newsletter.html");
})

app.post("/",function(req,res)
{
    const first=req.body.firstName;
    const last=req.body.lastName;
    const mail=req.body.mailId;
    const data={
        members:[
            {
                email_address:mail,
                status:"subscribed",
                merge_fields:{
                    FNAME:first,
                    LNAME:last
                }

            }
        ]
    }
    const JSONData=JSON.stringify(data);
    const url="https://us18.api.mailchimp.com/3.0/lists/cc95493591";
    const options={
        method:"POST",
        auth:"Bagavathi:0fab874aadfa0f4ed8e3ff4459291291-us18"
    }
    const requestt= https.request(url,options,function(response)
    {
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
       response.on("data",function(data)
       {
        
        console.log(JSON.parse(data));
        
       })

    })
    requestt.write(JSONData);
    requestt.end();
})

app.post("/failure",function(req,res)
{
    res.redirect("/");
})

//mailchimp api key
//0fab874aadfa0f4ed8e3ff4459291291-us18
//list id
//cc95493591



app.listen(3000,function(req,res)
{
    console.log("Server is running at port3000 :) ");
})