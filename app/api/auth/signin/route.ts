import { connectToDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectToDB();
    console.log("connection sucessfull")
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid password" }), { status: 401 });
    }

    // You could generate a JWT here if needed
    return new Response(JSON.stringify({ message: "Login successful", user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Login error", error }), { status: 500 });
  }
}
