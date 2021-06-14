// Script for navbar in mobile version

if (window.innerWidth < 750) {
    const navbarEle = document.getElementById('navbar');
    // console.log(navbarEle.innerHTML);

    navbarEle.innerHTML = `
    <button id="menuBtn">M</button>
        <div id="NBblank"></div>
        <div id="rowDivs">
            <div class="rowDiv">
                <a class="rowItems" href="/">Home</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="/#announcements">Announcements</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="./ce.html">CE</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="./cse.html">CSE</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="./ece.html">ECE</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="./eee.html">EEE</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="./it.html">IT</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="./me.html">ME</a>
            </div>
            <div class="rowDiv">
                <a class="rowItems" href="./unitSearch">Video Lectures</a>
            </div>
        </div>
        `;

    // console.log(navbarEle.outerHTML);

    const linkAddress = document.getElementById('navbarLink');
    const menuBtnEle = document.getElementById('menuBtn');
    const navbarItems = document.getElementById('rowDivs').getElementsByTagName('a');
    let navbarStatus = 0;

    linkAddress.setAttribute("href", "/css/navbarMob.css");

    function NBitemsAdjust(newPos) {
        for (let i = 0; i < navbarItems.length; i++) {
            navbarItems[i].style.transform = "translateX(" + newPos + ")";
        }
    }

    function navbarResize() {
        if (navbarStatus === 0) {
            navbarEle.style.height = "100vh";
            NBitemsAdjust("0");
            menuBtnEle.innerHTML = "X";
            navbarStatus = 1;
        }
        else {
            navbarEle.style.height = "0";
            NBitemsAdjust("-100%");
            menuBtnEle.innerHTML = "M";
            navbarStatus = 0;
        }
    }

    menuBtnEle.addEventListener("click", () => {
        navbarResize();
        // console.log("click");
    })
}