// const express = require('express');
// const url = require('url');
// const router = express.Router();
// const videoDB = require('../../public/temp');

// // const urlParams = URLSearchParams(window.location.search);

// // console.log(urlParams);

// // Get the videoDB
// router.get('/', (req, res) => res.json(videoDB));

// // Get params from req url
// router.get('/:id', (req, res) => {

//     const found = videoDB.semesters.some((semester) => semester.semesterId === parseInt(req.params.id));

//     if (found){
//         res.json(videoDB.semesters.filter((semester) => semester.semesterId === parseInt(req.params.id)));
//     }
//     else {
//         res.status(400).json({msg: "Error 404: Not found"})
//     }
// });

// module.exports = router;

const express = require('express');
const url = require('url');
const router = express.Router();
const videoDB = require('../../public/temp');
const app = express();



// Get params from req url
router.get('/', (req, res) => {

    let semId = parseInt(req.query.semester);
    let crsId = parseInt(req.query.course);
    let unitId = parseInt(req.query.unit);
    // let videoId = parseInt(req.query.video);

    console.log("semId: " + semId);
    console.log("crsId: " + crsId);
    console.log("unitId: " + unitId);

    let foundSemId, foundCrsId, foundUnitId;

    // let hrstart = process.hrtime()           //Used to check runtime

    // console.log("-----------------faster, but confusing code ----------------------")
    // let results = videoDB.semesters.map((semester) => semester.semesterId === semId && semester.courses.map((course) => course.courseId === crsId && course.units.filter((unit) => unit.unitId === unitId)));
    // let semesterResults = videoDB.semesters.filter((semester) => semester.semesterId === semId);
    // console.log(JSON.stringify(results, null, 4));

    // if(videoDB.semesters[semId-1] !== undefined && videoDB.semesters[semId-1].courses[crsId-1] !== undefined && videoDB.semesters[semId-1].courses[crsId-1].units[unitId-1] !== undefined){
    //     let results = videoDB.semesters[semId-1].courses[crsId-1].units[unitId-1];
    //     console.log(results.name);
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     res.end();
    // } else{
    //     //error
    //     res.status(400).json({ msg: "Error 404: Not found" })
    // }
    // console.log("----------------------------------------------------")

    foundSemId = videoDB.semesters.some((semester) => semester.semesterId === semId);
    if (foundSemId) {
        foundCrsId = videoDB.semesters[semId - 1].courses.some((course) => course.courseId === crsId);
        console.log("foundCrsId: " + foundCrsId);
        if (foundCrsId) {
            foundUnitId = videoDB.semesters[semId - 1].courses[crsId - 1].units.some((unit) => unit.unitId === unitId);
            console.log("foundUnitId: " + foundUnitId);
        }
    }


    if (foundSemId && foundCrsId && foundUnitId) {
        let unitContent = videoDB.semesters[semId - 1].courses[crsId - 1].units.filter((unit) => unit.unitId === unitId);
        console.log(unitContent[0].name);
        // sidebar stuff
        // sidebar dynamic items
        let sidebarItemsStr = "";
        for(let i=0;i<unitContent[0].videos.length;i++){
            sidebarItemsStr += `<div onclick="changeVideo(${i})" class="sidebarItems">
            <div class="thumbnail"><img class="TNimg" src="${unitContent[0].videos[i].url}" alt="${unitContent[0].videos[i].name}"></div>
            <h4>${unitContent[0].videos[i].name}</h4>
            </div>
            `;
        }
        // sidebar dynamic functions
        // let sidebarItemsFuncStr = `function changeVideo(id) {
        //     YouTubeVideoEle.setAttribute("src", "${unitContent[0].videos[id].url}")
        // }
        // `
        let id = 0;


        // console.log(sidebarItemsStr);

        let htmlPage = `<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Video Lecture Page</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel="stylesheet" href="../../public/css/navbarPC.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap" rel="stylesheet">
    <!-- <script src="https://www.desmos.com/api/v1.4/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script> -->
    <!-- <script src="https://www.geogebra.org/apps/deployggb.js"></script> -->

    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: "Open Sans", "Montserrat";
            height: max-content;
            min-height: 100%;
            background-color: rgb(200, 210, 220);
        }

        #header {
            height: 15vh;
            width: 100%;
            margin: 0;
            /* border: rgb(146, 54, 0) 1px solid; */
            border-bottom: rgb(95, 127, 159) 5px solid;
            /* border-radius: 8px; */
            background: linear-gradient(to bottom, rgb(230, 230, 230), rgb(180, 190, 200));
            /* padding: 5px; */
        }

        #header h1,
        #header h3 {
            padding: 4px;
            margin: 4px;
        }

        #mainContainer {
            width: 100%;
            height: max-content;
            /* padding: 5px; */
            /* border: rgb(146, 54, 0) 1px solid; */
            /* border-radius: 8px; */
            /* background-color: rgb(200, 210, 220); */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        #VGcontainer {
            /* margin: 5px; */
            /* border: rgb(146, 54, 0) 1px solid; */
            border-radius: 8px;
            min-height: max-content;
            width: 75%;
        }

        #video {
            /* margin: 0.5%; */
            width: 100%;
            height: max-content;
        }

        #YouTubeVideo {
            width: 100%;
            /* height: 70vh; */
        }

        #Desmos2D {
            width: 100%;
            height: 50vh;
            min-width: 400px;
            min-height: 300px;
            /* margin: 0.5%; */
            width: 100%;
        }

        #ggb-element {
            width: 100%;
            height: 50vh;
            min-width: 400px;
            min-height: 300px;
            /* margin: 0.5%; */
            width: 100%;
        }

        h2 {
            margin: 4px;
            padding: 4px;
        }

        #sidebar {
            height: max-content;
            width: 25%;
            min-width: 225px;
            /* border: rgb(146, 54, 0) 1px solid; */
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-items: center;
        }

        #sidebarHeading {
            width: max-content;
            height: max-content;
            position: relative;
            margin: 1%;
            padding: 1%;
            max-width: 98%;
        }

        #sidebarBox {
            margin: 1%;
            padding: 1%;
            position: relative;
            width: 96%;
            height: max-content;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-items: center;
        }

        .thumbnail {
            height: 90%;
            width: 40%;
        }
        
        .TNimg {
            height: 100%;
            width: 100%;
        }

        .sidebarItems {
            height: 100px;
            width: 95.5%;
            margin: 1%;
            margin-top: 2.5%;
            padding: 1%;
            border-bottom: 1px solid rgb(159, 127, 95);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-evenly;
            cursor: pointer;
        }

        .sidebarItems h4 {
            box-sizing: border-box;
            margin: 1%;
            padding: 1%;
            height: max-content;
            max-height: 100%;
            width: max-content;
            max-width: 55%;
        }
    </style>
</head>

<body>
    <div id="navbar">
        <div class="logo">

        </div>
        <div class="rowDiv">
            <div class="row">
                <a class="rowItems" href="/">Home</a>
                <a class="rowItems" href="/#announcements">Announcements</a>
            </div>

            <div class="row">
                <a class="rowItems" href="./ce.html">CE</a>
                <a class="rowItems" href="./cse.html">CSE</a>
                <a class="rowItems" href="./ece.html">ECE</a>
                <a class="rowItems" href="./eee.html">EEE</a>
                <a class="rowItems" href="./it.html">IT</a>
                <a class="rowItems" href="./me.html">ME</a>
            </div>
        </div>
    </div>

    <div id="NBblank"></div>

    <div id="header">
        <h1>Video Lectures...</h1>
        <h3 class="lectureTitle">[Lecture Name]</h3>
    </div>

    <div id="mainContainer">
        <div id="VGcontainer">

            <div id="video">
                <iframe id="YouTubeVideo" src="https://www.youtube.com/embed/5clVimof-r0" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
                <h2>[Lecture Title]</h2>

            </div>

            <h2>To visualize your concepts:</h2>

            <div class="appletSection">
                <div id="Desmos2D"></div>
            </div>

            <br>
            <div class="appletSection">
                <div id="ggb-element"></div>
            </div>
        </div>

        <div id="sidebar">

            <div id="sidebarHeading">
                <h3><u>Videos in this Unit</u></h3>
            </div>

            <div id="sidebarBox">

                ${sidebarItemsStr}

            </div>

        </div>

    </div>
    <script src="../../public/screenSizeCheck.js">
    <!-- Script for window size based rearragements -->
    <script>
        let YouTubeVideoElems = document.getElementsByTagName('iframe');
        let VGcontainerEle = document.getElementById('VGcontainer');
        let sidebarEle = document.getElementById('sidebar');
        let sidebarBoxEle = document.getElementById('sidebarBox');
        let sidebarItemsElems = document.getElementsByClassName('sidebarItems');
        let YouTubeVideoEle = YouTubeVideoElems[0];
        let DesmosEle = document.getElementById('Desmos2D');
        let GGB_Ele = document.getElementById('ggb-element');

        function resizeSbItems(newSize) {
            for (i = 0; i < sidebarItemsElems.length; i++) {
                sidebarItemsElems[i].style.width = newSize;
            }
        }

        if (parseInt(VGcontainerEle.clientWidth) < parseInt(560)) {
            VGcontainerEle.style.width = "100%";
            sidebarEle.style.width = "100%";
            sidebarBoxEle.style.flexDirection = "column";
            sidebarBoxEle.style.flexWrap = "nowrap";
            resizeSbItems("95%");
            YouTubeVideoEle.style.height = (YouTubeVideoEle.clientWidth / 560) * 315 + "px";
            DesmosEle.style.height = "75vh";
            GGB_Ele.style.height = "75vh";
            console.log(YouTubeVideoEle.style.height);
            console.log("Mobile Mode", VGcontainerEle.style.width, window.innerWidth);
        }
        else if (parseInt(VGcontainerEle.clientWidth) < parseInt(665)) {
            VGcontainerEle.style.width = "100%";
            sidebarEle.style.width = "100%";
            sidebarBoxEle.style.flexDirection = "row";
            sidebarBoxEle.style.flexWrap = "wrap";
            resizeSbItems("29%");
            YouTubeVideoEle.style.height = (YouTubeVideoEle.clientWidth / 560) * 315 + "px";
            console.log(YouTubeVideoEle.clientHeight);
            console.log("Small-Monitor Mode", VGcontainerEle.clientWidth, window.innerWidth);
        }
        else {
            YouTubeVideoEle.style.height = (YouTubeVideoEle.clientWidth / 560) * 315 + "px";
            console.log("Normal-Monitor Mode", VGcontainerEle.clientWidth, YouTubeVideoEle.style.height);
        }
        // Script for showing the videos
        function changeVideo(id) {
            YouTubeVideoEle.setAttribute("src", "${unitContent[0].videos[id].url}")
        }
    </script>
    <!-- Desmos 2D Grapher Applet -->
    <script>
        var elt = document.getElementById('Desmos2D');
        var calculator = Desmos.GraphingCalculator(elt);
        calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
    </script>
    <!-- Geogebra 3D Applet -->
    <script>
        var ggbApp = new GGBApplet({ "appName": "3d", "showToolBar": true, "showAlgebraInput": true, "showMenuBar": true }, true);
        window.addEventListener("load", function () {
            ggbApp.inject('ggb-element');
        });
    </script>
</body>

</html>`;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(htmlPage);
        res.end();
    }
    else {
        res.status(400).json({ msg: "Error 404: Not found" })
    }

    // console.log(process.hrtime(hrstart));            //The end of the runtime function
});

module.exports = router;