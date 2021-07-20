const hero = document.querySelector('.hero');
const slider = document.querySelector('.slider');
const headline = document.querySelector('#headline');
const heroButton = document.querySelector('#hero-sign-in-btn');
const heroButton2 = document.querySelector('#hero-sign-up-btn');


const tl = new TimelineMax();

tl.fromTo(hero, 1, {height: '0'}, {height: '100%', ease: Power2.easeInOut})
.fromTo(hero, 1.2, {width: '100%'}, {width: '80%', ease: Power2.easeInOut}, "-=0.3")
.fromTo(slider, 1.2, {y: '-100%'}, {y: '0%', ease: Power2.easeInOut}, "-=1.2")
.fromTo(headline, 1, {opacity: 0, x: 30}, {opacity: 1, x: 0})
.fromTo(heroButton, 0.5, {opacity: 0, x: 30}, {opacity: 1, x: 0}, "-=0.2")
.fromTo(heroButton2, 0.3, {opacity: 0, x: 30}, {opacity: 1, x: 0}, "-=0.2")