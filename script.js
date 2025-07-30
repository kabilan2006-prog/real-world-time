class RealTimeClock {
    constructor() {
        this.timeElement = document.getElementById('time');
        this.dateElement = document.getElementById('date');
        this.timezoneSelect = document.getElementById('timezone');
        this.currentTimezone = 'America/New_York';
        
        this.init();
    }
    
    init() {
        // Set default timezone to user's local timezone
        this.currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.setTimezoneOptions();
        
        // Start the clock
        this.updateTime();
        this.startClock();
        
        // Add event listener for timezone changes
        this.timezoneSelect.addEventListener('change', (e) => {
            this.currentTimezone = e.target.value;
            this.updateTime();
        });
    }
    
    setTimezoneOptions() {
        // Add user's current timezone if not already in the list
        const currentOption = Array.from(this.timezoneSelect.options)
            .find(option => option.value === this.currentTimezone);
        
        if (!currentOption) {
            const option = document.createElement('option');
            option.value = this.currentTimezone;
            option.textContent = this.currentTimezone.replace('_', ' ');
            this.timezoneSelect.appendChild(option);
        }
        
        this.timezoneSelect.value = this.currentTimezone;
    }
    
    updateTime() {
        const now = new Date();
        
        // Format time
        const timeOptions = {
            timeZone: this.currentTimezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        // Format date
        const dateOptions = {
            timeZone: this.currentTimezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        
        // Update DOM elements
        this.timeElement.textContent = timeString;
        this.dateElement.textContent = dateString;
        
        // Add a subtle animation effect
        this.timeElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.timeElement.style.transform = 'scale(1)';
        }, 100);
    }
    
    startClock() {
        // Update every second
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }
    
    // Method to add more timezones dynamically
    addTimezone(timezone, displayName) {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = displayName;
        this.timezoneSelect.appendChild(option);
    }
}

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const clock = new RealTimeClock();
    
    // Optional: Add more timezones
    clock.addTimezone('America/Los_Angeles', 'Los Angeles');
    clock.addTimezone('Europe/Paris', 'Paris');
    clock.addTimezone('Asia/Dubai', 'Dubai');
});

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        // Toggle fullscreen
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});
