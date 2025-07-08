import { SignUp, useUser } from "@clerk/clerk-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

const SignUpComponent = () => {
  const { user } = useUser();
  const [searchParams] = useSearchParams();

  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("id");
  const signInUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=false`
    : "/login";

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
        {/* Left side*/}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start bg-[#d12d2d] text-white p-8 md:p-16">
            <h2 className="text-3xl font-bold mb-4">Join the Arm2Arm Community</h2>
            <p className="mb-6 max-w-md text-base">
                Create an account and start your journey of saving lives through blood donation.
            </p>

            <div className="space-y-4 text-base">
                <div className="flex items-start">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-red-600 font-semibold mr-3">1</div>
                <p>Sign up and verify your profile</p>
                </div>
                <div className="flex items-start">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-red-600 font-semibold mr-3">2</div>
                <p>Find blood donors or become one</p>
                </div>
                <div className="flex items-start">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-red-600 font-semibold mr-3">3</div>
                <p>Save lives and earn rewards</p>
            </div>
        </div>
        </div>

      {/* Right side */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-6">
            <SignUp
            appearance={{
                elements: {
                formButtonPrimary:
                    "bg-red-500 !bg-red-500 text-white border-none px-4 py-3 rounded-md cursor-pointer hover:bg-red-600 transition",
                rootBox: "w-full max-w-sm mx-auto",
                },
            }}
            signInUrl={signInUrl}
            forceRedirectUrl={getRedirectUrl()}
            routing="hash"
            afterSignOutUrl="/"
            />
        </div>
    </div>
  );
};

export default SignUpComponent;