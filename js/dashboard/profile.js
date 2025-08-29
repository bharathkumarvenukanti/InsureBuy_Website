// profile.js

document.addEventListener('DOMContentLoaded', function() {
    const getEl = (id) => document.getElementById(id);

    const logoutButton = getEl('logoutButton');
    const loggedInUserNameSpan = getEl('loggedInUserName');
    const profileName = getEl('profileName');
    const profileEmail = getEl('profileEmail');

    // Helper function to get the base URL
    function getBaseUrl() {
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        return window.location.origin + path.substring(0, lastSlashIndex + 1);
    }

    // Check if user is logged in and update UI
    const username = localStorage.getItem('registeredUsername');
    const email = localStorage.getItem('registeredEmail');

    if (!username) {
        window.location.href = getBaseUrl() + '../../html/login.html';
    } else {
        if (loggedInUserNameSpan) {
            loggedInUserNameSpan.textContent = username;
        }
        if (profileName) {
            profileName.textContent = username;
        }
        if (profileEmail) {
            profileEmail.textContent = email;
        }
    }

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = getBaseUrl() + '../../../index.html';
        });
    }
});
