const PdfDetails = require("../models/pdfModel");

const uploadFileController = async (req, res) => {
    const { title, username } = req.body;


    try {
        const file = await PdfDetails.create({
            title,
            username,
            pdf: req.file.filename
        })
        await file.save();

        res.status(200).json({msg:"Report Uploaded Sucessfully"})
    } catch (e) {
        console.log(e);
        res.status(501).json({msg:"Error Uploading Report, Try Again Later"})
    }

}

module.exports = { uploadFileController }