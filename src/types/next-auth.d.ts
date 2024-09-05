import "next-auth";

declare module "next-auth" {
  interface user {
    id?: string;
    role: string;
    name: string;
    email: string;
  }
  interface session {
    user: {
      id?: string;
      role: string;
      name: string;
      email: string;
    };
  }
}
