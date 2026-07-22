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

let currentPage = window.location.pathname.split("/").pop();

let navLinks = document.querySelectorAll("nav ul li a");


navLinks.forEach(link=>{

    let pageLink = link.getAttribute("href");


    if(pageLink === currentPage){

        link.classList.add("active");

    }
    else{

        link.classList.remove("active");

    }

});




// ============================
// LOGIN SYSTEM
// ============================


const loginForm = document.getElementById("loginForm");


if(loginForm){

const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit",function(e){

        e.preventDefault();


        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;



        if(username === "admin" && password === "admin123"){


            localStorage.setItem("loggedIn","true");

            localStorage.setItem("username",username);


            alert("Login successful ✅");


            window.location.href="index.html";


        }

        else{


            alert("Wrong username or password ❌");


        }


    });


}






// ============================
// LOGOUT
// ============================


function logout(){


    localStorage.removeItem("loggedIn");

    localStorage.removeItem("username");


    alert("You have been logged out 👋");


    window.location.href="login.html";


}






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

const notesSection = document.querySelector(".notes-section");



if(noteForm && notesSection){


    noteForm.addEventListener("submit",function(e){


        e.preventDefault();



        let title = this.querySelector("input").value;

        let text = this.querySelector("textarea").value;



        if(title === "" || text === ""){


            alert("Please fill all fields ✍️");


        }


        else{


            let newNote = document.createElement("div");


            newNote.classList.add("note-card");



            newNote.innerHTML = `

            <i class="fa-solid fa-note-sticky"></i>

            <h3>${title}</h3>

            <p>${text}</p>

            `;



            notesSection.prepend(newNote);



            alert("Note saved successfully ✅");


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

".card,.course-card,.planner-card,.note-card,.progress-card,.achievement-box"

);



cards.forEach(card=>{


let position = card.getBoundingClientRect().top;


if(position < window.innerHeight - 100){


card.style.opacity="1";

card.style.transform="translateY(0)";


}



});


});






// ============================
// STUDY TIMER
// ============================


let minutes = 25;

let seconds = 0;



function startTimer(){


let timer = setInterval(()=>{


if(seconds === 0){


if(minutes === 0){


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


console.log(minutes + ":" + seconds);



},1000);



}
// ============================
// PROTECT PAGES
// ============================

let protectedPages = [
    "index.html",
    "planner.html",
    "courses.html",
    "progress.html",
    "notes.html",
    "contact.html"
];


let currentPageName = window.location.pathname.split("/").pop();


if(protectedPages.includes(currentPageName)){

    if(localStorage.getItem("loggedIn") !== "true"){

        window.location.href = "login.html";

    }

}
