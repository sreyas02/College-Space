const express = require('express');
const url = require('url');
const router = express.Router();
const videoDB = require('../../public/mainDB');
const app = express();


// Get params from req url
router.get('/', (req, res) => {

    let semId = parseInt(req.query.semester);
    let crsId = parseInt(req.query.course);
    let unitId = parseInt(req.query.unit);

    console.log("semId: " + semId);
    console.log("crsId: " + crsId);
    console.log("unitId: " + unitId);

    // let hrstart = process.hrtime()           //Used to check runtime

    // console.log("-----------------faster, but confusing code ----------------------")
    let results = null;

    if (videoDB.semesters[semId - 1] !== undefined && videoDB.semesters[semId - 1].courses[crsId - 1] !== undefined && videoDB.semesters[semId - 1].courses[crsId - 1].units[unitId - 1] !== undefined) {
        let results = videoDB.semesters[semId - 1].courses[crsId - 1].units[unitId - 1];
        console.log(results)
        res.render("video_ejs.ejs", { results: results });
    } else {
        //error
        res.status(400).json({ msg: "Error 404: Not found" })
    }

    // console.log(process.hrtime(hrstart));            //The end of the runtime function
});

module.exports = router;