/* ===================================
   DIGITAL CLOCK - JAVASCRIPT
   Multi-Timezone Clock Application
   ==================================== */

// ===================================
// TIMEZONE DATA
// ===================================

const timezones = [
    { name: 'London', timezone: 'Europe/London', emoji: '🇬🇧', offset: 0 },
    { name: 'New York', timezone: 'America/New_York', emoji: '🇺🇸', offset: -5 },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', emoji: '🇯🇵', offset: 9 },
    { name: 'Sydney', timezone: 'Australia/Sydney', emoji: '🇦🇺', offset: 10 },
    { name: 'Dubai', timezone: 'Asia/Dubai', emoji: '🇦🇪', offset: 4 },
    { name: 'Singapore', timezone: 'Asia/Singapore', emoji: '🇸🇬', offset: 8 },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', emoji: '🇭🇰', offset: 8 },
    { name: 'Bangkok', timezone: 'Asia/Bangkok', emoji: '🇹🇭', offset: 7 },
    { name: 'Mumbai', timezone: 'Asia/Kolkata', emoji: '🇮🇳', offset: 5.5 },
    { name: 'Delhi', timezone: 'Asia/Kolkata', emoji: '🇮🇳', offset: 5.5 },
    { name: 'Moscow', timezone: 'Europe/Moscow', emoji: '🇷🇺', offset: 3 },
    { name: 'Berlin', timezone: 'Europe/Berlin', emoji: '🇩🇪', offset: 1 },
    { name: 'Paris', timezone: 'Europe/Paris', emoji: '🇫🇷', offset: 1 },
    { name: 'Toronto', timezone: 'America/Toronto', emoji: '🇨🇦', offset: -5 },
    { name: 'Mexico City', timezone: 'America/Mexico_City', emoji: '🇲🇽', offset: -6 },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles', emoji: '🇺🇸', offset: -8 },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo', emoji: '🇧🇷', offset: -3 },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', emoji: '🇦🇷', offset: -3 },
    { name: 'Istanbul', timezone: 'Europe/Istanbul', emoji: '🇹🇷', offset: 3 },
    { name: 'Cairo', timezone: 'Africa/Cairo', emoji: '🇪🇬', offset: 2 },
];

// ===================================
// APP STATE
// ===================================

const app = {
    favorites: JSON.parse(localStorage.getItem('favoriteCities')) || ['Mumbai', 'New York', 'Tokyo'],
    customTimezones: JSON.parse(localStorage.getItem('customTimezones')) || [],
    currentView: 'grid',
    currentTab: 'all',
    filteredTimezones: [],
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    init();
    updateClocks();
    setInterval(updateClocks, 1000);
});

function init() {
    console.log('🕐 Digital Clock Application Started');
    setupEventListeners();
    renderClocks();
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Search input
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', handleViewChange);
    });

    // Tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
        btn.addEventListener('click', handleTabChange);
    });
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const allTimezones = [...timezones, ...app.customTimezones];
    
    if (query.trim() === '') {
        app.filteredTimezones = allTimezones;
    } else {
        app.filteredTimezones = allTimezones.filter(tz => 
            tz.name.toLowerCase().includes(query) || 
            tz.timezone.toLowerCase().includes(query)
        );
    }

    renderClocks();
}

// ===================================
// VIEW CHANGE
// ===================================

function handleViewChange(e) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.closest('.view-btn').classList.add('active');

    app.currentView = e.target.closest('.view-btn').dataset.view;
    renderClocks();
}

// ===================================
// TAB CHANGE
// ===================================

function handleTabChange(e) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    e.target.classList.add('active');

    app.currentTab = e.target.dataset.tab;

    // Hide/Show forms
    const customForm = document.getElementById('customForm');
    if (app.currentTab === 'custom') {
        customForm.style.display = 'block';
    } else {
        customForm.style.display = 'none';
    }

    renderClocks();
}

// ===================================
// RENDER CLOCKS
// ===================================

function renderClocks() {
    const grid = document.getElementById('clocksGrid');
    const emptyState = document.getElementById('emptyState');
    const favoritesEmpty = document.getElementById('favoritesEmpty');
    
    grid.innerHTML = '';
    emptyState.style.display = 'none';
    favoritesEmpty.style.display = 'none';

    let clocksToShow = [];

    // Determine which clocks to display based on current tab
    if (app.currentTab === 'favorites') {
        const allTimezones = [...timezones, ...app.customTimezones];
        clocksToShow = allTimezones.filter(tz => app.favorites.includes(tz.name));
        
        if (clocksToShow.length === 0) {
            favoritesEmpty.style.display = 'block';
            return;
        }
    } else if (app.currentTab === 'custom') {
        clocksToShow = app.customTimezones;
    } else {
        // All timezones (filtered by search if any)
        if (app.filteredTimezones.length > 0) {
            clocksToShow = app.filteredTimezones;
        } else {
            clocksToShow = [...timezones, ...app.customTimezones];
        }
    }

    // Show empty state if no results
    if (clocksToShow.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    // Create clock cards
    clocksToShow.forEach((tz, index) => {
        const card = createClockCard(tz);
        card.style.animationDelay = `${index * 0.05}s`;
        grid.appendChild(card);
    });
}

// ===================================
// CREATE CLOCK CARD
// ===================================

function createClockCard(tz) {
    const card = document.createElement('div');
    card.className = `clock-card ${app.currentView === 'list' ? 'list-view' : ''}`;
    card.dataset.timezone = tz.name;

    const isFavorite = app.favorites.includes(tz.name);

    card.innerHTML = `
        <div class="clock-header">
            <div class="clock-title">
                <span class="timezone-emoji">${tz.emoji}</span>
                <h3>${tz.name}</h3>
            </div>
            <div class="clock-actions">
                <button class="clock-btn favorite-btn ${isFavorite ? 'favorited' : ''}" title="Add to favorites">
                    <i class="fas fa-star"></i>
                </button>
                ${tz.isCustom ? `<button class="clock-btn delete-btn" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>` : ''}
            </div>
        </div>

        <div class="clock-display">
            <div class="clock-time" data-timezone="${tz.timezone}">00:00:00</div>
            <div class="clock-period" data-period="${tz.timezone}">AM</div>
        </div>

        <div class="clock-info">
            <div class="info-item">
                <div class="info-label">Date</div>
                <div class="info-value" data-date="${tz.timezone}">--/--/----</div>
            </div>
            <div class="info-item">
                <div class="info-label">UTC Offset</div>
                <div class="info-value utc-offset">${formatOffset(tz.offset)}</div>
            </div>
        </div>
    `;

    // Event listeners
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => toggleFavorite(tz.name, favoriteBtn));

    const deleteBtn = card.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => deleteCustomTimezone(tz.name));
    }

    return card;
}

