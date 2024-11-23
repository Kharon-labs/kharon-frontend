"use client";

import { Button } from "@/components/ui/button";
import { FaXTwitter, FaFacebookF, FaGoogle } from "react-icons/fa6";

export function SocialAuth() {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 border-[#2a3543]"
      >
        <FaXTwitter className="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 border-[#2a3543]"
      >
        <FaFacebookF className="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 border-[#2a3543]"
      >
        <FaGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
}
