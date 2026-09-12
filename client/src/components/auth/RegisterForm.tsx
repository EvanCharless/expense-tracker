import { Link } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="flex flex-col gap-4 w-full max-w-sm mx-auto">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Your name" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <Button type="submit">Register</Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
