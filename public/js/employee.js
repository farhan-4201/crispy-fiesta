document.getElementById('addEmployeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const type = document.getElementById('type').value;

    fetch('http://localhost:3000/api/employees', {  // Ensure correct URL with port 3000
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, type })
    })
    .then(response => {
        if (response.ok) {
            alert('Employee added successfully!');
            loadEmployees();  // Reload the employee list
        } else {
            alert('Failed to add employee.');
        }
    })
    .catch(err => {
        console.error('Error adding employee:', err);
        alert('Error adding employee, please try again.');
    });
});

function loadEmployees() {
    fetch('http://localhost:3000/api/employees')  // Ensure correct URL with port 3000
    .then(response => response.json())
    .then(employees => {
        const tableBody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';  // Clear existing rows
        
        if (employees.length === 0) {
            const row = tableBody.insertRow();
            row.innerHTML = '<td colspan="3">No employees found.</td>';
        } else {
            employees.forEach(employee => {
                const row = tableBody.insertRow();
                row.innerHTML = `<td>${employee.id}</td><td>${employee.firstName} ${employee.lastName}</td><td>${employee.type}</td>`;
            });
        }
    })
    .catch(err => {
        console.error('Error loading employees:', err);
        alert('Error loading employee list, please try again.');
    });
}

// Load employees on page load
window.onload = loadEmployees;
