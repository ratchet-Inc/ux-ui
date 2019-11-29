// JavaScript source code
'use strict';

var phase = 0;

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
    switch (curView) {
        case 2:
            $(".zoom").attr('style', 'transform: scale(1.0)');
            break;
    }
}

function GotoCarosel(index) {
    console.log("called.");
}

function pulse() {
    console.log("cpulse called.");
    if (phase === 0) {
        $(".iconLabel").fadeOut(750);
        phase = 1;
    } else {
        $(".iconLabel").fadeIn(750);
        phase = 0;
    }
}

function main() {
    console.log("script loaded.");
    $('#carouselPrimary').carousel({
        interval: false,
        keyboard: false
    });
    $('#carouselPrimary').on('slid.bs.carousel', CarouselCallback);
    setInterval(function () { pulse(); }, 1500);
}

document.addEventListener("DOMContentLoaded", function (ev) { main(); });