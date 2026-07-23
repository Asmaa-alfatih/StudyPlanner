// ============================
// MOBILE MENU
// ============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}

// ============================
// ACTIVE LINK
// ============================

let currentPage = window.location.pathname.split("/").pop();

let links = document.querySelectorAll("nav ul li a");

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

// ============================
// REGISTER SYSTEM
// ============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("regUsername").value.trim();
        let email = document.getElementById("regEmail").value.trim();
        let password = document.getElementById("regPassword").value.trim();

        if (username === "" || email === "" || password === "") {
            alert("⚠️ Please fill all fields");
            return;
        }

        // Check if user already exists
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userExists = users.some(user => user.email === email);

        if (userExists) {
            alert("⚠️ This email is already registered. Please login.");
            return;
        }

        // Add new user
        let newUser = {
            username: username,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("✅ Account created successfully! You can now login.");
        window.location.href = "login.html";
    });
}

// ============================
// LOGIN SYSTEM
// ============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();

        if (email === "" || password === "") {
            alert("⚠️ Please enter email and password");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", foundUser.username);
            localStorage.setItem("userEmail", foundUser.email);

            alert("✅ Login successful! Welcome " + foundUser.username);
            window.location.href = "index.html";
        } else {
            alert("❌ Invalid email or password. Please try again.");
        }
    });
}

// ============================
// PROTECT PAGES
// ============================

// Protected pages (all pages except login and register)
let protectedPages = [
    "index.html",
    "planner.html",
    "courses.html",
    "progress.html",
    "notes.html",
    "contact.html"
];

let page = window.location.pathname.split("/").pop();

// If current page is protected and user is not logged in → go to login
if (protectedPages.includes(page)) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

// If user is logged in and tries to access login or register → go to home
if ((page === "login.html" || page === "register.html") && localStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
}

// ============================
// LOGOUT
// ============================

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");

    alert("👋 Logged out successfully");
    window.location.href = "login.html";
}

// ============================
// PLANNER SYSTEM
// ============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    let day = document.getElementById("day").value;
    let task = document.getElementById("task").value.trim();

    if (task === "") {
        alert("⚠️ Please enter a task");
        return;
    }

    let newTask = {
        id: Date.now(),
        day: day,
        task: task,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task").value = "";
    displayTasks();
}

function displayTasks() {
    let planner = document.getElementById("plannerList");
    if (!planner) return;

    planner.innerHTML = "";

    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    days.forEach(day => {
        let dayTasks = tasks.filter(item => item.day === day);

        if (dayTasks.length > 0) {
            let box = document.createElement("div");
            box.className = "planner-card";

            box.innerHTML = `
                <h2>
                    <i class="fa-solid fa-calendar-day"></i>
                    ${day}
                </h2>
                ${dayTasks.map(item => `
                    <p>
                        <input 
                            type="checkbox"
                            ${item.completed ? "checked" : ""}
                            onchange="completeTask(${item.id})">
                        ${item.task}
                    </p>
                `).join("")}
            `;

            planner.appendChild(box);
        }
    });
}

