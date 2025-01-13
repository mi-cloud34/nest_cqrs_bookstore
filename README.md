# NestJS Project with PostgreSQL and JWT Authentication

This project is built using NestJS and PostgreSQL. It implements authentication features such as login, signup, password reset, change password, and forgot password. Additionally, role-based access control is implemented for managing Book and BookStore tables, and email tokens are sent using Mailtrap for the forgot password functionality.

## Features

- **JWT Authentication**: Secure login, signup, reset-password, change-password, and forgot-password functionality.
- **Role-based Access Control**: Access control for Book and BookStore entities based on user roles.
- **Password Recovery**: Forgot password functionality with a token sent to the user’s email via Mailtrap.
- **PostgreSQL Database**: Uses PostgreSQL to store users, books, and bookstore data.
  
## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable applications.
- **PostgreSQL**: Relational database used to store user and book data.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **Mailtrap**: A fake SMTP service used for email testing, including password recovery tokens.
- **TypeORM**: ORM for database interactions.
- **bcrypt**: A library for hashing passwords.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-project-name.git
   cd your-project-name


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



