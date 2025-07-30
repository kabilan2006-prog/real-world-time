// Advanced features for the real-time clock
class AdvancedClock extends RealTimeClock {
    constructor() {
        super();
        this.alarms = [];
        this.is24HourFormat = true;
        this.setupAdvancedFeatures();
    }
    
    setupAdvancedFeatures() {
        this.createAlarmInterface();
        this.createFormatToggle();
        this.setupNotifications();
    }
    
    createAlarmInterface() {
        const alarmContainer = document.createElement('div');
        alarmContainer.className = 'alarm-container';
        alarmContainer.innerHTML = `
            <div class="alarm-section">
                <h3>Set Alarm</h3>
                <input type="time" id="alarmTime" />
                <button id="setAlarm">Set Alarm</button>
                <div id="alarmList"></div>
            </div>
        `;
        
        document.querySelector('.clock-container').appendChild(alarmContainer);
        
        document.getElementById('setAlarm').addEventListener('click', () => {
            const alarmTime = document.getElementById('alarmTime').value;
            if (alarmTime) {
                this.addAlarm(alarmTime);
            }
        });
    }
    
    createFormatToggle() {
        const formatToggle = document.createElement('div');
        formatToggle.className = 'format-toggle';
        formatToggle.innerHTML = `
            <label>
                <input type="checkbox" id="formatToggle" checked>
                24-hour format
            </label>
        `;
        
        document.querySelector('.timezone-selector').appendChild(formatToggle);
        
        document.getElementById('formatToggle').addEventListener('change', (e) => {
            this.is24HourFormat = e.target.checked;
            this.updateTime();
        });
    }
    
    updateTime() {
        const now = new Date();
        
        const timeOptions = {
            timeZone: this.currentTimezone,
            hour12: !this.is24HourFormat,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const dateOptions = {
            timeZone: this.currentTimezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        
        this.timeElement.textContent = timeString;
        this.dateElement.textContent = dateString;
        
        // Check alarms
        this.checkAlarms(now);
        
        // Animation effect
        this.timeElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.timeElement.style.transform = 'scale(1)';
        }, 100);
    }
    
    addAlarm(time) {
        const alarm = {
            id: Date.now(),
            time: time,
            active: true
        };
        
        this.alarms.push(alarm);
        this.updateAlarmList();
    }
    
    updateAlarmList() {
        const alarmList = document.getElementById('alarmList');
        alarmList.innerHTML = '';
        
        this.alarms.forEach(alarm => {
            const alarmItem = document.createElement('div');
            alarmItem.className = 'alarm-item';
            alarmItem.innerHTML = `
                <span>${alarm.time}</span>
                <button onclick="clock.removeAlarm(${alarm.id})">Remove</button>
            `;
            alarmList.appendChild(alarmItem);
        });
    }
    
    removeAlarm(id) {
        this.alarms = this.alarms.filter(alarm => alarm.id !== id);
        this.updateAlarmList();
    }
    
    checkAlarms(now) {
        const currentTime = now.toLocaleTimeString('en-US', {
            timeZone: this.currentTimezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        
        this.alarms.forEach(alarm => {
            if (alarm.active && currentTime === alarm.time) {
                this.triggerAlarm(alarm);
                alarm.active = false; // Prevent repeated triggers
            }
        });
    }
    
    triggerAlarm(alarm) {
        // Visual notification
        document.body.style.backgroundColor = '#ff4444';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, 1000);
        
        // Browser notification
        if (Notification.permission === 'granted') {
            new Notification('Alarm!', {
                body: `Alarm set for ${alarm.time} is ringing!`,
                icon: '🔔'
            });
        }
        
        // Audio notification (optional)
        this.playAlarmSound();
    }
    
    setupNotifications() {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }
    
    playAlarmSound() {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }
}

// Initialize the advanced clock
document.addEventListener('DOMContentLoaded', () => {
    window.clock = new AdvancedClock();
});
