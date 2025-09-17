function logoutConfirm() {
    if (confirm('Weet je zeker dat je wilt uitloggen?')) {
        window.location.href = '/auth/logout';
    }
}