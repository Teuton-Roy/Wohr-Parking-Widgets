ZOHO.CREATOR.init().then(function (data) {
    console.log("Zoho Creator Initialized:");

    var QueryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    console.log("Query Parameters:", QueryParams);

    if (QueryParams.Customer_ID) {
        document.getElementById("customerId").value = QueryParams.Customer_ID;
    }

    console.log(QueryParams.recordID);
   
    if (QueryParams.recordID) {
        var config = {
            appName: "barcode",
            reportName: "All_Customers",
            id: QueryParams.recordID
        };

        ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
            if (response.data) {
                console.log("Record Data:", response.data);
                console.log("Installation Date:", response.data.Installation_Date);
                
                document.getElementById("psNumber").value = response.data.PS_Number || "";
                document.getElementById("customerName").value = response.data.Customer_Name || "";
                document.getElementById("email").value = response.data.Email|| "";
                document.getElementById("phone").value = response.data.Phone_Number || "";
                document.getElementById("installationDate").value = response.data.Installation_Date || "";            
            } else {
                console.error("No data found for the given Record ID.");
            }
            
            document.getElementById("serviceForm").addEventListener("submit", function(event) {
                event.preventDefault();

                // Get and format the installation date to DD-MM-YYYY
                var dateInput = document.getElementById("installationDate").value;
                var formattedDate = "";
                if (dateInput) {
                    var dateParts = dateInput.split("-");
                    if (dateParts.length === 3) {
                        var year = dateParts[0];
                        var month = dateParts[1] - 1; // Months are 0-based in JavaScript Date
                        var day = dateParts[2];
                        
                        var dateObj = new Date(year, month, day);
                        formattedDate = ("0" + dateObj.getDate()).slice(-2) + "-" + 
                                        ("0" + (dateObj.getMonth() + 1)).slice(-2) + "-" + 
                                        dateObj.getFullYear();
                    } else {
                        console.error("Invalid date format for installationDate:", dateInput);
                    }
                }
                var formData = {
                    "data": {
                        "Customer_ID": document.getElementById("customerId").value,
                        "PS_Number": document.getElementById("psNumber").value,
                        "Customer_Name": document.getElementById("customerName").value,
                        "Email": document.getElementById("email").value,
                        "Customer_Phone": document.getElementById("countryCode").value + document.getElementById("phone").value, // Combine country code and phone
                        "Service_Request_Type": document.getElementById("requestType").value,
                        "Request_Remark": document.getElementById("remark").value,
                        "Installation_Date": document.getElementById("installationDate").value
                    }
                };

                // Configure Zoho Creator API for submission
                var submissionConfig = {
                    appName: "barcode", 
                    formName: "Customer_Request", 
                    data: formData
                };

                console.log("Submitting Data:", submissionConfig);

                // Submit the form data using Zoho Creator API
                ZOHO.CREATOR.API.addRecord(submissionConfig).then(function(response) {
                    console.log(response);
                    
                    if (response.code == 3000) {
                        alert("Service Submitted Successfully");
                        // Hide after 3 seconds
                        setTimeout(function() {
                            successMessage.style.display = "none";
                        }, 3000);

                        // Reset form
                        document.getElementById("serviceForm").reset();
                    }
                }).catch(function(error) {
                    console.error("Error submitting form:", error);
                });
            });

        }).catch(function(error) {
            console.error("Error fetching record:", error);
        });
    }
});
