import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Navbar from "@/components/Navbar"

export default function LoginPage() {
  return (
    <>
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://th.bing.com/th/id/OIP.cqkfsMTyIrLfFru1LNGM3gHaFj?w=4000&h=3001&rs=1&pid=ImgDetMain"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover p-10 dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </>
  )
}
