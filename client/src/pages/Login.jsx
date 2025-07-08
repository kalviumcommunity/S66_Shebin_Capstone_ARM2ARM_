import { SignIn, useUser } from "@clerk/clerk-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

const Login = () => {
    const { user } = useUser();
    const [searchParams] = useSearchParams();
    const isCheckoutPage = searchParams.get("showSignUp") !== null;
    const courseId = searchParams.get("id");
    // const signUpUrl=isCheckoutPage ? `/checkout?step=1&id=${courseId}&showSignUp=true`:"/signUp" 

    const getRedirectUrl = () => {
        if (isCheckoutPage) {
            return `/checkout?step=2&id=${courseId}`;
        }

        const userType = user?.publicMetadata?.userType;
        if (userType === "donor") return "/findBlood";
        if (userType === "admin") return "/admin";
        return "/profile";
    };

    return (
        <div className="flex h-screen w-screen">
            {/* Left side with welcome message */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start bg-[#d12d2d] text-white p-8 md:p-16">
                <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back to Arm2Arm</h2>
                <p className="mb-6 text-center max-w-md">
                Continue your journey of saving lives through blood donation. Your generosity makes a difference.
                </p>
                <div className="bg-red-500 bg-opacity-20 p-4 rounded-lg text-sm text-white max-w-md">
                <p className="italic">
                    "The blood you donate gives someone another chance at life. One day that someone may be a close relative, a friend, a loved one—or even you."
                </p>
                <p className="mt-2 font-semibold">– World Health Organization</p>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <SignIn
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-red-500 !bg-red-500 text-white border-none px-4 py-3 rounded-md cursor-pointer",
                            rootBox: "w-full max-w-md"
                        }
                    }}
                    signUpUrl="/signUp"
                    forceRedirectUrl={getRedirectUrl()}
                    routing="hash"
                    afterSignOutUrl="/"
                />
            </div>
        </div>
    );
};

export default Login;
