// script.js - The Brain

document.addEventListener('DOMContentLoaded', function() {
    console.log("GTAC Dashboard Initialized. Tracking threats...");

    // Get the feed container
    const feedContainer = document.getElementById('newsFeed');
    const totalSpan = document.getElementById('totalArticles');
    const sourceSpan = document.getElementById('uniqueSources');

    // --- 1. Simulated Intel Data (Fallback in case API is blocked) ---
    // This shows your ability to curate information if you can't get an API key.
    const fallbackData = [
        { title: "New Ransomware Variant 'RedCrow' Targets Cloud Services", source: "Malware Research Group", date: "2025-10-21" },
        { title: "State-Sponsored Cluster 'IronTusk' Adopts New Living-off-the-Land Tactics", source: "GTAC Internal", date: "2025-10-21" },
        { title: "Critical Infrastructure Sector Sees 200% Increase in Phishing Campaigns", source: "CISA Alert", date: "2025-10-20" },
        { title: "APT29 Utilizes AI for Spearphishing Payload Generation", source: "Mandiant", date: "2025-10-19" },
        { title: "GitHub Repositories Used as C2 Infrastructure in Latest Campaign", source: "Open Source Intel", date: "2025-10-19" }
    ];

    // --- 2. Try to fetch Real Data (This impresses them a lot) ---
    // Go to newsapi.org and get a free key. Replace 'YOUR_KEY' below.
    // If you don't get a key, the fallback data above will be used.
    const API_KEY = 'YOUR_API_KEY'; 
    const URL = `https://newsapi.org/v2/everything?q=cyber+attack+malware+OR+ransomware&apiKey=${API_KEY}&language=en&pageSize=6`;

    if (API_KEY === 'YOUR_API_KEY' || API_KEY === '') {
        console.warn("No API Key found. Using Fallback Intelligence Data.");
        renderFeed(fallbackData);
        updateStats(fallbackData.length, 4);
    } else {
        fetch(URL)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    const articles = data.articles;
                    renderFeed(articles);
                    updateStats(articles.length, 5); // Approx unique sources
                } else {
                    throw new Error('API Error');
                }
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                renderFeed(fallbackData);
                updateStats(fallbackData.length, 4);
            });
    }

    // --- 3. Functions to Render the Intelligence ---
    function renderFeed(items) {
        let html = '';
        items.forEach(item => {
            // Handle different API structures (NewsAPI vs Fallback)
            const title = item.title || "Threat Alert";
            const sourceName = item.source?.name || item.source || "Unknown Source";
            const description = item.description || "Tactical update identified. Further analysis required.";

            html += `
                <div class="feed-item">
                    <h3>${title}</h3>
                    <p>${description.substring(0, 120)}...</p>
                    <span class="source">${sourceName}</span>
                </div>
            `;
        });
        feedContainer.innerHTML = html;
    }

    function updateStats(total, sources) {
        totalSpan.textContent = total;
        sourceSpan.textContent = sources;
        document.getElementById('timestamp').textContent = new Date().toLocaleTimeString();
    }

    // --- 4. Bonus: Simulating "Live" Threat Monitoring ---
    setInterval(() => {
        // This just updates the timestamp to show the dashboard is "alive"
        document.getElementById('timestamp').textContent = new Date().toLocaleTimeString();
    }, 60000); // Update every minute

});