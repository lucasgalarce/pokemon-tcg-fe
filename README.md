# pokemon-tcg-fe

# Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

## .env vars 🔧

You have a .env.template with next variables:

```
VITE_CLERK_PUBLIC_API_HOST=http://localhost:3000/api
```

## Installation 🔧

Clone the repo

```
git clone https://github.com/lucasgalarce/pokemon-tcg-fe
```

Install NPM packages

```
npm install
npm run dev
```

## Start

You can login in the app with the following credentials:

```
"username": "admin",
"password": "Admin2121!"
```

## Explanation

- User Registration and Authentication: Users can register and log in to the application.
- Authentication Redirects: If a user is not authenticated, they will be redirected to the login page.
- Custom Pokémon Cards: Each user can add custom Pokémon cards to their card dashboard.
- Image Uploads: Users have the option to upload an image for each card. If no image is uploaded, a default image will be assigned.
- Battle Simulation: By clicking on a Pokémon card, users can initiate a battle against another Pokémon card. The winner is determined based on whether the attacking Pokémon can defeat the defending Pokémon in a single attack, considering weaknesses and resistances.
- Filters and Pagination: The application includes filters and pagination for easier navigation and data management.
- Deployment: The application is deployed at: https://pokemon-tcg-fe-production.up.railway.app/
