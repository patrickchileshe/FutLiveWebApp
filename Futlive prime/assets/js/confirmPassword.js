document.querySelector('form').addEventListener('submit', (e) => {
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    if (password !== confirm) {
        e.preventDefault();
        alert('Passwords do not match');
    }
});