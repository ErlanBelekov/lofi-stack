## still WIP, not ready for production use!

# Remix Lofi Stack

![The Remix Lofi Stack](./public/image.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template ErlanBelekov/lofi-stack
```

## What's in the stack

- `Cloudflare Pages` deployment
- `SQLite` database powered by `Turso`
- Database ORM with `Drizzle ORM`
- Type-safe access to `process.env` using `Zod`
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
