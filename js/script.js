// ============================
// MOBILE MENU
// ============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("show");

    });

}


// ============================
// ACTIVE LINK
// ============================

let links = document.querySelectorAll("nav ul li a");

links.forEach(link=>{

    link.addEventListener("click",function(){

        links.forEach(item=>{
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// ============================
// COURSE BUTTONS
// ============================

let courseButtons = document.querySelectorAll(".course-card button");


courseButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        alert("Course details will be available soon 📚");

    });

});


// ============================
// NOTES SYSTEM
// ============================

const noteForm = document.querySelector(".write-note form");


if(noteForm){

noteForm.addEventListener("submit",function(e){

    e.preventDefault();


    let title = this.querySelector("input").value;

    let text = this.querySelector("textarea").value;


    if(title==="" || text===""){

        alert("Please fill all fields ✍️");

    }

    else{

        alert("Your note has been saved successfully ✅");


        this.reset();

    }


});


}


// ============================
// CONTACT FORM
// ============================

const contactForm = document.querySelector(".contact-form form");


if(contactForm){

contactForm.addEventListener("submit",function(e){

    e.preventDefault();


    alert("Your message has been sent successfully 📩");


    this.reset();


});

}


// ============================
// SCROLL ANIMATION
// ============================


window.addEventListener("scroll",()=>{


let cards = document.querySelectorAll(
".card,.course-card,.planner-card,.note-card,.achievement-box"
);


cards.forEach(card=>{


let position = card.getBoundingClientRect().top;


let screen = window.innerHeight;


if(position < screen - 100){

card.style.opacity="1";

card.style.transform="translateY(0)";


}


});


});



// ============================
// INITIAL ANIMATION
// ============================


window.onload=()=>{


let elements=document.querySelectorAll(
".card,.course-card,.planner-card,.note-card,.achievement-box"
);


elements.forEach(element=>{


element.style.opacity="0";

element.style.transform="translateY(40px)";

element.style.transition="0.6s";


});


};



// ============================
// STUDY TIMER (POMODORO)
// ============================


let minutes = 25;

let seconds = 0;


function startTimer(){


let timer = setInterval(()=>{


if(seconds===0){


if(minutes===0){


clearInterval(timer);

alert("Study session finished 🎉");


return;


}


minutes--;

seconds=59;


}

else{


seconds--;

}


console.log(
minutes + ":" + seconds
);


},1000);


}