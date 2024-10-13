// login.js

// User lists
const managers = ['גיל', 'gil', 'ארתור', 'arthur'];
const workers = ['יבגני', 'evgeniy', 'ערן', 'eran', 'ולרי', 'valery'];

// Main login function
function login() {
    console.log("Login function called");

    const usernameInput = document.getElementById('username');
    const loadingMessage = document.getElementById('loadingMessage');

    if (!usernameInput || !loadingMessage) {
        console.error("Required elements not found");
        alert('שגיאה במערכת. אנא רענן את הדף ונסה שוב.');
        return;
    }

    const username = usernameInput.value.trim().toLowerCase();
    console.log("Username entered:", username);

    if (username === '') {
        alert('נא להזין שם משתמש');
        return;
    }

    // Display loading message
    loadingMessage.style.display = 'block';

    // Save username to localStorage
    localStorage.setItem('currentUser', username);

    // Process login with a short delay
    setTimeout(() => {
        if (managers.includes(username)) {
            console.log("Manager login detected");
            if (username === 'ארתור' || username === 'arthur') {
                window.location.href = 'loading.html?user=arthur';
            } else if (username === 'גיל' || username === 'gil') {
                window.location.href = 'loading.html?user=gil';
            }
        } else if (workers.includes(username)) {
            console.log("Worker login detected");
            window.location.href = 'tasks.html';
        } else {
            console.log("Unknown username");
            loadingMessage.style.display = 'none';
            alert('שם משתמש לא מוכר');
        }
    }, 500);
}

// Function to check if user is logged in
function checkLoggedInUser() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        console.log(`User ${currentUser} is already logged in`);
        if (managers.includes(currentUser.toLowerCase())) {
            window.location.href = 'loading.html?user=' + (currentUser.toLowerCase() === 'ארתור' || currentUser.toLowerCase() === 'arthur' ? 'arthur' : 'gil');
        } else if (workers.includes(currentUser.toLowerCase())) {
            window.location.href = 'tasks.html';
        }
    }
}

// Logout function
function logout() {
    console.log("Logout function called");
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Run this when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded, checking for logged-in user");
    checkLoggedInUser();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            login();
        });
    } else {
        console.log("Login form not found on this page");
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});
