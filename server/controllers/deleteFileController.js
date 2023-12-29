const PdfDetails = require("../models/pdfModel")

const deleteFileController = async (req, res) => {

    const { username, file } = req.body;
   const userName  = username;
   const fileName= file
    try {


        const file = await PdfDetails.findOneAndDelete({ username: userName, pdf:fileName })
        console.log(file);
        res.status(200).json({ msg: "Report Deleted Successfully" })
    } catch (e) {
        console.log(e);
        res.status(501).json({ msg: "Error Deleting the Saved Report" })
    }
}


module.exports = deleteFileController