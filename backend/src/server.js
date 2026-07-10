const app = require("./app");

const PORT = 3000;
//app is a function object
// console.log(typeof(app)); 

//.listen is a method attached by express function to its object ->app
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});