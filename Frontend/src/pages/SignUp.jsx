
import { SingUpform } from "@/components/SingUp-form"

export default function SingUp() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://th.bing.com/th/id/OIP.bOMuhdIwY-EKNvv-E_HJ1gHaDL?w=350&h=150&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          alt="Image"
          className="absolute inset-0 h-full w-full object-fit p-10  dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SingUpform />
          </div>
        </div>
      </div>
    </div>
  )
}
