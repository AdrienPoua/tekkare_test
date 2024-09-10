import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {/* Back Button */}
      <button
        className="absolute top-10 left-10 bg-background rounded-full p-3 shadow hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-6 h-6 text-text" />
      </button>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-background p-6 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">Login</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@domain.com"
                required
                className="mt-1 w-full"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link to="/forgot-password" className="text-sm text-primary underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="mt-1 w-full"
              />
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full bg-primary text-background hover:bg-primary-dark">
              Login
            </Button>

            {/* Google Login */}
            <Button className="w-full bg-muted text-text hover:bg-muted-dark">
              Login with Google
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-primary underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
