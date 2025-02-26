# Wohr Parking System Barcode for Service

A web application for managing customer service requests in the Wohr Parking System through barcode scanning integration.

## Overview

This application provides a service request interface that:
- Processes customer identification via barcode scanning
- Retrieves customer information from existing records
- Allows submission of service requests with customer details
- Integrates with Zoho Creator platform

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The application will start on a port between 5000-5009 using HTTPS.

## Features

- Customer identification through barcode scanning
- Automatic form population with existing customer data
- Service request submission with the following fields:
  - Customer ID
  - PS Number
  - Customer Name
  - Email
  - Phone Number
  - Service Request Type
  - Request Remarks
  - Installation Date

## Technical Details

- Built on Node.js with Express
- Integrates with Zoho Creator API
- Uses HTTPS for secure communication
- Supports internationalization (i18n)
- Implements Content Security Policy (CSP)

## Development

The application structure:
```
Barcode_Redirection_Panel/
├── app/
│   ├── script.js         # Client-side application logic
│   ├── style.css         # Application styling
│   ├── translations/     # Internationalization files
│   └── widget.html       # Main application interface
├── server/
│   └── index.js         # Server implementation
└── plugin-manifest.json  # Plugin configuration
```

Note: To run the application locally, ensure you have the required SSL certificates (cert.pem and key.pem) in the root directory.