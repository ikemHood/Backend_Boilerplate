# Node.js Express MongoDB Backend Boilerplate

This boilerplate provides a starting point for building scalable and efficient backend applications using Node.js, Express, and MongoDB. It follows best practices and patterns for API development and is structured to be easily extensible.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for modern applications.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **CORS**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS.
- **Error Handling**: Centralized error handling mechanism.
- **Validation**: Request data validation using express-validator.
- **Logging**: Using morgan & winston.
- **Authentication**: Using JWT.
- **Code Linting**: Using Prettier.

## Folder Structure

```
backend-boilerplate/
│
├──  config/            # Environment variables and configuration related stuff

├── src/
│   ├── controllers/     # Route controllers (controller layer)
│   ├── helpers/         # Api helpers
│   ├── middlewares/     # Custom express middlewares
│   ├── models/          # Mongoose models (data layer)
│   ├── routes/          # Routes (express route definitions)
│   ├── startup/         # Utility startup functions
│   └── index.js           # Express app
│
├── .gitignore           # Specifies intentionally untracked files to ignore
├── package.json         # Node module dependencies and scripts
├── README.md            # Project overview
└── .prettierrc.cjs
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ikemHood/Backend_Boilerplate.git
   cd Backend_Boilerplate
   ```

2. Install NPM packages:

   ```sh
   npm install
   ```

3. Configure environment variables:

   ```/config/default.cjs
    set system.port and mongo_db.uri
   ```

4. Run the server:

   ```sh
   npm start
   ```

   or for development:

   ```sh
   npm run dev
   ```


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License
Distributed under the MIT License.


## Contact
Name – ikem Peter
Email: ikem@ikem.dev
