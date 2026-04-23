import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function initiateOrder(tariffCode: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const tariff = await prisma.tariff.findUnique({ where: { code: tariffCode } });
    if (!tariff) throw new Error("Tariff not found");

    // Создаем реальный заказ в базе
    const order = await prisma.order.create({
        data: {
            userId: (session.user as any).id,
            tariffId: tariff.id,
            amount: tariff.price,
            status: "paid", // В режиме MOCK сразу ставим PAID
            provider: "mock",
        }
    });

    return order;
}

export async function getUserCalculations() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return [];

    return await prisma.calculation.findMany({
        where: { userId: (session.user as any).id },
        orderBy: { createdAt: 'desc' }
    });
}
