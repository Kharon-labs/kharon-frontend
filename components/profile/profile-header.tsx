"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
      <div className="flex items-center gap-8">
        <Avatar className="w-24 h-24 border-2 border-[#1A1A1A]">
          <AvatarImage src="/header-image.png" alt="User" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <div className="space-y-2.5">
          <h1 className="text-3xl font-semibold text-white font-inriaSans">
            Olorunfemi Samuel
          </h1>
          <p className="text-gray-400 text-lg font-poppins">
            Olorunfemisamuel01@Gmail.Com
          </p>
          <p className="text-gray-400 font-mono font-poppins">0x1234...5678</p>
        </div>
      </div>
      <Button className="mt-4 md:mt-0 bg-black border border-gray-800 text-white hover:bg-[#1A1A1A] px-6 rounded-xl">
        <Pencil className="w-4 h-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
}
