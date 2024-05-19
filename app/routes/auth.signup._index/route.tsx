import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form, Link, useActionData } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import { Routes } from "~/lib";
import { StrategyName, authenticator } from "~/lib/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate(StrategyName.SignUp, request, {
      successRedirect: Routes.Dashboard,
      throwOnError: true,
    });
  } catch (error) {
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      // here the error is related to the authentication process
      return { message: error.message };
    }
    // here the error is a generic error that another reason may throw
    return { message: "Unknown error." };
  }
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Form method="POST" className="flex flex-col gap-2 max-w-5xl">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          className="border border-black border-solid"
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          className="border border-black border-solid"
        />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          name="confirmPassword"
          type="password"
          className="border border-black border-solid"
        />

        <button
          type="submit"
          className="text-white bg-sky-400 px-4 py-2 rounded-md"
        >
          Signup
        </button>
        {actionData &&
        typeof actionData === "object" &&
        "message" in actionData ? (
          <p className="text-red-500">
            Error: {actionData.message as unknown as string}
          </p>
        ) : (
          <></>
        )}

        <Link to={Routes.Login} className="text-sky-400 text-center">
          Login
        </Link>
      </Form>
    </div>
  );
}
