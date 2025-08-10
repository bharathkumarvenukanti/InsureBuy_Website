// index.js

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Initialize Firebase (copied from your original script)
let app, db, auth;
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
if (Object.keys(firebaseConfig).length > 0) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            try {
                const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Firebase authentication error:", error);
            }
        }
    });
} else {
    console.warn("Firebase config not found. Firebase services will not be initialized.");
}

// Gemini API Configuration
const API_KEY = "";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

document.addEventListener('DOMContentLoaded', function() {
    const getEl = (id) => document.getElementById(id);
    const getEls = (selector) => document.querySelectorAll(selector);

    // AI Assistant Elements
    const recommendationInput = getEl('recommendationInput');
    const getRecommendationBtn = getEl('getRecommendationBtn');
    const recommendationOutput = getEl('recommendationOutput');
    const termInput = getEl('termInput');
    const explainTermBtn = getEl('explainTermBtn');
    const explanationOutput = getEl('explanationOutput');
    const scenarioInput = getEl('scenarioInput');
    const getScenarioAnalysisBtn = getEl('getScenarioAnalysisBtn');
    const scenarioOutput = getEl('scenarioOutput');
    
    // Header navigation links
    const navLinks = getEls('.nav-link');

    // Helper to call Gemini API
    async function callGeminiAPI(promptText) {
        const payload = { contents: [{ role: "user", parts: [{ text: promptText }] }] };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            return result?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please try again.";
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return "An error occurred while connecting to the AI. Please try again later.";
        }
    }

    // AI Assistant Event Listeners
    if (getRecommendationBtn) {
        getRecommendationBtn.addEventListener('click', async () => {
            const outputEl = recommendationOutput;
            if (!recommendationInput.value.trim()) {
                outputEl.innerHTML = '<p class="text-red-800">Please describe your insurance needs.</p>';
                outputEl.classList.remove('hidden');
                return;
            }
            outputEl.innerHTML = '<p class="text-gray-600 italic">Thinking...</p>';
            outputEl.classList.remove('hidden');
            const prompt = `Based on the following needs, suggest suitable insurance plan types and explain why each is relevant: "${recommendationInput.value}".`;
            const responseText = await callGeminiAPI(prompt);
            outputEl.innerHTML = `<p>${responseText}</p>`;
            outputEl.className = 'mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-left text-gray-800';
        });
    }

    if (explainTermBtn) {
        explainTermBtn.addEventListener('click', async () => {
            const outputEl = explanationOutput;
            if (!termInput.value.trim()) {
                outputEl.innerHTML = '<p class="text-red-800">Please enter an insurance term to explain.</p>';
                outputEl.classList.remove('hidden');
                return;
            }
            outputEl.innerHTML = '<p class="text-gray-600 italic">Thinking...</p>';
            outputEl.classList.remove('hidden');
            const prompt = `Explain the insurance term "${termInput.value}" in simple, easy-to-understand language. Provide an example.`;
            const responseText = await callGeminiAPI(prompt);
            outputEl.innerHTML = `<p>${responseText}</p>`;
            outputEl.className = 'mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-left text-gray-800';
        });
    }

    if (getScenarioAnalysisBtn) {
        getScenarioAnalysisBtn.addEventListener('click', async () => {
            const outputEl = scenarioOutput;
            if (!scenarioInput.value.trim()) {
                outputEl.innerHTML = '<p class="text-red-800">Please describe a "what if" scenario.</p>';
                outputEl.classList.remove('hidden');
                return;
            }
            outputEl.innerHTML = '<p class="text-gray-600 italic">Thinking...</p>';
            outputEl.classList.remove('hidden');
            const prompt = `Analyze this insurance scenario: "${scenarioInput.value}". Describe the potential financial consequences without insurance and suggest mitigating insurance types.`;
            const responseText = await callGeminiAPI(prompt);
            outputEl.innerHTML = `<p>${responseText}</p>`;
            outputEl.className = 'mt-6 p-4 bg-purple-100 border border-purple-300 rounded-lg text-left text-gray-800';
        });
    }

    // Smooth scrolling for internal links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
