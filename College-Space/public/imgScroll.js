const imgScrollEle = document.getElementsByClassName('imgScroll');
const TTleftEle = document.getElementById('TTleft');
const TTrightEle = document.getElementById('TTright');

// Global vars

let curEle = 0;

// Objects

// let TTObj = {
//     eleCount : imgScrollEle[0].children.length,
//     curEle : 0,

//     // functions
//     TTleftScrl: () => {
//         imgScrollEle[0].style = "transform: translate("+ (this.curEle) * 50 +"%, -50%)";
//         this.curEle += 1;
//         console.log(this.curEle);
//     }
// }

// const ttObj = new TTObj;





function animation(time){
    
    if((animation.t/time)<=1){
        let buffer = ((animation.t)^4)+(-3.8 * (animation.t)^3)+(3.7 * (animation.t)^2)+(0.1 * (animation.t))/1000;
        imgScrollEle[0].style.transform = "translate(-"+ ((curEle - 1) + (buffer)) * 40 +"vw, 0)";
        console.log(buffer);
    }
    animation.t += 22;
}

function animationTimer(time){
    animation.t = 0;
    let animationFrame = setInterval(animation, 5, 500);
    
    setTimeout(() => {
        // if((animation.t) === time){
            {
            clearInterval(animationFrame);
        }
        console.log("AniFrame:", animationFrame);
        console.log(animation.t);
    }, time);
    animation.t=0;
}


TTleftEle.addEventListener('click', () => {
    let eleCount = imgScrollEle[0].children.length;

    // for{setTimeout(() => {console.log()}, 1000)}

    if(curEle > 0){
        curEle -= 1;
        imgScrollEle[0].style.transform = "translate(-"+ curEle * 40 +"vw, 0)";
    }

    console.log(eleCount);
})

TTrightEle.addEventListener('click', () => {
    let eleCount = imgScrollEle[0].children.length;

    if(curEle<eleCount){
        curEle += 1;
        
        animationTimer(500);

        for(let t=0;t<500;t++){

        }
    }

    console.log(eleCount);
})