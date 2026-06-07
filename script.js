/* ===================================
   YOUTUBE PRO - JAVASCRIPT
   Made in India 🇮🇳
   ==================================== */

// ===================================
// APP STATE
// ===================================

const app = {
    currentScreen: 'homeScreen',
    darkMode: localStorage.getItem('darkMode') === 'true',
    notificationPanelOpen: false,
    profileMenuOpen: false,
};

// Sample video data
const videos = [
    {
        id: 1,
        title: 'Incredible Gaming Stream - 12 Hours Marathon! 🎮',
        channel: 'Gaming Pro',
        views: '2.5M',
        time: '2 days ago',
        likes: '125K',
        thumbnail: 'https://via.placeholder.com/320x180?text=Gaming+Video'
    },
    {
        id: 2,
        title: 'Best Music Playlist - Bollywood Hits 2025 🎵',
        channel: 'Music Lovers',
        views: '5.2M',
        time: '1 week ago',
        likes: '298K',
        thumbnail: 'https://via.placeholder.com/320x180?text=Music+Video'
    },
    {
        id: 3,
        title: 'Web Development Tutorial - Build Portfolio 💻',
        channel: 'Tech Academy',
        views: '856K',
        time: '3 days ago',
        likes: '45K',
        thumbnail: 'https://via.placeholder.com/320x180?text=Web+Dev'
    },
    {
        id: 4,
        title: 'Fitness Motivation - Workout Tips for Beginners 💪',
        channel: 'Fitness Hub',
        views: '1.8M',
        time: '5 days ago',
        likes: '92K',
        thumbnail: 'https://via.placeholder.com/320x180?text=Fitness'
    },
    {
        id: 5,
        title: 'Cooking Indian Recipes - Butter Chicken Recipe 🍗',
        channel: 'Kitchen Tales',
        views: '3.1M',
        time: '1 week ago',
        likes: '156K',
        thumbnail: 'https://via.placeholder.com/320x180?text=Cooking'
    },
    {
        id: 6,
        title: 'Travel Vlog - Exploring Rajasthan 🏜️',
        channel: 'Wanderlust',
        views: '987K',
        time: '2 weeks ago',
        likes: '67K',
        thumbnail: 'https://via.placeholder.com/320x180?text=Travel'
    }
];

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadVideos();
    setupEventListeners();
    applyDarkMode();
});

function initializeApp() {
    console.log('🎉 YouTube Pro initialized - Made in India 🇮🇳');
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Bottom Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });

    // Notification Button
    document.getElementById('notificationBtn').addEventListener('click', toggleNotificationPanel);

    // Profile Button
    document.getElementById('profileBtn').addEventListener('click', toggleProfileMenu);

    // Theme Toggle
    document.getElementById('themeToggle')?.addEventListener('click', toggleDarkMode);

    // FAB Button
    const fab = document.getElementById('fab');
    if (fab) {
        fab.addEventListener('click', () => switchScreen('uploadScreen'));
    }

    // Upload Area
    setupUploadArea();

    // Category Chips
    setupCategoryChips();

    // Close panels when clicking outside
    document.addEventListener('click', (e) => {
        const notificationPanel = document.getElementById('notificationPanel');
        const profileMenu = document.getElementById('profileMenu');
        const notificationBtn = document.getElementById('notificationBtn');
        const profileBtn = document.getElementById('profileBtn');

        if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationPanel.classList.remove('show');
        }

        if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
            profileMenu.classList.remove('show');
        }
    });
}

// ===================================
// NAVIGATION
// ===================================

function handleNavigation(e) {
    const screenId = e.currentTarget.dataset.screen;
    switchScreen(screenId);

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
}

function switchScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        app.currentScreen = screenId;
    }

    // Update FAB visibility
    const fab = document.getElementById('fab');
    if (screenId === 'uploadScreen') {
        fab.classList.remove('show');
    } else {
        fab.classList.add('show');
    }

    // Close panels
    document.getElementById('notificationPanel').classList.remove('show');
    document.getElementById('profileMenu').classList.remove('show');

    // Scroll to top
    document.querySelector('.main-content').scrollTop = 0;
}

// ===================================
// VIDEOS
// ===================================

