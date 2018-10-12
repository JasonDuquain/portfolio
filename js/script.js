
let header = document.querySelector('.header');
let nav = document.querySelector('.nav');

document.addEventListener('scroll', (e) => {
    if (header.getBoundingClientRect().bottom <= 0) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
        
    }
});


