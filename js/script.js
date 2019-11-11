/***********   STICKY NAV  ***************/
let header = document.querySelector('.header');
let nav = document.querySelector('.nav');

document.addEventListener('scroll', (e) => {
    if (header.getBoundingClientRect().bottom <= 0) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
        
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
