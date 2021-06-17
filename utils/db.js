const mongoose = require('mongoose');

const connectDB = async (connectStr) => {
    try{
        const db = await mongoose.connect(connectStr, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return db;
    }catch(err)
    {
        console.log(`failed: ${err}`);
        return null;
    }
}

module.exports = {
   connectDB
};