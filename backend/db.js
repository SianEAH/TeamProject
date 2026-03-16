// const mongoose = require('mongoose');
// require('dotenv').config();


// const connectDB = async () => {
//     console.log("Step 1: Inside connectDB function...");
//     try {
//         const uri = process.env.MONGO_URI || "mongodb+srv://TeamProject_D:cMaApt0nYH6uZFY1@teamprojectd.nhpdlpd.mongodb.net/DigitalEscapeRoom?retryWrites=true&w=majority"
//         console.log("Step 2: Checking URI...");

//         if (!uri) {
//             console.log("❌ ERROR: MONGO_URI is missing from .env!");
//             return;
//         }

//         console.log("Step 3: Starting mongoose.connect()...");

//         // FORCE A 5-SECOND TIMEOUT SO IT DOESN'T HANG
//         await mongoose.connect(uri, {
//             serverSelectionTimeoutMS: 5000, 
//             connectTimeoutMS: 5000
//         });

//         console.log("Step 4: MongoDB Connected! ✅");
//     } catch (err) {
//         console.log("❌ STEP 5: CONNECTION FAILED!");
//         console.error("The Error is:", err.message);
//         // This will stop the process so there is no hang
//         process.exit(1); 
//     }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("Step 1: Inside connectDB function...");
    
    // HARDCODE THE STRING DIRECTLY HERE
    const uri = "mongodb+srv://TeamProject_D:cMaApt0nYH6uZFY1@teamprojectd.nhpdlpd.mongodb.net/DigitalEscapeRoom?retryWrites=true&w=majority";
    
    console.log("Step 2: URI set manually.");

    try {
        console.log("Step 3: Connecting...");
        await mongoose.connect(uri);
        console.log("Step 4: MongoDB Connected! ✅");
    } catch (err) {
        console.error("Step 5: Error:", err.message);
    }
};

module.exports = connectDB;