const hoverElt = document.querySelector(".hover-elt")
const navLink = document.querySelector(".navbar > ul")
const navLinks = Array.from(document.querySelectorAll(".navbar > ul > li"))

if (!hoverElt || !navLink) {
    throw new Error("Element not found")
}

function handleHover(e) {
    const navLinkX = navLink.getBoundingClientRect().x
    const eltLink = e.target.getBoundingClientRect().x
    const posLeft = eltLink - navLinkX
    hoverElt.style.opacity = "1"
    hoverElt.style.left = `${posLeft}px`
    hoverElt.style.width = `${e.target.offsetWidth}px`
}

function handleLeave() {
    hoverElt.style.opacity = "0"
}

navLinks.forEach((elt) => {
    elt.addEventListener("mouseenter", handleHover)
    elt.addEventListener("mouseleave", handleLeave)
})


//---------------------------------Visible and Unvisible----------------------------

const ratio = .1
const options ={
    root: null,
    rootMargin: "0px",
    threshold: ratio,
}
const callback = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > ratio) {
            entry.target.classList.add('block-visible');
            observer.unobserve(entry.target);
        }

    })
    console.log('callback');
}
const observer = new IntersectionObserver(callback, options);
document.querySelectorAll('.block').forEach(function(r){
    observer.observe(r);
})


//-----------------------------------Accordion-----------------------------------------------
const accordions = document.querySelector(".accordion")
const panel = document.querySelector(".panel")

accordions.addEventListener("click", function () {
    this.classList.toggle("active")

    if (panel.classList.contains("show")) {
        panel.classList.remove("show")
    } else {
        panel.classList.add("show")
    }
})


//---------------------------------------------Slide-----------------------------------------

class Slider {
    constructor(el) {
        this.nextButton = el.querySelector("[data-slider-next]")
        this.prevButton = el.querySelector("[data-slider-prev]")
        this.wrapper = el.querySelector("[data-slider-wrapper]")
        this.nextButton.addEventListener("click", () => this.move(1))
        this.prevButton.addEventListener("click", () => this.move(-1))
        console.log(this.pages)
    }

    get itemsToScroll() {
        parseInt(window.getComputedStyle(this.wrapper).getPropertyValue
        ("--items"), 10)
    }

    get pages() {
        return Math.ceil(this.wrapper.children.length / this.itemsToScroll)
    }

    get page() {
        return Math.ceil(this.wrapper.scrollLeft / this.wrapper.offsetWidth)
    }

    move(n) {
        let newPage = this.page + n

        if (newPage < 0) newPage = 0
        if (newPage >= this.pages) newPage = this.page - 1

        this.wrapper.scrollTo({
            left: this.wrapper.children[newPage * this.itemsToScroll].offsetLeft,
            behavior: "smooth",
        })
    }
}
new Slider(document.querySelector("[data-slider]"))

/*-----------------------------------Responsive-----------------------------------*/


let openSubMenu = document.querySelectorAll(".main_title")
let closeSubMenu = document.querySelectorAll(".position")
let subMenu = document.querySelectorAll(".sub-menu")
let Menu = document.querySelector(".nav-ul")

openSubMenu.forEach((title,index) => {
    title.addEventListener("click", function (){
        subMenu[index].classList.toggle("Active")
    })
})

closeSubMenu.forEach((title, index) => {
    title.addEventListener("click", function (){
        subMenu[index].classList.remove("Active")

    })
})

