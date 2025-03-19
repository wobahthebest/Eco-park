import { DropdownMenuCheckboxes } from "./DropDown";

import { currentUser } from "@clerk/nextjs/server";
import {
  FaFacebook,
  FaPinterest,
  FaTwitter,
  FaReddit,
  FaYoutube,
} from "react-icons/fa";
import ModeToggle from "./ModeToggle";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

async function Navbar() {
  const user = await currentUser();
  // if (user) await

  return (
    <div className="max-w-7xl mx-auto px-4 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] ">
      <div className="flex items-center justify-between h-14">
        <h1 className="font-semibold text-[hsl(var(--foreground))]">
          Welcome to Eco Store
        </h1>

        <div className="flex space-x-3">
          <div className="flex items-center space-x-2 px-3 border-r border-[hsl(var(--border))]">
            <p className="text-[hsl(var(--muted-foreground))]">Follow us:</p>
            <FaTwitter className="hover:text-[hsl(var(--border))] transition" />
            <FaFacebook className="hover:text-[hsl(var(--border))] transition" />
            <FaPinterest className="hover:text-[hsl(var(--border))] transition" />
            <FaReddit className="hover:text-[hsl(var(--border))] transition" />
            <FaYoutube className="hover:text-[hsl(var(--border))] transition" />
          </div>

          <ModeToggle />
          <DropdownMenuCheckboxes />

          <div className="flex items-center space-x-4">
            {user ? (
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start w-full text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition"
                >
                  <LogOutIcon className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Logout
                </Button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="default"
                  className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/90)]"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
