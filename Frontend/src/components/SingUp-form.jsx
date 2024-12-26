import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom";

export function SingUpform() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show SweetAlert loading spinner
    Swal.fire({
      title: 'Signing up...',
      text: 'Please wait while we create your account',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Show the loading spinner
      },
    });

    try {
      const resp = await axios.post(`${BASE_URL}/api/auth/signup`, {
        username,
        password,
        role: role,
      });

     
      Swal.fire({
        title: 'Success!',
        text: 'Your account has been created successfully!',
        icon: 'success',
      });

      navigate("/")
    } catch (error) {
      console.error(error);

      // Show error message
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating your account. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <form className={("flex flex-col gap-6")} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {/* Enter your email below to login to your account */}
          ----------------------------------------
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="your name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="enter your password ****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="" disabled>Select role</option>
            <option value="MainAdmin">Admin</option>
            <option value="GuestAdmin">GuestAdmin</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
