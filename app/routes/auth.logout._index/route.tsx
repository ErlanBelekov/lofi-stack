import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Routes } from "~/lib";
import { authenticator } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.logout(request, { redirectTo: Routes.Home });
}
