/* ===================================
   YOUTUBE PRO ADVANCED - JAVASCRIPT
   Made in India 🇮🇳
   ==================================== */

// Mock Data
const mockVideos = [
    {
        id: 1,
        title: "Learn Web Development in 2024 - Complete Guide",
        channel: "TechYoutuber",
        avatar: "https://via.placeholder.com/40",
        thumbnail: "https://via.placeholder.com/320x180/FF6B6B/ffffff?text=Web+Dev",
        views: "245K",
        time: "2 days ago",
        duration: "45:23",
        likes: 5200
    },
    {
        id: 2,
        title: "Top 10 Gaming Moments 2024",
        channel: "GamingPro",
        avatar: "https://via.placeholder.com/40",
        thumbnail: "https://via.placeholder.com/320x180/4ECDC4/ffffff?text=Gaming",
        views: "1.2M",
        time: "1 week ago",
        duration: "28:45",
        likes: 85000
    },
    {
        id: 3,
        title: "Relaxing Music Mix - Study & Work",
        channel: "MusicChannel",
        avatar: "https://via.placeholder.com/40",
        thumbnail: "https://via.placeholder.com/320x180/FFD93D/ffffff?text=Music",
        views: "500K",
        time: "3 days ago",
        duration: "120:00",
        likes: 12000
    },
    {
        id: 4,
        title: "Breaking News: Tech Industry Updates",
        channel: "NewsChannel",
        avatar: "https://via.placeholder.com/40",
        thumbnail: "https://via.placeholder.com/320x180/6C5CE7/ffffff?text=News",
        views: "890K",
        time: "5 hours ago",
        duration: "15:30",
        likes: 3400
    },
    {
        id: 5,
        title: "React JS Tutorial for Beginners",
        channel: "CodeMasters",
        avatar: "https://via.placeholder.com/40",
        thumbnail: "https://via.placeholder.com/320x180/00B894/ffffff?text=React",
        views: "450K",
        time: "1 month ago",
        duration: "2:30:45",
        likes: 18000
    },
    {
        id: 6,
        title: "AI & Machine Learning Explained",
        channel: "TechYoutuber",
        avatar: "https://via.placeholder.com/40",
        thumbnail: "https://via.placeholder.com/320x180/A29BFE/ffffff?text=AI+ML",
        views: "670K",
        time: "2 weeks ago",
        duration: "55:12",
        likes: 24000
    }
];

const mockChannels = [
    { name: "TechYoutuber", videos: 156, avatar: "https://via.placeholder.com/40", status: "Live 🔴" },
    { name: "GamingPro", videos: 432, avatar: "https://via.placeholder.com/40", status: "Uploading..." },
    { name: "MusicChannel", videos: 89, avatar: "https://via.placeholder.com/40", status: "Offline" },
    { name: "NewsChannel", videos: 2543, avatar: "https://via.placeholder.com/40", status: "Live 🔴" }
];

// App State
const app = {
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    currentScreen: 'homeScreen',
    likedVideos: JSON.parse(localStorage.getItem('likedVideos')) || [],
    history: JSON.parse(localStorage.getItem('watchHistory')) || [],
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadContent();
});

function initializeApp() {
    if (app.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Bottom Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const screen = e.currentTarget.dataset.screen;
            switchScreen(screen);
        });
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

    // Notification Bell
    document.getElementById('notificationBtn').addEventListener('click', toggleNotifications);

    // Profile Button
    document.getElementById('profileBtn').addEventListener('click', toggleProfileMenu);

    // FAB Button
    document.getElementById('fab').addEventListener('click', () => {
        switchScreen('uploadScreen');
    });

    // Category Chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            loadContent();
        });
    });

    // Library Tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            loadLibraryContent(e.target.dataset.tab);
        });
    });

    // Upload Form
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }

    // Character Counters
    document.querySelectorAll('.form-group input[type="text"], .form-group textarea').forEach(input => {
        input.addEventListener('input', (e) => {
            const maxLength = e.target.maxLength;
            const currentLength = e.target.value.length;
            const counter = e.target.parentElement.querySelector('.char-count');
            if (counter) {
                counter.textContent = `${currentLength}/${maxLength}`;
            }
        });
    });

    // Upload Area
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('click', () => document.getElementById('videoFile').click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#ff0000';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            showToast('File selected: ' + e.dataTransfer.files[0].name);
        });
    }

    // Close panels when clicking outside
    document.addEventListener('click', (e) => {
        const notificationPanel = document.getElementById('notificationPanel');
        const profileMenu = document.getElementById('profileMenu');
        const notificationBtn = document.getElementById('notificationBtn');
        const profileBtn = document.getElementById('profileBtn');

        if (!notificationBtn.contains(e.target) && !notificationPanel.contains(e.target)) {
            notificationPanel.classList.remove('show');
        }

        if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove('show');
        }
    });
}

// Screen Navigation
function switchScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show selected screen
    document.getElementById(screenName).classList.add('active');

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.screen === screenName) {
            item.classList.add('active');
        }
    });

    // Show/hide FAB
    const fab = document.getElementById('fab');
    if (screenName === 'uploadScreen') {
        fab.classList.remove('show');
    } else {
        fab.classList.add('show');
    }

    app.currentScreen = screenName;
}

