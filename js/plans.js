// plans.js

document.addEventListener('DOMContentLoaded', function() {
    const getEl = (id) => document.getElementById(id);
    const getEls = (selector) => document.querySelectorAll(selector);

    // Handle internal navigation for "Learn More" links
    getEls('.learn-more-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('index.html#')) {
                e.preventDefault();
                window.location.href = href;
            }
        });
    });

    // Handle "Back to Main Website" button
    const backToMainWebsiteBtn = getEl('backToMainWebsiteBtnPlans');
    if (backToMainWebsiteBtn) {
        backToMainWebsiteBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
