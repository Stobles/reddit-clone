"use client";

import { UserAuthRequest, UserAuthValidator } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { authVariants } from "@/lib/consts";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface SignFormProps {
  variant: String;
}

const SignForm: FC<SignFormProps> = ({ variant }) => {
  const router = useRouter();
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const form = useForm<UserAuthRequest>({
    resolver: zodResolver(UserAuthValidator),
    defaultValues:
      variant === authVariants.REGISTER
        ? {
            username: "",
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
          },
  });

  const { mutate: createUser, isLoading: isRegisterLoading } = useMutation({
    mutationFn: async ({ username, email, password }: UserAuthRequest) => {
      const payload: UserAuthRequest = { username, email, password };

      const { data } = await axios.post("/api/auth/register", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: "Пользователь с таким никнеймом или почтой уже существует",
            description: "Введите другие данные или войдите в аккаунт.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Неизвестная ошибка",
          description: "Произошла ошибка. Попробуйте еще раз",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Успех",
        description: "Аккаунт успешно создан.",
      });
      router.push("/sign-in");
    },
  });

  const onSubmit = async (data: UserAuthRequest) => {
    if (variant === authVariants.REGISTER) {
      createUser(data);
    }

    if (variant === authVariants.LOGIN) {
      setIsLoginLoading(true);
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              title: "Ошибка",
              description: "Были введены неверные данные",
              variant: "destructive",
            });
          }
          if (callback?.ok && !callback?.error) {
            router.push("/");
            toast({
              title: "Вы успешно вошли",
            });
          }
        })
        .finally(() => {
          setIsLoginLoading(false);
        });
    }
  };

  return (
    <div className="space-y-4 py-2 pb-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((e) => onSubmit(e))}>
          {variant === authVariants.REGISTER ? (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">
                    Имя пользователя
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={
                        variant === authVariants.REGISTER
                          ? isRegisterLoading
                          : isLoginLoading
                      }
                      type="text"
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                      placeholder="Имя пользователя"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm">E-mail</FormLabel>
                <FormControl>
                  <Input
                    disabled={
                      variant === authVariants.REGISTER
                        ? isRegisterLoading
                        : isLoginLoading
                    }
                    type="email"
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    placeholder="E-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm">Пароль</FormLabel>
                <FormControl>
                  <Input
                    disabled={
                      variant === authVariants.REGISTER
                        ? isRegisterLoading
                        : isLoginLoading
                    }
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    placeholder="Пароль"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              isLoading={
                variant === authVariants.REGISTER
                  ? isRegisterLoading
                  : isLoginLoading
              }
              className="w-full"
              type="submit"
            >
              {variant === authVariants.REGISTER
                ? "Зарегистрироваться"
                : "Войти"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignForm;
