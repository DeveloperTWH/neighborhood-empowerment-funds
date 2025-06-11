import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RedirectByRolePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const role = session.user.role;

  if (role === "admin") redirect("/admin/dashboard");
  else redirect("/dashboard");

  return null;
}
