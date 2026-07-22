
class Logger{
    constructor(context="App"){
        this.context = context;
    }

    //use: const logger = require("../utils/logger").child("AuthService");
    // where require("../utils/logger") gives a new Logger instance with this.context="App"
    // but .child("Auth") created another logger instance with context="Auth" since it return new logger
    //however logger is reassigned with the second object
    
    child(context){
        return new Logger(context);
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

module.exports = new Logger();