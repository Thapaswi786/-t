const apiBase = 'http://localhost:5000/api';
let currentUser = null;

function login() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    showMessage('Please enter a username');
    return;
  }
  fetch(apiBase + '/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username})
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      currentUser = data.user;
      showDashboard();
    } else {
      showMessage('Login failed');
    }
  })
  .catch(() => showMessage('Server error'));
}

function logout() {
  currentUser = null;
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  clearMessage();
}

function showDashboard() {
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('welcome').textContent = `Welcome, ${currentUser.username}!`;
  loadVolunteers();
}

function loadVolunteers() {
  fetch(apiBase + '/volunteers')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('volunteers-list');
      container.innerHTML = '';
      data.forEach(event => {
        const div = document.createElement('div');
        div.className = 'volunteer-item';
        div.innerHTML = `<h3>${event.title}</h3>
          <p>${event.description}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Venue:</strong> ${event.venue}</p>
          <button onclick="register('${event._id}')">Register</button>`;
        container.appendChild(div);
      });
    });
}

function register(eventId) {
  fetch(apiBase + `/register/${eventId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: currentUser.username})
  })
  .then(response => response.json())
  .then(data => {
    if(data.status === 'registered') {
      alert('Registration successful!');
    }
  });
}

function showMessage(msg) {
  const msgDiv = document.getElementById('login-msg');
  msgDiv.textContent = msg;
}

function clearMessage() {
  document.getElementById('login-msg').textContent = '';
}
