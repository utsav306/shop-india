# MERN Stack Website

This is a MERN (MongoDB, Express.js, React, Node.js) stack website project. The project is set up to run both the frontend and backend concurrently using the command `npm run dev`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [License](#license)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/utsav306/shop-india.git
    cd shop-india
    ```

2. **Install dependencies for both backend and frontend:**

    ```bash
    # In the root directory
    npm install

    # Change directory to client
    cd client
    npm install

    # Change back to the root directory
    cd ..
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGODB_URI=your_mongodb_uri
    PORT=8080
    ```

    Create another `.env` file in the `client` directory and add the following variables:

    ```env
    REACT_APP_API_URL=http://localhost:3000
    ```

## Usage

To run both the backend and frontend concurrently, use the following command:

```bash
npm run dev
