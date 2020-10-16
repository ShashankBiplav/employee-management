# Employee Management REST API

## Installation
First clone this repository on your machine and run `npm install` from your terminal or powershell in the project directory.

## Configuration
In the project you need to create a `.env` file on the root level. The environment variables that are required and their format can be found in a `.env-sample` file in the project.
You need to create and link your **MongoDB** **cluster** to the project using the URL of your MongoDB cluster. Also you need to create a **Send In Blue** account and provide your **API Key** and **Partner API Key** which is same in almost all the cases. This is required for the password reset functionality that I have implemented using OTP via email.
Once you have added these three environment variables in your `.env` file run `npm run start-dev` ***in the terminal inside the project directory*** to start the server in development mode. 
To run in production mode simply run `npm start` in the terminal.
## API Endpoints 
For the API endpoints visit `API-Endpoints.md` file in the repository or in your downloaded project or simply click [here](https://github.com/ShashankBiplav/employee-management/blob/master/API-Endpoints.md).
Happy Coding 👨🏽‍💻🤪
