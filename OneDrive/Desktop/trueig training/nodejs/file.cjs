const fs = require("fs");

// fs.writeFile('./test.txt',"hello ji",(err)=>{});

// const result = fs.readFileSync("./test.txt","utf-8");
// console.log(result);

//asynchronous
fs.readFile("./test.txt","utf-8",(err,res)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(res);
    }
})