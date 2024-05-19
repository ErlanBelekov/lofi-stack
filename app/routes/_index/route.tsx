import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { Routes } from "~/lib";
import { authenticator } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix Lofi Stack App" },
    { name: "description", content: "Welcome to Remix Lofi!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: Routes.Dashboard,
  });

  return {};
}

export default function Index() {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 p-4 md:p-8 items-center justify-center">
      <img
        alt="logo"
        className="h-full w-full md:max-h-[1080px] md:max-w-4xl object-contain"
        src="/image.png"
      />
      <h1 className="text-sky-400 text-2xl font-bold">Remix Lofi Stack</h1>

      <div className="flex items-center gap-2">
        <Link
          to={Routes.Login}
          className="text-white bg-sky-400 px-4 py-2 rounded-md"
        >
          Login
        </Link>

        <Link
          to={Routes.Signup}
          className="text-white bg-sky-400 px-4 py-2 rounded-md"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
