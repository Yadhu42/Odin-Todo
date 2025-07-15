import "./style.css";
import { initAddNote } from "./displayNote.js";
import { initProj, pullProject} from "./displayProject.js";
import {loadFromLocalStorage} from "./project.js";

const open = document.querySelector(`#openNav`);
const close = document.querySelector(`#closeNav`);
const container = document.querySelector(`.container`);
const sideNav = document.querySelector(`.sideNav`);
const nightMode = document.querySelector(`#day`);
const root = document.documentElement;


document.addEventListener(`DOMContentLoaded`,() =>{
    loadFromLocalStorage();
    initAddNote();
    sideNav.classList.add(`ready`);
    initProj();
    pullProject(`Demo`);
});

open.addEventListener(`click`,()=>{
    sideNav.setAttribute(`style`,`transform: scaleX(1);`);
    container.setAttribute(`style`,`margin-left:300px`);
});

close.addEventListener(`click`,()=>{
    sideNav.setAttribute(`style`,`transform: scaleX(0);`);
    container.setAttribute(`style`,`margin-left:0`);     
});

nightMode.addEventListener(`click`,() =>{
    let theme = root.className === `dark`? `light`:`dark`;
    root.className=theme;
})
