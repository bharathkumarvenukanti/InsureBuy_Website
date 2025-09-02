// mypolicies.js

document.addEventListener('DOMContentLoaded', function() {
    const getEl = (id) => document.getElementById(id);
    const getEls = (selector) => document.querySelectorAll(selector);

    const logoutButton = getEl('logoutButton');
    const loggedInUserNameSpan = getEl('loggedInUserName');

    // Helper function to get the base URL
    function getBaseUrl() {
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        return window.location.origin + path.substring(0, lastSlashIndex + 1);
    }

    // Check if user is logged in and update UI
    const username = localStorage.getItem('registeredUsername');
    if (!username) {
        // Redirect to login page if not authenticated
        window.location.href = getBaseUrl() + '../../html/login.html';
    } else {
        if (loggedInUserNameSpan) {
            loggedInUserNameSpan.textContent = username;
        }
    }

    // Handle "Make a Payment" and "View Details" buttons
    getEls('.btn-primary, .text-blue-600').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.textContent.includes('Payment')) {
                alert('Redirecting to the payment page. (Functionality is a placeholder)');
            } else {
                alert('Redirecting to the policy details page. (Functionality is a placeholder)');
            }
        });
    });

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.clear();
            // Redirect to home page
            window.location.href = getBaseUrl() + '../../../index.html';
        });
    }
});
