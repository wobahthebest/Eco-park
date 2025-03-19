"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <img
          src={user.imageUrl}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto border-4 border-gray-200"
        />

        <h2 className="text-xl font-semibold mt-4">{user.fullName}</h2>
        <p className="text-gray-500">
          {user.primaryEmailAddress?.emailAddress}
        </p>

        <SignOutButton>
          <Button className="mt-6 w-full bg-red-500 hover:bg-red-600">
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default ProfilePage;
