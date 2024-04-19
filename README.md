## still WIP, not ready for production use!

# Remix Lofi Stack

![The Remix Lofi Stack](https://private-user-images.githubusercontent.com/36839981/323814868-53830026-2d0c-432f-b48e-cd9e1fd657c9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTM0OTU2NzIsIm5iZiI6MTcxMzQ5NTM3MiwicGF0aCI6Ii8zNjgzOTk4MS8zMjM4MTQ4NjgtNTM4MzAwMjYtMmQwYy00MzJmLWI0OGUtY2Q5ZTFmZDY1N2M5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDE5VDAyNTYxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWRlZWIzYjQ5ZWQ1NzllODMyYzg1NWI0NjVmNWFhNDhhZDNhNjM1OWM4YTA1ZTEzOGQ5NWExMzEwMjFkN2VjNzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.AuEf29mnZef04EJVQ4x2k16xgM3gAFsogW_mHPsqwJc)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template ErlanBelekov/lofi-stack
```

## What's in the stack

- `Google Cloud Run(Serverless)` deployment
- `SQLite` database powered by `Turso`
- Database ORM with `Drizzle ORM`
- `Google Cloud Artifact Registry` for storing `Docker` images
- Production-ready `Dockerfile` with minimal footprint
- Type-safe access to `process.env` using `Zod`
- Github Actions CI/CD: automatic deploy to stage `stage` and `prodoction` environments
- Simple & Extendable Authentication using `remix-auth`
- Styling with `Tailwind`
- End-to-End testing with `PlayWright`
- Unit testing with `Vitest`
- Package management with `pnpm`
- Code formatting with `Prettier`
- Linting with `ESlint`
- Static Types with `TypeScript`

# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
