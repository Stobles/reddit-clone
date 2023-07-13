import { z } from "zod";
import { UserAuthValidator } from "@/lib/validators/auth";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } = UserAuthValidator.parse(body);

    const hashedPassword = await bcrypt.hash(password, 12);

    const isUserExist = await db.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    if(isUserExist) {
      return new NextResponse('Такой пользователь уже существует', { status: 409 })
    }

    const user = await db.user.create({
      data: {
        name: username,
        username,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data", { status: 422 });
    }

    return new Response("Мы не смогли вас зарегистрировать. Попробуйте еще раз.", { status: 500 });
  }
}
