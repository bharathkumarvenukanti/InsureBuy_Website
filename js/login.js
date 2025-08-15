// login.js

// Helper to get elements and avoid errors if they don't exist on the page
const getEl = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = getEl('loginBtn');
    const loginUsernameEmail = getEl('loginUsernameEmail');
    const loginPassword = getEl('loginPassword');
    const authMessage = getEl('authMessage');
    const successMessageDiv = getEl('successMessage');
    const forgotPasswordLink = getEl('forgotPasswordLink');

    // Check for registration success message in localStorage
    const registrationSuccess = localStorage.getItem('registrationSuccessMessage');
    if (registrationSuccess) {
        if (successMessageDiv) {
            successMessageDiv.textContent = registrationSuccess;
            successMessageDiv.classList.remove('hidden');
            successMessageDiv.className = 'mt-6 p-3 rounded-lg text-sm bg-green-100 text-green-800 border border-green-300';
            // Clear the message so it doesn't show again
            localStorage.removeItem('registrationSuccessMessage');
        }
    }

    // Handle login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission
            const usernameEmail = loginUsernameEmail.value.trim();
            const password = loginPassword.value.trim();
            
            // Correctly retrieve and validate against stored credentials
            const storedUsername = localStorage.getItem('registeredUsername');
            const storedEmail = localStorage.getItem('registeredEmail');
            const storedPassword = localStorage.getItem('registeredPassword');

            if (
                (usernameEmail === storedUsername || usernameEmail === storedEmail) &&
                password === storedPassword
            ) {
                // Set the current user session
                localStorage.setItem('authToken', 'dummy_token');
                localStorage.setItem('username', storedUsername);
                window.location.href = 'dashboard.html';
            } else {
                if (authMessage) {
                    authMessage.textContent = 'Invalid username/email or password.';
                    authMessage.classList.remove('hidden');
                    authMessage.className = 'mt-6 p-3 rounded-lg text-sm bg-red-100 text-red-800 border border-red-300';
                }
            }
        });
    }

    // Handle "Forgot Password" link click
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (authMessage) {
                authMessage.textContent = 'A password reset link has been sent to your email. (This is a dummy message)';
                authMessage.classList.remove('hidden');
                authMessage.className = 'mt-6 p-3 rounded-lg text-sm bg-green-100 text-green-800 border border-green-300';
            }
        });
    }
});
