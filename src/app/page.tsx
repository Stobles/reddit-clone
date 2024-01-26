import Subscribes from "@/components/Subscribes";
import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      {session?.user ? (
        <h1 className="font-bold text-3xl md:text-4xl">Ваши подписки</h1>
      ) : (
        <h1 className="font-bold text-3xl md:text-4xl">Записи</h1>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-y-4 lg:gap-x-4 py-6">
        
          {session?.user ? (
            <div className="grid col-start-1 col-end-3 lg:row-start-1 row-end-4">
              <Suspense fallback={<div>Загрузка...</div>}>
                {/* @ts-expect-error server component */}
                <CustomFeed />
              </Suspense>
            </div>  
          ) : (
            <div className="grid col-start-1 col-end-3 lg:row-start-1 row-end-4">
              <Suspense fallback={<div>Загрузка...</div>}>
                {/* @ts-expect-error server component */}
                <GeneralFeed />
              </Suspense>
            </div>
          )}
        

        {/* Subreddit info */}
        <div className="hidden lg:block overflow-hidden col-start-3 h-full rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="w-4 h-4" />
              Home
            </p>
          </div>
          <div className="-my-3 h-full divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Ваша персональная страничка Breadit. Просматривайте записи ваших
                любимых сообществ
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

        <div className="rounded-lg lg:col-start-3 row-start-1 lg:row-start-2 bg-white p-6">
          {/* @ts-expect-error server component */}
          <Subscribes />
        </div>
      </div>
    </>
  );
}
