// Sample task data (replace with your actual data source)
const tasksData = [
    { department: 'מחלקה א1', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה א1', task: 'טיטולים', completed: false },
    { department: 'מחלקה א1', task: 'מזון', completed: false },
    // Add more tasks as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    document.getElementById('userGreeting').textContent = currentUser;

    populateTasks();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setInterval(checkBreakTimes, 60000);

    document.getElementById('saveButton').addEventListener('click', saveTasks);
    document.getElementById('logoutButton').addEventListener('click', logout);
});

function populateTasks() {
    const tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];
    tasksData.forEach((task, index) => {
        const row = tasksTable.insertRow();
        row.insertCell(0).textContent = task.department;
        row.insertCell(1).textContent = task.task;
        const statusCell = row.insertCell(2);
        statusCell.textContent = task.completed ? 'בוצע' : 'לא בוצע';
        statusCell.className = task.completed ? 'status-done' : 'status-not-done';
        const actionCell = row.insertCell(3);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            statusCell.textContent = task.completed ? 'בוצע' : 'לא בוצע';
            statusCell.className = task.completed ? 'status-done' : 'status-not-done';
            updateProgress();
        });
        actionCell.appendChild(checkbox);
    });
    updateProgress();
}

function updateProgress() {
    const completedTasks = tasksData.filter(task => task.completed).length;
    const totalTasks = tasksData.length;
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
    const progressBar = document.querySelector('#progressBar .progress');
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${progressPercentage}%`;
}

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('he-IL', options);
}

function checkBreakTimes() {
    const now = new Date();
    const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const breakMessage = document.getElementById('breakMessage');

    if (currentTime >= '10:30' && currentTime < '10:45') {
        breakMessage.textContent = 'הפסקה עד 10:45';
        breakMessage.style.display = 'block';
    } else if (currentTime >= '12:00' && currentTime < '12:20') {
        breakMessage.textContent = 'הפסקת אוכל עד 12:20';
        breakMessage.style.display = 'block';
    } else if (currentTime >= '13:45' && currentTime < '14:00') {
        breakMessage.textContent = 'הפסקה עד 14:00';
        breakMessage.style.display = 'block';
    } else {
        breakMessage.style.display = 'none';
    }
}

function saveTasks() {
    // Implement saving tasks to server or local storage
    alert('השינויים נשמרו בהצלחה');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
