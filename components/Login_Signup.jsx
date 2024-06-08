import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RegisterForm from "./RegisterUser";

function Login_Signup() {
  return (
    <Sheet>
      <SheetTrigger><div className="border-2 border-gray-600 dark:border-gray-200 text-gray-200 font-medium bg-blue-400 dark:bg-gray-800 rounded-md p-2">Login/SignUp</div></SheetTrigger>
      <SheetContent>
        <SheetHeader className={"dark:text-slate-400"}>
          <SheetTitle>Login/SignUp!</SheetTitle>
          <SheetDescription>
            <RegisterForm />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default Login_Signup;
