const app = require("./app");

const PORT = 3000;
//app is a function object
// console.log(typeof(app)); 

//.listen is a method attached by express function to its object ->app
//internally express does:
// const http = require("http");
// http.createServer(app).listen(3000);
//app itself is a function and node calls it whenever a request arrives
//with internally createServer expecting a callback (req, res)=>{} 
//node creates req and res not express, 
// where req = new IncomingMessage and res = new ServerResponse
//but next is later created by express in handling middlewares
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});