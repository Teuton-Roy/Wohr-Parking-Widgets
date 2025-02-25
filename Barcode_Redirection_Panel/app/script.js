console.log("hello");

ZOHO.CREATOR.init()
    .then(function(data) {
        
        console.log(data);
        
        console.log('Current URL:', window.location.href);
        console.log('Search Params:', window.location.search);

        // Get the Customer ID and Request Type from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const customerId = urlParams.get('Customer_ID'); // Match the parameter name from the Deluge script
        const requestType = urlParams.get('Type_of_Request'); // Match the parameter name from the Deluge script

        // Log the extracted parameters
        console.log('Customer ID (Customer_ID):', customerId);

        if (customerId) {
            // Configure the API call to fetch customer records
            const config = {
                appName: "barcode", // Replace with your Zoho Creator application link name
                reportName: "All_Customers", // Replace with your report name (if using a report) or omit if fetching directly from the form
                criteria: "(Customer_ID == \"" + customerId + "\")" // Filter by Customer ID (string format, adjust if numeric)
            };

            // Fetch all records using ZOHO.CREATOR.API.getAllRecords
            ZOHO.CREATOR.API.getAllRecords(config)
                .then(function(response) {
                    if (response && response.data && response.data.length > 0) {
                        // Assuming the first record is the matching one (adjust if multiple records are possible)
                        console.log(response.data);
                        
                        const customerData = response.data;


                        // Extract the fields from the response
                        const customerName = customerData.Customer_Name || '';
                        const psNumber = customerData.PS_Number || '';
                        const email = customerData.Email || '';
                        const phone = customerData.Phone || '';
                        const requestTypeFromForm = customerData.Service_Request_Type || '';
                        const remark = customerData.Request_Remark || '';
                        const installationDate = customerData.Installation_Date ? new Date(customerData.Installation_Date).toISOString().split('T')[0] : ''; // Format date for input

                        // Populate the widget form fields
                        document.getElementById('customerId').value = customerId;
                        document.getElementById('psNumber').value = psNumber;
                        document.getElementById('customerName').value = customerName;
                        document.getElementById('email').value = email;
                        document.getElementById('phone').value = phone;
                        document.getElementById('requestType').value = requestType || requestTypeFromForm; // Use URL param or form data
                        document.getElementById('remark').value = remark;
                        document.getElementById('installationDate').value = installationDate;

                        // Hide error messages if they exist
                        hideErrors();
                    } else {
                        console.log('No customer found with the provided Customer ID.');
                        resetForm();
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching customer data:', error);
                    console.log('An error occurred while fetching customer data. Please try again.');
                    resetForm();
                });
        } else {
            console.log('No Customer ID provided. Please enter a Customer ID in the Barcode Redirection form.');
            resetForm();
        }
    })
    .catch(function(error) {
        console.error('Error initializing Zoho Creator SDK:', error);
        console.log('An error occurred while initializing the widget. Please try again.');
    });

// Function to hide error messages
function hideErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(error => error.style.display = 'none');
}

// Function to reset the form
function resetForm() {
    document.getElementById('serviceForm').reset();
    hideErrors();
}

// Handle form submission (optional, for additional functionality)
document.getElementById('serviceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // You can add custom logic here, e.g., validating or submitting data to another form/service
    const formData = {
        customerId: document.getElementById('customerId').value,
        psNumber: document.getElementById('psNumber').value,
        customerName: document.getElementById('customerName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        requestType: document.getElementById('requestType').value,
        remark: document.getElementById('remark').value,
        installationDate: document.getElementById('installationDate').value
    };

    console.log('Form submitted with data:', formData);
    alert('Form submitted successfully! Data can be processed further via Zoho Creator or custom logic.');
});

// Handle phone input formatting (optional, to ensure +91 format)
document.getElementById('phone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
    this.value = value; // Update input value
});




















































// document.getElementById('serviceForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     // Reset previous errors
//     document.querySelectorAll('.error').forEach(error => {
//         error.style.display = 'none';
//     });
//     document.querySelectorAll('input, select, textarea').forEach(field => {
//         field.classList.remove('invalid');
//     });

//     let isValid = true;
//     const fields = {
//         customerId: /^.{1,}$/,
//         psNumber: /^.{1,}$/,
//         customerName: /^[A-Za-z\s]{2,}$/,
//         email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         phone: /^\d{10}$/,
//         requestType: /^.{1,}$/,
//         installationDate: /^\d{4}-\d{2}-\d{2}$/
//     };

//     // Validate each field
//     for (let [fieldName, pattern] of Object.entries(fields)) {
//         const field = document.getElementById(fieldName);
//         if (!pattern.test(field.value)) {
//             field.classList.add('invalid');
//             field.nextElementSibling.style.display = 'block';
//             isValid = false;
//         }
//     }

//     if (isValid) {
//         // Form is valid, you can submit it here
//         alert('Form submitted successfully!');
//         this.reset();
//     }
// });

// // Set minimum date to today
// const today = new Date().toISOString().split('T')[0];
// document.getElementById('installationDate').min = today;