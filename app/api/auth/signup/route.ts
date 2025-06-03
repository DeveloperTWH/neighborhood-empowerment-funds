import { connectToDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await connectToDB();
    console.log("connection sucessfull")

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already in use" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, hashedPassword });

    return new Response(JSON.stringify({ message: "User created", user: newUser }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Signup failed", error: err }), { status: 500 });
  }
}
