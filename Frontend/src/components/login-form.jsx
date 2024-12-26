import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export function LoginForm({ className, ...props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we log you in',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const resp = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('role', resp.data.role);

      Swal.fire({
        title: 'Success!',
        text: 'You are logged in successfully!',
        icon: 'success',
      });

      if (resp.data.role === 'GuestAdmin') {
        navigate("/guest-Dashbord");
      } else if (resp.data.role === 'MainAdmin') {
        navigate("/Dashboard");
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'You are not an authenticated user.',
          icon: 'error',
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'There was an error logging into your account. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          ----------------------------------------------
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="your name"
            placeholder="abc123@gmail.com"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Enter your username"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="your password ****"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
