import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Subcription from "./Subcription";

const Subscribes = async () => {
  const session = await getAuthSession();
  const subscriptions = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
    take: 4,
  });

  return (
    <div className="h-full">
      <h2 className="mb-2">Подписки</h2>
      {!session?.user.id ? (
        <div className="text-lg text-center">Вы не авторизованы</div>
      ) : (
        <div className="grid grid-rows-4 h-4/5">
          {subscriptions.length ? (
            <>
              {subscriptions.map((subscription) => {
                {/* @ts-expect-error server component */}
                return ( <Subcription
                    key={subscription.subredditId}
                    subredditId={subscription.subredditId}
                    slug={subscription.subreddit.name}
                    creatorId={subscription.subreddit.creatorId}
                  />
                );
              })}
            </>
          ) : (
            <p className="text-center">Вы ни на что не подписаны.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Subscribes;
