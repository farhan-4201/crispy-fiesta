document.addEventListener('DOMContentLoaded', function() {
    // Function to add a new store
    document.getElementById('addStoreForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const storeName = document.getElementById('storeName').value;
        const phone = document.getElementById('phone').value;
        const sector = document.getElementById('sector').value;

        // Sending data to the server to insert a new store
        fetch('http://localhost:3000/api/stores', {  // Ensure correct URL with port 3000
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ storeName, phone, sector })
        })
        .then(response => {
            if (response.ok) {
                alert('Store added successfully!');
                loadStores();  // Reload the store list after adding
            } else {
                alert('Failed to add store.');
            }
        })
        .catch(err => {
            console.error('Error adding store:', err);
            alert('Error adding store, please try again.');
        });
    });

    // Function to load and display stores
    function loadStores() {
        fetch('http://localhost:3000/api/stores')  // Ensure correct URL with port 3000
        .then(response => response.json())
        .then(stores => {
            const storeTable = document.getElementById('storeTable').getElementsByTagName('tbody')[0];
            storeTable.innerHTML = '';  // Clear existing rows
            
            if (stores.length === 0) {
                const row = storeTable.insertRow();
                row.innerHTML = '<td colspan="4">No stores found.</td>';
            } else {
                stores.forEach(store => {
                    const row = storeTable.insertRow();
                    row.innerHTML = `
                        <td>${store.id}</td>
                        <td>${store.storeName}</td>
                        <td>${store.phone}</td>
                        <td>${store.sector}</td>
                    `;
                });
            }
        })
        .catch(err => {
            console.error('Error loading stores:', err);
            alert('Error loading store list, please try again.');
        });
    }

    // Load stores on page load
    loadStores();
});
