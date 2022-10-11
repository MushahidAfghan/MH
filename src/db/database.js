const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/CURD2" ,(error)=>{
    if(!error){
        console.log("Connection SuccessFull aSDSAD")
    }
    else{
        console.log("Connection  not SuccessFull"+error)
    }
})