// Dark Mode Toggle
function toggleDarkMode() {
    app.isDarkMode = !app.isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', app.isDarkMode);

    const themeBtn = document.getElementById('themeToggle');
    if (app.isDarkMode) {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle Notifications Panel
function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');
}

// Toggle Profile Menu
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('show');
}

// Load Content
function loadContent() {
    const videoFeed = document.getElementById('videoFeed');
    videoFeed.innerHTML = '';

    mockVideos.forEach((video, index) => {
        const card = createVideoCard(video);
        card.style.animationDelay = `${index * 0.1}s`;
        videoFeed.appendChild(card);
    });

    // Infinite scroll simulation
    if (videoFeed.children.length > 0) {
        const lastCard = videoFeed.lastChild;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load more videos
                    mockVideos.forEach(video => {
                        const card = createVideoCard(video);
                        videoFeed.appendChild(card);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(lastCard);
    }
}

// Create Video Card
function createVideoCard(video) {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'video-card';
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}">
            <span class="video-duration">${video.duration}</span>
        </div>
        <div class="video-info">
            <div class="video-header">
                <img src="${video.avatar}" alt="${video.channel}" class="channel-avatar">
                <div class="video-details">
                    <p class="video-title">${video.title}</p>
                    <p class="video-channel">${video.channel}</p>
                    <p class="video-stats">${video.views} views • ${video.time}</p>
                </div>
                <button class="menu-icon" onclick="event.preventDefault(); showVideoMenu(event)">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    `;

    card.addEventListener('click', (e) => {
        e.preventDefault();
        addToHistory(video);
        showToast(`Now playing: ${video.title}`);
    });

    return card;
}

// Load Subscriptions
function loadSubscriptions() {
    const subscriptionFeed = document.getElementById('subscriptionFeed');
    subscriptionFeed.innerHTML = '';

    mockChannels.forEach(channel => {
        const card = document.createElement('div');
        card.className = 'subscription-card';
        card.innerHTML = `
            <img src="${channel.avatar}" alt="${channel.name}">
            <div class="subscription-info">
                <div class="subscription-name">${channel.name}</div>
                <div class="subscription-videos">${channel.videos} videos</div>
                <div class="subscription-videos">${channel.status}</div>
            </div>
            <button class="btn btn-sm btn-primary">View Channel</button>
        `;
        subscriptionFeed.appendChild(card);
    });
}

// Load Library Content
function loadLibraryContent(tab) {
    const libraryContent = document.getElementById('libraryContent');
    libraryContent.innerHTML = '';

    let items = [];

    switch(tab) {
        case 'history':
            items = app.history.slice().reverse();
            if (items.length === 0) {
                libraryContent.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No watch history</p>';
            }
            break;
        case 'liked':
            items = app.likedVideos;
            if (items.length === 0) {
                libraryContent.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No liked videos</p>';
            }
            break;
        case 'playlists':
            libraryContent.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No playlists created</p>';
            return;
        case 'downloads':
            libraryContent.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No downloads</p>';
            return;
        case 'watchlater':
            libraryContent.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No videos saved for later</p>';
            return;
    }

    items.forEach(video => {
        const card = createVideoCard(video);
        libraryContent.appendChild(card);
    });
}

// Add to Watch History
function addToHistory(video) {
    if (!app.history.find(v => v.id === video.id)) {
        app.history.push(video);
        localStorage.setItem('watchHistory', JSON.stringify(app.history));
    }
}

// Handle Upload
function handleUpload(e) {
    e.preventDefault();
    
    const title = e.target.querySelector('input[placeholder*="title"]').value;
    const category = e.target.querySelector('select').value;
    const visibility = e.target.querySelectorAll('select')[1].value;

    if (!title) {
        showToast('Please enter a title');
        return;
    }

    // Show progress
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = uploadProgress.querySelector('.progress-fill');
    uploadProgress.style.display = 'block';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        progressFill.style.width = progress + '%';
        document.getElementById('progressText').textContent = `Uploading... ${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                uploadProgress.style.display = 'none';
                showToast('✅ Video uploaded successfully!');
                e.target.reset();
                switchScreen('homeScreen');
            }, 500);
        }
    }, 300);
}

// Show Video Menu
function showVideoMenu(e) {
    showToast('More options for this video');
}

// Show Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Speed Control for Shorts
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('speed-btn')) {
        document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const video = document.querySelector('.short-video video');
        if (video) {
            video.playbackRate = parseFloat(e.target.dataset.speed);
        }
    }
});

// Load initial content
function loadInitialContent() {
    loadContent();
    loadSubscriptions();
    loadLibraryContent('history');
}

// Call on page load
loadInitialContent();

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Space to toggle play/pause (if video is focused)
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const video = document.querySelector('.short-video video');
        if (video) {
            video.paused ? video.play() : video.pause();
        }
    }

    // M for mute
    if (e.code === 'KeyM') {
        const video = document.querySelector('.short-video video');
        if (video) {
            video.muted = !video.muted;
        }
    }

    // F for fullscreen
    if (e.code === 'KeyF') {
        const video = document.querySelector('.short-video video');
        if (video && video.requestFullscreen) {
            video.requestFullscreen();
        }
    }
});

// Service Worker for offline support (if needed)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        console.log('Service Worker registration failed or not available');
    });
}

console.log('🎬 YouTube Pro Started! Made in India 🇮🇳');
console.log('Created by: Ashish Singh ⭐');
