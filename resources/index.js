// JavaScript source code
'use strict';

var phase = 0;
var NavLinks = null;
var ZoomInterval = null;
var quizEval = false;
var quizReady = false;
var visited = { v1: false, v2: false, v3: false, v4: false };

function initComparisons() {
    var x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-comp-overlay active1");
    for (i = 0; i < x.length; i++) {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(x[i]);
    }
    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        /*get the width and height of the img element*/
        w = img.offsetWidth;
        h = img.offsetHeight;
        /*set the width of the img element to 50%:*/
        img.style.width = (w / 2) + "px";
        /*create slider:*/
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /*insert slider*/
        img.parentElement.insertBefore(slider, img);
        /*position the slider in the middle:*/
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        /*execute a function when the mouse button is pressed:*/
        slider.addEventListener("mousedown", slideReady);
        /*and another function when the mouse button is released:*/
        window.addEventListener("mouseup", slideFinish);
        /*or touched (for touch screens:*/
        slider.addEventListener("touchstart", slideReady);
        /*and released (for touch screens:*/
        window.addEventListener("touchstop", slideFinish);
        function slideReady(e) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*the slider is now clicked and ready to move:*/
            clicked = 1;
            /*execute a function when the slider is moved:*/
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            /*the slider is no longer clicked:*/
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            /*if the slider is no longer clicked, exit this function:*/
            if (clicked === 0) return false;
            /*get the cursor's x position:*/
            pos = getCursorPos(e);
            /*prevent the slider from being positioned outside the image:*/
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            /*execute a function that will resize the overlay image according to the cursor:*/
            slide(pos);
        }
        function getCursorPos(e) {
            var a, x = 0;
            e = e || window.event;
            /*get the x positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x coordinate, relative to the image:*/
            x = e.pageX - a.left;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            /*resize the image:*/
            img.style.width = x + "px";
            /*position the slider:*/
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}

function EvalQuiz() {
    if (quizEval) {
        return 1;
    }
    var f = document.forms["quizForm"];
    var groups = $(".form-group");
    if (f["Q1"].value === "option1") {
        groups[0].classList.add("valid-feedback");
        groups[0].classList.add("d-block");
    } else {
        groups[0].classList.add("invalid-feedback");
        groups[0].classList.add("d-block");
    }
    if (f["Q2"].value === "option1") {
        groups[1].classList.add("valid-feedback");
        groups[1].classList.add("d-block");
    } else {
        groups[1].classList.add("invalid-feedback");
        groups[1].classList.add("d-block");
    }
    if (f["Q3"].value === "option2") {
        groups[2].classList.add("valid-feedback");
        groups[2].classList.add("d-block");
    } else {
        groups[2].classList.add("invalid-feedback");
        groups[2].classList.add("d-block");
    }
    quizEval = true;
    return 0;
}

function CarouselCallback(){
    var curView = 0;
    var els = document.getElementsByClassName("carousel-item");
    for (var i = 0; i < els.length; i++) {
        if (els[i].className === "carousel-item active") {
            curView = i;
            break;
        }
    }
    console.log("found: " + curView);
    $(".list-group-item").removeClass("active");
    document.getElementsByClassName("pages")[curView].classList.add("active");
}

function InstrTextLoop() {
    $('#instrText')
        .animate({ top: 20 }, 1500)
        .animate({ top: 10 }, 1500, InstrTextLoop);
}

function ZoomCallBack() {
    $(".zoom").attr('style', 'transform: scale(1.0)');
    clearInterval(ZoomInterval);
    InstrTextLoop();
}

function GotoCarosel(index, prev = -1) {
    var views = ["", ""];
    $(".img-comp-overlay").removeClass("active1");
    if (visited.v1 === true) {
        $(".labelAIcon").addClass("iconLabelFade");
    }
    if (visited.v2 === true) {
        $(".labelBIcon").addClass("iconLabelFade");
    }
    if (visited.v3 === true) {
        $(".labelCIcon").addClass("iconLabelFade");
    }
    if (visited.v4 === true) {
        $(".labelDIcon").addClass("iconLabelFade");
    }
    switch (index) {
        case 0:
            NavLinks[0].classList.add("active");
            NavLinks[1].classList.remove("active");
            $(".NavPage").addClass("hideView");
            $("#View0").removeClass("hideView");
            return;
        case 1:
            views[0] = "#View0";
            views[1] = "#View1";
            NavLinks[0].classList.remove("active");
            break;
        case 2:
            views[0] = "#View1";
            views[1] = "#View2";
            NavLinks[0].classList.remove("active");
            NavLinks[1].classList.add("active");
            if (ZoomInterval === null) {
                ZoomInterval = setInterval(ZoomCallBack, 500);
            }
            if (prev === -1) {
                $(".NavPage").addClass("hideView");
            }
            if (visited.v1 === true & visited.v2 === true & visited.v3 === true & visited.v4 === true) {
                quizReady = true;
                $("#quizStatus").html("Unlocked");
                $("#quizStatus").css('color', 'green');
                $("#quizBtn").removeClass("disabled");
            }
            break;
        case 3:
            views[0] = "#View2";
            if (prev !== -1) {
                views[0] = "#View" + prev;
            }
            views[1] = "#View3";
            NavLinks[1].classList.remove("active");
            break;
        case 4:
            views[0] = "#View2";
            if (prev !== -1) {
                views[0] = "#View" + prev;
            }
            views[1] = "#View4";
            NavLinks[1].classList.remove("active");
            break;
        case 5:
            views[0] = "#View2";
            if (prev !== -1) {
                views[0] = "#View" + prev;
            }
            views[1] = "#View5";
            NavLinks[1].classList.remove("active");
            break;
        case 7:
            if (quizReady === false) {
                return;
            }
            views[0] = "#View2";
            views[1] = "#View7";
            NavLinks[1].classList.remove("active");
            break;
        case 8:
            views[0] = "#View2";
            if (prev !== -1) {
                views[0] = "#View" + prev;
            }
            views[1] = "#View8";
            NavLinks[1].classList.remove("active");
            break;
        default:
            console.log("Unknown case hit.");
            break;
    }
    $(views[0]).addClass("hideView");
    $(views[1]).removeClass("hideView");
    if (index === 3 & visited.v1 === false) {
        $("#comp1").addClass("active1");
        initComparisons();
        visited.v1 = true;
    }
    if (index === 4 & visited.v2 === false) {
        $("#comp2").addClass("active1");
        initComparisons();
        visited.v2 = true;
    }
    if (index === 5 & visited.v3 === false) {
        $("#comp3").addClass("active1");
        initComparisons();
        visited.v3 = true;
    }
    if (index === 8 & visited.v4 === false) {
        $("#comp4").addClass("active1");
        initComparisons();
        visited.v4 = true;
    }
}

function main() {
    console.log("script loaded.");
    NavLinks = $(".nav-item");
    $('form').submit(false);
    $('#carouselExampleIndicators').carousel({
        interval: false,
        keyboard: false
    });
    $('#carouselExampleIndicators').on('slid.bs.carousel', CarouselCallback);
}

document.addEventListener("DOMContentLoaded", function (ev) { main(); });