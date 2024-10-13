document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const loadingMessage = document.getElementById('loadingMessage');

    if (user === 'arthur') {
        loadingMessage.textContent = 'שבוע טוב ארתור! כאן תוכל לעקוב אחרי התקדמות הפיזורים במחלקות';
    } else if (user === 'gil') {
        loadingMessage.textContent = 'יום טוב גיל! כאן תוכל לעקוב אחרי התקדמות הצוות במחלקות';
    }

    // Redirect to tasks page after 5 seconds
    setTimeout(() => {
        window.location.href = 'tasks.html';
    }, 5000);
});
