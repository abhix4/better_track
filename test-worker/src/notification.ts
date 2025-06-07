import { Context } from "hono";
import {getPrisma } from "./db";

export async function getNotification(c: Context) {
    const prisma = getPrisma(c.env.DATABASE_URL!);
    try {
        const { username } = await c.req.json();
        const notifications = await prisma.notification.findMany({
            where: {
                user: {
                    some: {
                        username: username
                    }
                }
            }
        });
        return c.json(notifications, 200);
    } catch (error) {
        return c.json({ error: String(error) }, 500);
    }
}

export async function getLatestNotification(c: Context) {
      const prisma = getPrisma(c.env.DATABASE_URL!);
    try {
        const { username, lastNotificationId } = await c.req.json();
        const notifications = await prisma.notification.findMany({
            where: {
                user: {
                    some: {
                        username: username
                    }
                }
            }
        });

        const newNotification = notifications.filter((notification: any) => notification.id > lastNotificationId);
        return c.json(newNotification, 200);
    } catch (error) {
        return c.json({ error: String(error) }, 500);
    }
}