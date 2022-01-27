# Daily Tricks
Simple project for creating and bookmarking code snippets.

[Live Demo](https://daily-tricks.vercel.app/)


## Prepare Locally

First create `.env` file in project root, with `DB_URL` (mongodb connection string) and `FIREBASE_SERVICE_ACCOUNT_KEY` (firebase service account json stringified).

Then:
```bash
# installs dependencies
npm i
# or
yarn

# runs dev server on -> http://localhost:3000
npm run dev
# or
yarn dev
```

Create and run production version locally:
```bash
# creates prod ready bundle
npm run build
# or
yarn build

# runs prod server on -> http://localhost:3000
npm start
# or
yarn start
```

## Used Technologies
[Next.js](https://nextjs.org/)

[Redux Toolkit](https://redux-toolkit.js.org/)

[TailwindCSS](tailwindcss.com)

[TypeORM](https://typeorm.io/#/)

[MongoDB](https://mongodb.com/)

[Firebase](https://firebase.google.com/)

[Monaco Editor](https://microsoft.github.io/monaco-editor/)

[MerakiUI](https://merakiui.com/components/)

