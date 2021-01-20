import { Ctx } from "blitz";
import db from "db";

interface IGetUser {
  id: number;
  name: string;
  roleId: number;
}

export default async function getCurrentUser(_ = null, { session }: Ctx): Promise<IGetUser | null> {
  if (!session.userId) return null;

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      roleId: true,
    },
  });

  return user as IGetUser | null;
}
