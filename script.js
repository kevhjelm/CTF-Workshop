document.addEventListener('DOMContentLoaded', function() {
    // Ensure the DOM is fully loaded before attempting to access the elements.
    updateAllUsersScoreboard();
});

document.getElementById('flagForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const flag = document.getElementById('flag').value.trim();
    const validFlags = [
        "flag{api1_d0cd9be2324cc237235b}",
        "flag{api2_6bf2beda61e2a1ab2d0a}",
        "flag{api3_0bad677bfc504c75ff72}",
        "flag{api4_ce696239323ea5b2d015}",
        "flag{api5_76dd990a97ff1563ae76}",
        "flag{api6_afb969db8b6e272694b4}",
        "flag{api7_e71b65071645e24ed50a}",
        "flag{api8_509f8e201807860d5c91}",
        "flag{api9_81e306bdd20a7734e244}",
        "flag{api10_5db611f7c1ffd747971f}"
    ];

    // Check if the submitted flag is valid and if the username is not empty
    if (validFlags.includes(flag) && username) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        users[username] = (users[username] || 0) + 10; // each correct flag earns 10 points
        localStorage.setItem('users', JSON.stringify(users));
        updateIndividualScoreboard(username, users[username]);
        updateAllUsersScoreboard();
        alert("Correct flag! You've earned 10 points.");
    } else {
        alert("Incorrect flag or missing username! Please try again.");
    }

    // Clear the flag input field
    document.getElementById('flag').value = '';
});

function updateIndividualScoreboard(username, score) {
    // Check if the individual scoreboard element exists
    let individualScoreboard = document.getElementById('individualScoreboard');
    if (individualScoreboard) {
        individualScoreboard.innerHTML = `<div>${username}: ${score} points</div>`;
    } else {
        console.error('The individualScoreboard element was not found.');
    }
}

function updateAllUsersScoreboard() {
    // Check if the all users scoreboard element exists
    sortedScores.forEach((user, index) => {
        let medal = '';
        let additionalClass = '';
        if (index === 0) { // First place
            medal = '🥇';
            additionalClass = 'first-place';
        } else if (index === 1) { // Second place
            medal = '🥈';
            additionalClass = 'second-place';
        } else if (index === 2) { // Third place
            medal = '🥉';
            additionalClass = 'third-place';
        }
        scoreboardHTML += `<div class="user-score ${additionalClass}">${medal} ${user.username}: ${user.score} points</div>`;
    });
    let allUsersScoreboard = document.getElementById('allUsersScoreboard');
    if (allUsersScoreboard) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        let scoreboardHTML = '<h2>All Users Scoreboard</h2>';
        for (let user in users) {
            scoreboardHTML += `<div>${user}: ${users[user]} points</div>`;
        }
        allUsersScoreboard.innerHTML = scoreboardHTML;
    } else {
        console.error('The allUsersScoreboard element was not found.');
    }
}