import { SignUp } from "@clerk/clerk-react";
import React from "react";

const Register = () => {
    return (
        <SignUp
            appearance={{
                elements: {
                    formButtonPrimary: "bg-red-500 !bg-red-500 text-white border-none px-4 py-3 rounded-md cursor-pointer"
                }
            }}
        />
    );
};

export default Register;
