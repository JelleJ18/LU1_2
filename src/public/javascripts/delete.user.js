function deleteFetch(userId, callback) {
    fetch(`/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => callback(null, data))
    .catch(err => callback(err));
}

function deleteButtonClicked(userId, buttonElement) {
    if (confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?')) {
        deleteFetch(userId, (error, result) => {
            if (error) {
                alert('Verwijderen mislukt!');
                return;
            }
            const row = buttonElement.closest('tr');
            if (row) row.remove();
        });
    }
}