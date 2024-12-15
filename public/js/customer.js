document.addEventListener('DOMContentLoaded', function() {
    // Function to add a new customer
    document.getElementById('addCustomerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Sending data to the server to insert a new customer
        fetch('http://localhost:3000/api/customers', {  // Ensure correct URL with port 3000
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerName, email, phone })
        })
        .then(response => {
            if (response.ok) {
                alert('Customer added successfully!');
                loadCustomers();  // Reload the customer list after adding
            } else {
                alert('Failed to add customer.');
            }
        })
        .catch(err => {
            console.error('Error adding customer:', err);
            alert('Error adding customer, please try again.');
        });
    });

    // Function to load and display customers
    function loadCustomers() {
        fetch('http://localhost:3000/api/customers')  // Ensure correct URL with port 3000
        .then(response => response.json())
        .then(customers => {
            const customerTable = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
            customerTable.innerHTML = '';  // Clear existing rows
            
            if (customers.length === 0) {
                const row = customerTable.insertRow();
                row.innerHTML = '<td colspan="4">No customers found.</td>';
            } else {
                customers.forEach(customer => {
                    const row = customerTable.insertRow();
                    row.innerHTML = `
                        <td>${customer.id}</td>
                        <td>${customer.customerName}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                    `;
                });
            }
        })
        .catch(err => {
            console.error('Error loading customers:', err);
            alert('Error loading customer list, please try again.');
        });
    }

    // Load customers on page load
    loadCustomers();
});
