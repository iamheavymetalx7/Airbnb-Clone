import { fetchProfileImage } from "@/utils/actions";
import Image from "next/image";
import React from "react";
import { LuUser2 } from "react-icons/lu";

async function UserIcon() {
  const profileImage = await fetchProfileImage();
  if (profileImage) {
    return (
      <Image
        src={profileImage}
        className="w-6 h-6 object-cover rounded-full"
        alt={"human image"}
      ></Image>
    );
  }
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
