
class logger{
    constructor(context="App"){
        this.context = context;
    }

    //use: const logger = require("../utils/logger").child("AuthService");
    child(context){
        return new logger(context);
    }

    log(...message){
        console.log(new Date().toISOString());
        console.log(`[${this.context}]`," INFO: ",...message);
    }

    error(...message){
        console.log(new Date().toISOString(),` [${this.context}]`);
        console.log(`[${this.context}]`," ERROR: ",...message);
    }

    warn(...message){
        console.log(new Date().toISOString(),` [${this.context}]`);
        console.log(`[${this.context}]`," WARNING: ",...message);
    }
    
}

module.exports = new logger();