const mongoose = require ('mongoose');
// const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const mongoURI="mongodb+srv://nknittin16436:nknittin@cluster0.qaq8u.mongodb.net/iNotebook?retryWrites=true&w=majority";



const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose sucessfully");
    })
}
module.exports=connectToMongo;