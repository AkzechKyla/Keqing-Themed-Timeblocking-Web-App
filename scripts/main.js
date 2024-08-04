fetch('data.json')
    .then(response => response.json())
    .then(data => {
        generateSchedule(data);
        setInterval(updateIndicator, 60000); // Update the indicator every minute
    })
    .catch(error => console.error('Error loading the data:', error));

function formatTime(hour) {
    return moment().startOf('day').add(moment.duration(hour, 'h')).format('h:mm A');
}

function generateSchedule(data) {
    const scheduleContainer = document.getElementById('schedule');
    const startHour = data.start;
    let currentHour = startHour;

    data.blocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.className = 'block';

        const startTime = formatTime(currentHour);
        const endTime = formatTime(currentHour + block.hours);

        blockElement.style.height = `${block.hours * 30}px`; // 30px per hour
        blockElement.innerHTML = `
        <div class="description">${block.text}</div>
        <div class="time">${startTime} - ${endTime}</div>
    `;

        scheduleContainer.appendChild(blockElement);

        currentHour += block.hours;
    });

    updateIndicator();
}

function updateIndicator() {
    const now = moment();
    const currentHour = now.hour() + now.minute() / 60;
    const scheduleContainer = document.getElementById('schedule');
    const indicator = document.getElementById('indicator');

    let totalHeight = 0;
    let indicatorPosition = 0;

    let startHour = data.start;

    Array.from(scheduleContainer.children).forEach(block => {
        const blockHours = parseInt(block.style.height) / 30;
        const blockStartHour = startHour;
        const blockEndHour = startHour + blockHours;

        // if (currentHour >= blockStartHour && currentHour < blockEndHour) {
        //     indicatorPosition = totalHeight + (currentHour - blockStartHour) * 30;
        // }
        indicatorPosition = totalHeight + (currentHour - blockStartHour) * 30;

        totalHeight += blockHours * 30;
        startHour = blockEndHour;
    });

    indicator.style.transform = `translateY(${indicatorPosition + 10}px)`;
}

generateSchedule(data);
setInterval(updateIndicator, 60000); // Update the indicator every minute
