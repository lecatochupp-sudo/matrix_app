"use server";

import { prisma } from "@/lib/prisma";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "Email и пароль обязательны" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "Пользователь с таким email уже существует" };
    }

    // В продакшене нужно хешировать пароль через bcrypt!
    // Сейчас для теста записываем как есть
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      }
    });

    return { success: true };
  } catch (e) {
    return { error: "Ошибка при регистрации" };
  }
}
