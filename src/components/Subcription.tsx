import SubscribeLeaveToggle from "./SubscribeLeaveToggle";
import Link from "next/link";
import { Users } from "lucide-react";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

interface SubcriptionProps {
  creatorId: string | null;
  subredditId: string;
  slug: string;
}

const Subcription = async ({
  subredditId,
  slug,
  creatorId,
}: SubcriptionProps) => {
  const session = await getAuthSession();
  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4" />
        <Link className="w-[100px] truncate" href={`/r/${slug}`}>
          r/{slug}
        </Link>
      </div>
      {session?.user.id === creatorId ? (
        <div className="max-w-[135px] w-full whitespace-nowrap truncate">
          Вы создатель.
        </div>
      ) : (
        <div>
          <SubscribeLeaveToggle
            subredditId={subredditId}
            subredditName={slug}
            isSubscribed={isSubscribed}
          />
        </div>
      )}
    </div>
  );
};

export default Subcription;
