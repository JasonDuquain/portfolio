/* zenscroll code */

!function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():function n(){document&&document.body?t.zenscroll=e():setTimeout(n,9)}()}(this,function(){"use strict";var t=function(t){return t&&"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,o){n=n||999,o||0===o||(o=9);var i,r=function(t){i=t},u=function(){clearTimeout(i),r(0)},c=function(t){return Math.max(0,e.getTopOf(t)-o)},a=function(o,i,c){if(u(),0===i||i&&i<0||t(e.body))e.toY(o),c&&c();else{var a=e.getY(),f=Math.max(0,o)-a,s=(new Date).getTime();i=i||Math.min(Math.abs(f),n),function t(){r(setTimeout(function(){var n=Math.min(1,((new Date).getTime()-s)/i),o=Math.max(0,Math.floor(a+f*(n<.5?2*n*n:n*(4-2*n)-1)));e.toY(o),n<1&&e.getHeight()+o<e.body.scrollHeight?t():(setTimeout(u,99),c&&c())},9))}()}},f=function(t,e,n){a(c(t),e,n)},s=function(t,n,i){var r=t.getBoundingClientRect().height,u=e.getTopOf(t)+r,s=e.getHeight(),l=e.getY(),d=l+s;c(t)<l||r+o>s?f(t,n,i):u+o>d?a(u-s+o,n,i):i&&i()},l=function(t,n,o,i){a(Math.max(0,e.getTopOf(t)-e.getHeight()/2+(o||t.getBoundingClientRect().height/2)),n,i)};return{setup:function(t,e){return(0===t||t)&&(n=t),(0===e||e)&&(o=e),{defaultDuration:n,edgeOffset:o}},to:f,toY:a,intoView:s,center:l,stop:u,moving:function(){return!!i},getY:e.getY,getTopOf:e.getTopOf}},n=document.documentElement,o=function(){return window.scrollY||n.scrollTop},i=e({body:document.scrollingElement||document.body,toY:function(t){window.scrollTo(0,t)},getY:o,getHeight:function(){return window.innerHeight||n.clientHeight},getTopOf:function(t){return t.getBoundingClientRect().top+o()-n.offsetTop}});if(i.createScroller=function(t,o,i){return e({body:t,toY:function(e){t.scrollTop=e},getY:function(){return t.scrollTop},getHeight:function(){return Math.min(t.clientHeight,window.innerHeight||n.clientHeight)},getTopOf:function(t){return t.offsetTop}},o,i)},"addEventListener"in window&&!window.noZensmooth&&!t(document.body)){var r="history"in window&&"pushState"in history,u=r&&"scrollRestoration"in history;u&&(history.scrollRestoration="auto"),window.addEventListener("load",function(){u&&(setTimeout(function(){history.scrollRestoration="manual"},9),window.addEventListener("popstate",function(t){t.state&&"zenscrollY"in t.state&&i.toY(t.state.zenscrollY)},!1)),window.location.hash&&setTimeout(function(){var t=i.setup().edgeOffset;if(t){var e=document.getElementById(window.location.href.split("#")[1]);if(e){var n=Math.max(0,i.getTopOf(e)-t),o=i.getY()-n;0<=o&&o<9&&window.scrollTo(0,n)}}},9)},!1);var c=new RegExp("(^|\\s)noZensmooth(\\s|$)");window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){if(u){var n=history.state&&"object"==typeof history.state?history.state:{};n.zenscrollY=i.getY();try{history.replaceState(n,"")}catch(t){}}var o=e.getAttribute("href")||"";if(0===o.indexOf("#")&&!c.test(e.className)){var a=0,f=document.getElementById(o.substring(1));if("#"!==o){if(!f)return;a=i.getTopOf(f)}t.preventDefault();var s=function(){window.location=o},l=i.setup().edgeOffset;l&&(a=Math.max(0,a-l),r&&(s=function(){history.pushState({},"",o)})),i.toY(a,null,s)}}},!1)}return i});



let docBody = document.body;
let docElement = document.documentElement;



/***********   STICKY NAV  ***************/
let header = document.querySelector('.header');
let nav = document.querySelector('.nav');
let navHeight = nav.getBoundingClientRect().height;

document.addEventListener('scroll', (e) => {
    if (header.getBoundingClientRect().bottom <= 0) {
        nav.classList.add('sticky');
        docBody.style.paddingTop = `${navHeight}px`;
    } else {
        nav.classList.remove('sticky');
        docBody.style.paddingTop = 0;
        
    }
});

/***********   BLUR ON SCROLL  ***************/
let content = document.querySelector('.header__wrap');
let blur = document.querySelector('.header__overlay'); // this element has the filter: blur(4px) applied
let wHeight = window.innerHeight;


window.addEventListener('resize', () => wHeight = window.innerHeight);

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        function( cb ){
            window.setTimeout(cb, 1000 / 60);
        };
})();

class Scroller {
    constructor() {
        this.latestKnownScrollY = 0;
        this.ticking = false; 
    }
    
    init() {
        window.addEventListener('scroll', this.onScroll.bind(this));
        let hdr = document.querySelector('header:first-of-type');
        console.log(hdr);
        let hdrStyles = window.getComputedStyle(hdr);
        let hdrBgImg = hdrStyles.getPropertyValue('background-image');
        blur.style.backgroundImage = hdrBgImg;
    }

    onScroll() {
        this.latestKnownScrollY = window.scrollY;
        this.requestTick();
    }

    requestTick() {
        if ( !this.ticking ) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    }

    update() {
        let currentScrollY = this.latestKnownScrollY;
        this.ticking = false;
      
        let slowScroll = currentScrollY / 2;
        let blurScroll = currentScrollY * 2;
        let opaScroll = 1.4 - currentScrollY / 400;
      
        content.style.transform = `translateY(slowScroll)px`;
        content.style.opacity = opaScroll;
      
        blur.style.opacity = blurScroll / wHeight; 
    }
    
}

var scroller = new Scroller();  
scroller.init();


/*****  vara.js svg wrting animation  ******/

var fontSize = 50;

var vara = new Vara(
    ".header__heading",
    "js/SatisfySL.json",
    [
        {
            text : "Creative",
            y: 0,
            fromCurrentPosition: { y: false},
            duration: 2000
        }

    ],

    {
        strokeWidth: 2,
        color: "#fff",
        fontSize: 60
    }

);
        
vara.animationEnd(function() {
    
    /****** Typing text ******/
    const typedTextSpan = document.querySelector(".header__heading--two");
    const cursorSpan = document.querySelector(".header__heading-cursor");

    const textArray = ["developer", "designer", "developer"];
    const typingDelay = 150;
    const erasingDelay = 75;
    const newTextDelay = 800; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    let totalChars = 0;
    
    setTimeout(type, 500)
    
    function type() {
        
        totalChars++;
        
        if (textArrayIndex === textArray.length) {
            return;
        }
        
        if (charIndex < textArray[textArrayIndex].length) {
            
            cursorSpan.style.opacity = 1;

            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            } 
            
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            
            // make sure it does not stop the 1st time 'developer' is typed
            if (totalChars > 19 && typedTextSpan.textContent === 'developer') {
                cursorSpan.classList.remove('typing');
                return;
            }
            
            var clearIt = setTimeout(type, typingDelay);

        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
            //clearInterval(clearIt);
        }
    }

    function erase() {
        if (charIndex > 0) {

            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            } 

            typedTextSpan.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;

            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }

            setTimeout(type, typingDelay);

        }
    }
    
    
    /*var erase = true;
    vara.animationEnd(function(i, o) {
        if (i === "no_erase") {
           erase = false; 
        }
        if (erase) {
            o.container.style.transition = "opacity 1s 1s";
            o.container.style.opacity = 0;
        }
    });*/

})


/*** Typing text ***/




/*
document.addEventListener("DOMContentLoaded", function() { 
    if (textArray.length) {
        setTimeout(type, newTextDelay)
    }
});
*/
