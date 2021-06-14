const express = require('express');
const url = require('url');
const router = express.Router();
const videoDB = require('../../public/mainDB');
const app = express();


// Get params from req url
router.get('/', (req, res) => {

    // let hrstart = process.hrtime()           //Used to check runtime

    // console.log("-----------------faster, but confusing code ----------------------")
    let results = [];

    if (videoDB.semesters !== undefined) {
        // console.log(videoDB.semesters.forEach((semester) => {semester.semesterId}))
        // results = (videoDB.semesters.forEach((semester) => {semester.semesterId, semester.courses.forEach((course) => {course.name})}))
        for(let i=0;i<videoDB.semesters.length;i++){
            let temp = [];
            for(let j=1;j<=videoDB.semesters[i].courses.length;j++){
                temp.push({
                    id: j,
                    name: videoDB.semesters[i].courses[j-1].name
                });
                // console.log(videoDB.semesters[i].courses[j].name);
            }
            // console.log(videoDB.semesters[i].semesterId, temp);
            results.push(
                {
                    semId: videoDB.semesters[i].semesterId, 
                    courses: temp
                }
            );
        }
        // console.log(results[1].courses[0].name)

        console.log(results)
        res.render("unitSearch_ejs.ejs", { results: results });
    } else {
        //error
        results = [{name:""},{name:""},{name:""},{name:""}];
        // res.render("unitSearch_ejs.ejs", { results: results });
    }

    // console.log(process.hrtime(hrstart));            //The end of the runtime function
});

module.exports = router;