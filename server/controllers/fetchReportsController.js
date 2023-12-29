const PdfDetails = require("../models/pdfModel");

const fetchReportsController = async (req, res) => {

    const { username } = req.query;

    try {

        const files = await PdfDetails.find({ username }).select("-username");
        res.status(200).json({ files, msg:"File Fetching Successfull" })

    } catch (e) {
        res.status(500).json({ msg: "Error Fetching Reports" })
    }


}


module.exports = fetchReportsController