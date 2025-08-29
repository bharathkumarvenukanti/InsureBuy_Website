// fileaclaim.js

document.addEventListener('DOMContentLoaded', function() {
    const getEl = (id) => document.getElementById(id);

    const logoutButton = getEl('logoutButton');
    const loggedInUserNameSpan = getEl('loggedInUserName');
    const claimForm = getEl('claimForm');

    // Helper function to get the base URL
    function getBaseUrl() {
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        return window.location.origin + path.substring(0, lastSlashIndex + 1);
    }

    // Check if user is logged in and update UI
    const username = localStorage.getItem('registeredUsername');
    if (!username) {
        window.location.href = getBaseUrl() + '../../html/login.html';
    } else {
        if (loggedInUserNameSpan) {
            loggedInUserNameSpan.textContent = username;
        }
    }

    // Handle form submission
    if (claimForm) {
        claimForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Claim submitted successfully! (Functionality is a placeholder)');
            claimForm.reset();
        });
    }

    // Handle "Save & Exit" button
    const saveAndExitBtn = getEl('saveAndExitBtn');
    if (saveAndExitBtn) {
        saveAndExitBtn.addEventListener('click', () => {
            alert('Form data saved to local storage. Exiting to dashboard. (Functionality is a placeholder)');
            window.location.href = '../dashboard.html';
        });
    }

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = getBaseUrl() + '../../../index.html';
        });
    }
});
