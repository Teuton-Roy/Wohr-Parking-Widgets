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
                document.getElementById("installationDate").value = response.data.Installation_Date|| "";
            } else {
                console.error("No data found for the given Record ID.");
            }
        })
    }
});