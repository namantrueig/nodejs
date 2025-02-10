const http= require('http');

const server = http.createServer((req,res)=>{
    
    fs.appendfile("log.txt","hello",(err,res)=>{
        console.log("log created")
    })
    res.end("hello from server");
}).listen(5000,()=>{console.log("server started")});