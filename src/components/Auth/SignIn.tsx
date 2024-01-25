"use client";

import Link from "next/link";
import { Icons } from "../Icons";
import UserAuthGoogleForm from "./UserAuthGoogleForm";
import SignForm from "./SignForm";
import { authVariants } from "@/lib/consts";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Добро пожаловать
        </h1>
        <p className="text-xs max-w-xs mx-auto">
          Продолжая, вы создаете аккаунт на Breadit и соглашаетесь с нашим
          пользовательским соглашением и политикой конфиденциальности.
        </p>
        <SignForm variant={authVariants.LOGIN} />

        <UserAuthGoogleForm />

        <p className="sm:px-8 text-center text-sm text-zinc-700">
          Нет аккаунта?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline-offset-4"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
