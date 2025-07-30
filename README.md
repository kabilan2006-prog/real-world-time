index.html – Basic Page Structure
This is the main file that defines what appears on the screen.

What's inside:
html
Copy code
<div id="time">00:00:00</div>     ← Shows the current time  
<div id="date">Loading...</div>   ← Shows today's date  
<select id="timezone">...</select> ← Dropdown to choose a timezone  
<input type="time" />              ← Input box to set an alarm  
It also links to the scripts:

html
Copy code
<script src="script.js"></script>      ← Real-time clock  
<script src="advance.js"></script>     ← Alarm + advanced features
✅ 2. styles.css – Page Design
This file makes everything look nice and modern.

Features:
Gradient background color

Blurred glass-like clock box (glassmorphism)

Large bold time and clean font

Responsive layout for phones

Style for alarm list and toggle switch

✅ 3. script.js – Real-Time Clock
This file updates the clock every second and handles timezones.

Important parts:
➤ Class: RealTimeClock
constructor():
Finds the time, date, and timezone elements on the page.

init():

Detects your local timezone.

Starts updating the clock.

Listens for when you change the timezone.

updateTime():

Gets the current time and date.

Converts it to the selected timezone.

Updates it in the browser every second.

startClock():
Calls updateTime() every 1000 milliseconds (1 second).

✅ 4. advance.js – Advanced Features
This file adds alarms, 24/12-hour toggle, and notifications.

Extended Class: AdvancedClock (inherits RealTimeClock)
📌 createAlarmInterface()
Adds an input box to pick alarm time (like 07:30)

Adds a "Set Alarm" button

Adds a place to show the list of set alarms

🕰️ addAlarm(time)
Stores alarms in a list

Shows each alarm with a "Remove" button

🔁 checkAlarms(now)
Compares current time with alarm time

If matched, it triggers the alarm

🚨 triggerAlarm(alarm)
Changes background color briefly

Shows a browser notification

Plays a beep using Web Audio API

✅ createFormatToggle()
Adds a checkbox for 24-hour/12-hour format

When clicked, it changes how time is displayed

🔔 setupNotifications()
Asks for browser permission to send notifications
