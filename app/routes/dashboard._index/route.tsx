import {
  LoaderFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { cities, countries, db } from "~/drizzle";
import { Routes } from "~/lib";
import { authenticator } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: Routes.Login,
  });

  const currentCities = await db.select().from(cities);

  console.log(currentCities);

  const currentCountries = await db.select().from(countries);

  console.log(currentCountries);

  return json({
    message: "OK!",
    user,
  });
}

export default function DashboardPage() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-sky-400 text-2xl font-bold">
        Dashboard page. Welcome, {loaderData.user.email}
      </h1>

      <Link to={Routes.Logout} className="text-sky-400 text-center">
        Logout
      </Link>
    </div>
  );
}
