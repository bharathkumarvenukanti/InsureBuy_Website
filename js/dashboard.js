// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    const getEl = (id) => document.getElementById(id);

    const dashboardUserName = getEl('dashboardUserName');
    const loggedInUserNameSpan = getEl('loggedInUserName');
    const logoutButton = getEl('logoutButton');

    // Quick Actions
    const getQuoteBtn = getEl('getQuoteBtn');
    const fileClaimBtn = getEl('fileClaimBtn');
    const makePaymentBtn = getEl('makePaymentBtn');
    
    // Policy section links
    const policiesTitleLink = getEl('policiesTitleLink');
    const policyDetailLinks = document.querySelectorAll('.policy-detail-link');

    // Helper to get the base URL
    function getBaseUrl() {
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        return window.location.origin + path.substring(0, lastSlashIndex + 1);
    }
    
    // Check if user is logged in
    const username = localStorage.getItem('username');
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

    // Event listeners for quick action buttons
    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', () => {
            alert('Redirecting to the Get a New Quote page. (Functionality is a placeholder)');
        });
    }

    if (fileClaimBtn) {
        fileClaimBtn.addEventListener('click', () => {
            alert('Redirecting to the File a Claim page. (Functionality is a placeholder)');
        });
    }

    if (makePaymentBtn) {
        makePaymentBtn.addEventListener('click', () => {
            alert('Redirecting to the Make a Payment page. (Functionality is a placeholder)');
        });
    }

    // Event listener for My Policies link
    if (policiesTitleLink) {
        policiesTitleLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Redirecting to a dedicated My Policies page. (Functionality is a placeholder)');
        });
    }
    
    // Event listeners for individual policy detail links
    policyDetailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Redirecting to policy details. (Functionality is a placeholder)');
        });
    });


    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            // Redirect to home page
            window.location.href = getBaseUrl() + '../index.html';
        });
    }
});
