import { auth } from "./app/_libs/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
