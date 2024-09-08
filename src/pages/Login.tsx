import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center bg-background items-center h-screen">
            <button className="absolute top-10 left-10 bg-text rounded-full aspect-square" onClick={() => {
                navigate("/");
            }}>
                <ArrowLeft className="w-24 " />
            </button>
            <Card className="mx-auto w-[400px] my-auto bg-text">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                className="bg-text"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link to="/" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required                                  className="bg-text"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-background text-text">
                            Login
                        </Button>
                        <Button className="w-full bg-text text-background">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
