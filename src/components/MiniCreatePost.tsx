"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ImageIcon, Link2 } from "lucide-react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({
  session,
}: MiniCreatePostProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-3 sm:px-6 py-4 flex justify-between flex-col sm:flex-row gap-6">
        <div className="relative w-fit">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
            className="w-10 h-10 block"
          />

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>
        <div className="flex flex-1 gap-1 sm:gap-5">
          <Input
            readOnly
            onClick={() => router.push(pathname + "/submit")}
            placeholder="Создать пост"
          />

          <Button
            variant="ghost"
            onClick={() => router.push(pathname + "/submit")}
            className="py-1 px-2"
          >
            <ImageIcon className="text-zinc-600" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push(pathname + "/submit")}
            className="py-1 px-2"
          >
            <Link2 className="text-zinc-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniCreatePost;
