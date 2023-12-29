const mongoose = require("mongoose");


const pdfSchema =  mongoose.Schema({

    username:{
        type:String
    },

    title:{
        type:String
    },
    pdf:{
        type:String
    }
})

const PdfDetails = mongoose.model("PdfDetails", pdfSchema);

module.exports  = PdfDetails;