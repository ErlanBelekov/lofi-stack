import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { InferSelectModel, eq } from "drizzle-orm";

import { sessionStorage } from "./session.server";
import { db, users } from "~/drizzle";
import { z } from "zod";

// don't expose the password to user browser
type User = Omit<InferSelectModel<typeof users>, "password">;

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

export enum StrategyName {
  Login = "Login",
  SignUp = "SignUp",
}

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const dataParseResult = LoginFormSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });

    if (!dataParseResult.success) {
      throw new Error(dataParseResult.error.issues[0].message);
    }

    const userInDb = await db
      .select()
      .from(users)
      .where(eq(users.email, dataParseResult.data.email));

    if (!userInDb.length) {
      throw new Error("User doesn't exist.");
    }

    if (userInDb[0].password !== dataParseResult.data.password) {
      throw new Error("User doesn't exist.");
    }

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return {
      id: userInDb[0].id,
      email: userInDb[0].email,
    };
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  StrategyName.Login
);

const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const dataParseResult = SignupFormSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    });

    if (!dataParseResult.success) {
      throw new Error(dataParseResult.error.issues[0].message);
    }

    if (
      dataParseResult.data.password !== dataParseResult.data.confirmPassword
    ) {
      throw new Error("Passwords don't match.");
    }

    const userInDb = await db
      .select()
      .from(users)
      .where(eq(users.email, dataParseResult.data.email));

    if (userInDb.length) {
      throw new Error("Email is taken.");
    }

    await db.insert(users).values({
      email: dataParseResult.data.email,
      password: dataParseResult.data.password,
    });

    const user = await db.query.users.findFirst({
      where: eq(users.email, dataParseResult.data.email),
    });

    // DB inconcistency issue
    if (!user) {
      throw new Error("Internal error.");
    }

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return {
      id: user.id,
      email: user.email,
    };
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  StrategyName.SignUp
);
