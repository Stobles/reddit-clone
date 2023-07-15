import Subscribes from "@/components/Subscribes";
import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      {session?.user ? <h1 className="font-bold text-3xl md:text-4xl">Ваши подписки</h1> : <h1 className="font-bold text-3xl md:text-4xl">Записи</h1>}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-y-4 md:gap-x-4 py-6">
        {/* @ts-expect-error server component */}
        {session?.user ? <CustomFeed /> : <GeneralFeed />}

        {/* Subreddit info */}
        <div className="overflow-hidden col-start-3 row-start-1 h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="w-4 h-4" />
              Home
            </p>
          </div>
          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Ваша персональная страничка Breadit. Просматривайте записи ваших любимых сообществ
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href="/r/create"
            >
              Создать сообщество
            </Link>
          </div>
        </div>
        
        <div className="rounded-lg col-start-3 row-start-2 bg-white p-6">
          {/* @ts-expect-error server component */}
          <Subscribes />
        </div>
        
      </div>
    </>
  );
}