function loadVideos() {
    const videoFeed = document.getElementById('videoFeed');
    videoFeed.innerHTML = '';

    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoFeed.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'video-card';
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}">
            <span class="video-duration">12:45</span>
        </div>
        <div class="video-info">
            <div class="video-header">
                <img src="https://via.placeholder.com/36" class="channel-avatar" alt="">
                <div class="video-details">
                    <div class="video-title">${video.title}</div>
                    <div class="video-channel">${video.channel}</div>
                    <div class="video-stats">${video.views} views • ${video.time}</div>
                </div>
                <button class="menu-icon">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    `;

    card.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`Playing: ${video.title}`);
        // Add video player logic here
    });

    return card;
}

// ===================================
// CATEGORIES
// ===================================

function setupCategoryChips() {
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.chip').forEach(c => {
                c.classList.remove('active');
            });
            e.target.classList.add('active');
            console.log(`Selected category: ${e.target.textContent}`);
        });
    });
}

// ===================================
// NOTIFICATIONS PANEL
// ===================================

function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');
}

// ===================================
// PROFILE MENU
// ===================================

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('show');
}

// ===================================
// DARK MODE
// ===================================

function toggleDarkMode(e) {
    e.preventDefault();
    app.darkMode = !app.darkMode;
    applyDarkMode();
    localStorage.setItem('darkMode', app.darkMode);
    console.log(`Dark mode ${app.darkMode ? 'enabled' : 'disabled'}`);
}

function applyDarkMode() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    if (app.darkMode) {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    }
}

// ===================================
// UPLOAD FUNCTIONALITY
// ===================================

function setupUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const videoFile = document.getElementById('videoFile');
    const uploadForm = document.getElementById('uploadForm');

    if (!uploadArea) return;

    // Click to upload
    uploadArea.addEventListener('click', () => {
        videoFile.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ff0000';
        uploadArea.style.backgroundColor = app.darkMode ? '#404040' : '#f5f5f5';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.backgroundColor = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            videoFile.files = files;
            handleFileSelect();
        }
    });

    // File selection
    videoFile.addEventListener('change', handleFileSelect);

    // Form submission
    uploadForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUpload();
    });
}

function handleFileSelect() {
    const videoFile = document.getElementById('videoFile');
    if (videoFile.files.length > 0) {
        const fileName = videoFile.files[0].name;
        const fileSize = (videoFile.files[0].size / 1024 / 1024).toFixed(2);
        console.log(`File selected: ${fileName} (${fileSize} MB)`);
        alert(`Selected: ${fileName}`);
    }
}

function handleUpload() {
    const title = document.querySelector('.upload-form input[placeholder="Enter video title"]')?.value;
    console.log(`Uploading video: ${title}`);
    alert(`Video "${title}" uploaded successfully! 🎉`);
    document.getElementById('uploadForm').reset();
}

// ===================================
// LIBRARY FUNCTIONALITY
// ===================================

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(t => {
            t.classList.remove('active');
        });
        e.target.classList.add('active');

        const tab = e.target.dataset.tab;
        loadLibraryContent(tab);
    });
});

function loadLibraryContent(tab) {
    const content = document.getElementById('libraryContent');
    let html = '';

    switch(tab) {
        case 'history':
            html = '<p>Your watch history will appear here</p>';
            break;
        case 'liked':
            html = '<p>Your liked videos will appear here</p>';
            break;
        case 'playlists':
            html = '<p>Your playlists will appear here</p>';
            break;
        case 'downloads':
            html = '<p>Your downloaded videos will appear here</p>';
            break;
        case 'watchlater':
            html = '<p>Videos saved for later will appear here</p>';
            break;
    }

    content.innerHTML = html;
}

// ===================================
// SUBSCRIPTION FILTERS
// ===================================

document.querySelectorAll('.subscription-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.subscription-filters .filter-btn').forEach(b => {
            b.classList.remove('active');
        });
        e.target.classList.add('active');
        console.log(`Filter: ${e.target.textContent}`);
    });
});

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

document.querySelector('.search-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const query = document.querySelector('.search-input')?.value;
    console.log(`Searching for: ${query}`);
    alert(`Searching for: "${query}"`);
});

document.querySelector('.voice-search-btn')?.addEventListener('click', () => {
    console.log('Voice search activated');
    alert('🎤 Voice search feature coming soon!');
});

// ===================================
// SHORTS FUNCTIONALITY
// ===================================

const shortsData = [
    { id: 1, audio: '🎵 Bollywood Hits', likes: '12K', comments: '842', shares: '342' },
    { id: 2, audio: '🎵 Trending Music', likes: '8.5K', comments: '567', shares: '234' },
    { id: 3, audio: '🎵 Original Audio', likes: '15K', comments: '1.2K', shares: '456' }
];

let currentShortIndex = 0;

document.querySelectorAll('.short-action-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const actions = ['Like', 'Comment', 'Share', 'Download'];
        console.log(`${actions[index]} short video`);
        if (index === 2) {
            alert('Share feature');
        } else if (index === 3) {
            alert('Download feature');
        }
    });
});

// ===================================
// MENU ITEMS
// ===================================

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (!item.classList.contains('logout') && !item.id) {
            e.preventDefault();
            const text = item.textContent.trim();
            console.log(`Clicked: ${text}`);
        }
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    });
});

// ===================================
// RESPONSIVE MENU
// ===================================

document.getElementById('menuBtn')?.addEventListener('click', () => {
    console.log('Menu opened');
    alert('Sidebar menu coming soon!');
});

// ===================================
// INFINITE SCROLL (Simulated)
// ===================================

const mainContent = document.querySelector('.main-content');
if (mainContent) {
    mainContent.addEventListener('scroll', () => {
        if (mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 200) {
            // Load more videos
            console.log('Loading more videos...');
        }
    });
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🎬 YouTube Pro - Made in India 🇮🇳', 'color: red; font-size: 24px; font-weight: bold;');
console.log('%cCreated by: Ashish Singh', 'color: blue; font-size: 14px;');
console.log('%cFast & Premium Video Experience', 'color: green; font-size: 12px;');

// ===================================
// UTILITY FUNCTIONS
// ===================================

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
}

// ===================================
// API SIMULATION
// ===================================

async function simulateApiCall(endpoint, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: data,
                message: 'Success'
            });
        }, 500);
    });
}

// ===================================
// ERROR HANDLING
// ===================================

window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
});

// ===================================
// PERFORMANCE MONITORING
// ===================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}
