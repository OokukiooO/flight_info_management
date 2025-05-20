## Project Structure

- **src/app/layout.tsx**: Defines the root layout of the application, setting global styles and fonts.
- **src/app/page.tsx**: The homepage of the application, containing the main content and structure.
- **src/app/globals.css**: Contains global styles using Tailwind CSS for styling.
- **src/db/schema.sql**: Defines the SQLite database schema, including the creation statements for the PassengerInfo, FlightInfo, and UserInfo tables.
- **src/db/index.ts**: The entry file for the database, responsible for connecting to the database and exporting relevant database operation functions.
- **src/db/flight.ts**: Contains database operation functions related to flight information, such as adding, querying, and updating flight details.
- **src/db/passenger.ts**: Contains database operation functions related to passenger information, such as adding, querying, and updating passenger details.
- **src/db/user.ts**: Contains database operation functions related to user information, such as adding, querying, and updating user details.
- **src/types/index.ts**: Defines types and interfaces used throughout the project to ensure type safety.

## Database Schema

The SQLite database includes the following tables:

- **PassengerInfo**: Stores information about passengers.
- **FlightInfo**: Stores information about flights.
- **UserInfo**: Stores information about users.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository.
2. Install the dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up the SQLite database by running the SQL schema in `src/db/schema.sql`.
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Learn More

For more information about Next.js, check out the [Next.js Documentation](https://nextjs.org/docs).

## Deployment

The easiest way to deploy your Next.js app is to use the Vercel Platform. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.