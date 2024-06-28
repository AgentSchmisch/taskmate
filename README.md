# Getting Started

## Initial Steps
- Clone the repository
- Run `npm install`
- Run `npm run seed`

## Environment Variables
- Create a .env.local file in the root directory
- Add the following variables to the .env file

```
DB_HOST=host_url
DB_USERNAME=database_username
DB_PASSWORD=database_password
DB_NAME=database_name
DB_PORT=db_port
```

## Create accounts
This project uses clerk for authentication, which both require accounts as well as some setup on the pages


### Clerk
- Create an account on clerk
- Create a new project
- Customize the project to only take username and password
- add the following to the .env.local file using the values from your clerk account

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=public_key
CLERK_SECRET_KEY=secret_key
```

## Running the project
- Run `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) and the project will be ready for development testing!


## Suggestion
Even though it is possible to host the project yourself I suggest to use the deployed version on CampusCloud for testing