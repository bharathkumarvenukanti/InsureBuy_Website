// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Helper function to get elements by ID
    const getEl = (id) => document.getElementById(id);

    // Get dashboard elements
    const dashboardUserName = getEl('dashboardUserName');
    const loggedInUserNameSpan = getEl('loggedInUserName');
    const logoutButton = getEl('logoutButton');

    // Helper function to get the base URL
    function getBaseUrl() {
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        return window.location.origin + path.substring(0, lastSlashIndex + 1);
    }
    
    // Check if user is logged in
    const username = localStorage.getItem('registeredUsername');
    if (!username) {
        // Redirect to login page if not authenticated
        window.location.href = getBaseUrl() + 'login.html';
    } else {
        // Update the user's name on the dashboard
        if (dashboardUserName) {
            dashboardUserName.textContent = username;
        }
        if (loggedInUserNameSpan) {
            loggedInUserNameSpan.textContent = username;
        }
    }

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear all user data from localStorage
            localStorage.removeItem('registeredUsername');
            localStorage.removeItem('registeredEmail');
            localStorage.removeItem('registeredPassword');
            
            // Redirect to home page
            window.location.href = getBaseUrl() + '../index.html';
        });
    }
});
