import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
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
        src="https://private-user-images.githubusercontent.com/36839981/323814868-53830026-2d0c-432f-b48e-cd9e1fd657c9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTM0OTU2NzIsIm5iZiI6MTcxMzQ5NTM3MiwicGF0aCI6Ii8zNjgzOTk4MS8zMjM4MTQ4NjgtNTM4MzAwMjYtMmQwYy00MzJmLWI0OGUtY2Q5ZTFmZDY1N2M5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDE5VDAyNTYxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWRlZWIzYjQ5ZWQ1NzllODMyYzg1NWI0NjVmNWFhNDhhZDNhNjM1OWM4YTA1ZTEzOGQ5NWExMzEwMjFkN2VjNzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.AuEf29mnZef04EJVQ4x2k16xgM3gAFsogW_mHPsqwJc"
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
