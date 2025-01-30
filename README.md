# Payment Integration API

## Overview

The Payment Integration API is a RESTful service that simplifies payment processing by integrating with Paystack. This application is designed to handle payment initialization and verification, ensuring secure and seamless transactions for users.

## Features

- **Initialize Payments:** Generate payment links for users to complete transactions.
- **Verify Payments:** Confirm the status of payments to ensure successful transactions.
- **Error Handling:** Robust error handling for invalid requests or failed operations.
- **Mock Testing:** Includes unit tests using Mocha, Chai, and Nock for API reliability.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Payment Gateway:** Paystack
- **Testing:** Mocha, Chai, Nock, Supertest
- **Version Control:** GitHub
- **CI/CD:** GitHub Actions

## Endpoints

- **Initialize Payment:** `POST /api/v1/payment`
- **Verify Payment:** `GET /api/v1/payment/:reference`

## Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- NPM or Yarn
- Paystack account with API keys

## Testing

This application includes unit tests to validate API functionality. The tests are written using Mocha, Chai, and Nock to mock external API requests.

## Continuous Integration

The project uses GitHub Actions for CI/CD to:
- Run automated tests on every push to the master branch.
- Ensure code quality and reliability.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For inquiries or support, please contact:
- **Name:** Maxim LD
- **Email:** [maxld.testdev@gmail.com](mailto:maxld.testdev@gmail.com)
- **GitHub:** [https://github.com/maxim-ld](https://github.com/maxim-ld)
- **LinkedIn:** [https://www.linkedin.com/in/arowosere-ak](https://www.linkedin.com/in/arowosere-ak)

