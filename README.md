Task Management System

Introduction  
  Welcome to the Task Management System! This system provides functionality for managing tasks, including creating tasks, updating task details, assigning tasks to users, and viewing tasks based on different statuses.


Built With:

Node.js
Express.js
Prisma

Requirements  
  To run this project correctly, you have the following installed package:
@prisma/client,
body-parser,
cors,
dotenv,
express,
mysql,
nodemon,
prisma,

Setup  
 1. Clone the Repository:


git clone https://github.com/DijarZ/Project-2.git
cd Project-2  

2.Install Dependencies:  

npm install
Set Up Environment Variables:


3.Set Up Environment Variables:    
DATABASE_USER="***"  
DATABASE_PASSWORD="***"  
DATABASE_NAME="***"  
DATABASE_URL="***"    

  these *** you can replace with your data.


4.Database Migration:  

  npx sequelize-cli db:migrate  


  5.Run the App:
  npm start
  Access the application at http://localhost:3000.


