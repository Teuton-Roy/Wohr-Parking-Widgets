document.getElementById('serviceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous errors
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.classList.remove('invalid');
    });

    let isValid = true;
    const fields = {
        customerId: /^.{1,}$/,
        psNumber: /^.{1,}$/,
        customerName: /^[A-Za-z\s]{2,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{10}$/,
        requestType: /^.{1,}$/,
        installationDate: /^\d{4}-\d{2}-\d{2}$/
    };

    // Validate each field
    for (let [fieldName, pattern] of Object.entries(fields)) {
        const field = document.getElementById(fieldName);
        if (!pattern.test(field.value)) {
            field.classList.add('invalid');
            field.nextElementSibling.style.display = 'block';
            isValid = false;
        }
    }

    if (isValid) {
        // Form is valid, you can submit it here
        alert('Form submitted successfully!');
        this.reset();
    }
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('installationDate').min = today;