// ===================================
// UPDATE CLOCKS
// ===================================

function updateClocks() {
    document.querySelectorAll('.clock-time').forEach(timeElement => {
        const timezone = timeElement.dataset.timezone;
        const time = getTimeInTimezone(timezone);
        
        timeElement.textContent = time.time;
        
        const periodElement = document.querySelector(`[data-period="${timezone}"]`);
        if (periodElement) {
            periodElement.textContent = time.period;
        }

        const dateElement = document.querySelector(`[data-date="${timezone}"]`);
        if (dateElement) {
            dateElement.textContent = time.date;
        }
    });
}

// ===================================
// GET TIME IN TIMEZONE
// ===================================

function getTimeInTimezone(timezone) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const parts = formatter.formatToParts(now);
        const hour = parts.find(p => p.type === 'hour').value;
        const minute = parts.find(p => p.type === 'minute').value;
        const second = parts.find(p => p.type === 'second').value;

        const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
        const time = `${hour}:${minute}:${second}`;

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const dateParts = dateFormatter.formatToParts(now);
        const month = dateParts.find(p => p.type === 'month').value;
        const day = dateParts.find(p => p.type === 'day').value;
        const year = dateParts.find(p => p.type === 'year').value;
        const date = `${day}/${month}/${year}`;

        return { time, period, date };
    } catch (error) {
        return { time: '--:--:--', period: '--', date: '--/--/----' };
    }
}

// ===================================
// TOGGLE FAVORITE
// ===================================

function toggleFavorite(cityName, btn) {
    const index = app.favorites.indexOf(cityName);
    
    if (index > -1) {
        app.favorites.splice(index, 1);
        btn.classList.remove('favorited');
        showToast(`${cityName} removed from favorites`);
    } else {
        app.favorites.push(cityName);
        btn.classList.add('favorited');
        showToast(`${cityName} added to favorites`);
    }

    localStorage.setItem('favoriteCities', JSON.stringify(app.favorites));
}

// ===================================
// CUSTOM TIMEZONE
// ===================================

function addCustomTimezone() {
    const name = document.getElementById('customName').value.trim();
    const offset = document.getElementById('customOffset').value.trim();

    if (!name || !offset) {
        showToast('Please fill all fields', 'error');
        return;
    }

    // Parse offset
    const offsetMatch = offset.match(/([+-])(\d+):?(\d+)?/);
    if (!offsetMatch) {
        showToast('Invalid offset format (use +5:30 or -8:00)', 'error');
        return;
    }

    const sign = offsetMatch[1] === '+' ? 1 : -1;
    const hours = parseInt(offsetMatch[2]);
    const minutes = parseInt(offsetMatch[3]) || 0;
    const totalOffset = sign * (hours + minutes / 60);

    const customTz = {
        name,
        timezone: `Etc/GMT${sign === 1 ? '-' : '+'}${hours}`,
        emoji: '📍',
        offset: totalOffset,
        isCustom: true
    };

    app.customTimezones.push(customTz);
    localStorage.setItem('customTimezones', JSON.stringify(app.customTimezones));

    // Clear form
    document.getElementById('customName').value = '';
    document.getElementById('customOffset').value = '';

    showToast(`${name} added successfully`);
    renderClocks();
}

function deleteCustomTimezone(name) {
    app.customTimezones = app.customTimezones.filter(tz => tz.name !== name);
    localStorage.setItem('customTimezones', JSON.stringify(app.customTimezones));
    showToast(`${name} deleted`);
    renderClocks();
}

function cancelCustom() {
    document.getElementById('customName').value = '';
    document.getElementById('customOffset').value = '';
}

// ===================================
// UTILITIES
// ===================================

function formatOffset(offset) {
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset);
    const minutes = Math.round((absOffset - hours) * 60);
    
    return `UTC ${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';

    if (type === 'error') {
        toast.style.background = '#FF6B6B';
    } else {
        toast.style.background = '#4ECDC4';
    }

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================================
// CONSOLE MESSAGES
// ===================================

console.log('%c🕐 Global Digital Clock Application', 'color: #4ECDC4; font-size: 20px; font-weight: bold;');
console.log('%cMade in India 🇮🇳', 'color: #FF6B6B; font-size: 14px;');
console.log('Supported Timezones: ' + timezones.length);