function completeTask(id) {
    tasks = tasks.map(item => {
        if (item.id === id) {
            item.completed = !item.completed;
        }
        return item;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Run planner when page loads
displayTasks();

// ============================
// PROGRESS SYSTEM
// ============================

function loadProgress() {
    let container = document.getElementById("progressContainer");
    if (!container) return;

    container.innerHTML = "";

    let subjects = {};

    tasks.forEach(item => {
        if (!subjects[item.day]) {
            subjects[item.day] = [];
        }
        subjects[item.day].push(item);
    });

    let total = tasks.length;
    let completed = tasks.filter(item => item.completed).length;
    let percent = 0;

    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    document.getElementById("totalTasks").innerHTML = total;
    document.getElementById("completedTasks").innerHTML = completed;
    document.getElementById("percentage").innerHTML = percent + "%";

    Object.keys(subjects).forEach(day => {
        let list = subjects[day];
        let done = list.filter(item => item.completed).length;
        let rate = Math.round((done / list.length) * 100);

        container.innerHTML += `
            <div class="progress-card">
                <h2>${day}</h2>
                <div class="progress-bar">
                    <div class="progress-fill" style="width:${rate}%">
                        ${rate}%
                    </div>
                </div>
            </div>
        `;
    });
}

loadProgress();

// ============================
// COURSE BUTTONS
// ============================

let courseButtons = document.querySelectorAll(".course-card button");

courseButtons.forEach(button => {
    button.addEventListener("click", () => {
        alert("📚 Course details will be available soon");
    });
});

// ============================
// NOTES SYSTEM - WITH LOCAL STORAGE
// ============================

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to display notes
function displayNotes() {
    let container = document.getElementById("notesContainer");
    if (!container) return;

    container.innerHTML = "";

    if (notes.length === 0) {
        container.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:50px; color:#999;">
                <i class="fa-solid fa-note-sticky" style="font-size:50px; margin-bottom:20px;"></i>
                <p>No notes yet. Create your first note below!</p>
            </div>
        `;
        return;
    }

    // Display notes in reverse order (newest first)
    [...notes].reverse().forEach((note, index) => {
        let realIndex = notes.length - 1 - index;
        let card = document.createElement("div");
        card.className = "note-card";

        // Random color for note icon
        const colors = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#db2777'];
        let color = colors[realIndex % colors.length];

        card.innerHTML = `
            <i class="fa-solid fa-note-sticky" style="color:${color};"></i>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small style="color:#999; display:block; margin-top:10px; font-size:12px;">
                ${note.date || new Date().toLocaleDateString()}
            </small>
            <button onclick="deleteNote(${realIndex})" style="
                background:#dc2626; 
                color:white; 
                border:none; 
                padding:6px 15px; 
                border-radius:10px; 
                cursor:pointer; 
                margin-top:10px;
                font-size:13px;
            ">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        `;

        container.appendChild(card);
    });
}

// Function to add a new note
function addNote(title, content) {
    let newNote = {
        title: title,
        content: content,
        date: new Date().toLocaleString()
    };

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

// Function to delete a note
function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}

// Handle note form submission
let noteForm = document.getElementById("noteForm");

if (noteForm) {
    noteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let title = document.getElementById("noteTitle").value.trim();
        let content = document.getElementById("noteContent").value.trim();

        if (title === "" || content === "") {
            alert("⚠️ Please fill in both title and content");
            return;
        }

        addNote(title, content);
        alert("✅ Note saved successfully!");

        // Clear form
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteContent").value = "";
    });
}

// Display notes when page loads
displayNotes();

// ============================
// CONTACT FORM - AUTO FILL USER DATA
// ============================

function fillUserContactData() {
    let fullNameInput = document.getElementById("fullName");
    let emailInput = document.getElementById("emailAddress");
    let userDisplayName = document.getElementById("userDisplayName");
    
    let username = localStorage.getItem("username");
    let userEmail = localStorage.getItem("userEmail");
    
    if (userDisplayName) {
        userDisplayName.textContent = username || "User";
    }
    
    if (fullNameInput && emailInput) {
        if (username && userEmail) {
            fullNameInput.value = username;
            emailInput.value = userEmail;
        } else {
            fullNameInput.value = "Guest User";
            emailInput.value = "guest@example.com";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fillUserContactData();
});

// ============================
// CONTACT FORM SUBMIT
// ============================

let contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        let name = document.getElementById("fullName").value;
        let email = document.getElementById("emailAddress").value;
        let subject = document.getElementById("subjectField").value;
        let message = document.getElementById("messageField").value;
        
        if (subject === "" || message === "") {
            alert("⚠️ Please fill in subject and message");
            return;
        }
        
        alert(`✅ Message sent successfully!\n\nSender: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
        
        document.getElementById("subjectField").value = "";
        document.getElementById("messageField").value = "";
    });
}