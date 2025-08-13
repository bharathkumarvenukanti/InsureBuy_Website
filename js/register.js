// register.js

// Helper to get elements and avoid errors if they don't exist on the page
const getEl = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = getEl('registerBtn');
    const regUsername = getEl('regUsername');
    const regEmail = getEl('regEmail');
    const regPassword = getEl('regPassword');
    const authMessage = getEl('authMessage');

    // Handle registration button click
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission
            const username = regUsername.value.trim();
            const email = regEmail.value.trim();
            const password = regPassword.value.trim();
            
            // Basic form validation (for demonstration)
            if (username && email && password) {
                // Dummy registration logic
                localStorage.setItem('authToken', 'dummy_token');
                localStorage.setItem('username', username);
                
                // Set the success message in localStorage before redirecting
                localStorage.setItem('registrationSuccessMessage', 'Successfully created your account. Please log in now.');

                // Redirect to the login page
                window.location.href = 'login.html';
            } else {
                authMessage.textContent = 'Please fill out all required fields.';
                authMessage.classList.remove('hidden');
                authMessage.className = 'mt-6 p-3 rounded-lg text-sm bg-red-100 text-red-800 border border-red-300';
            }
        });
    }
});
