import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteMainObjectInput = Pick<Prisma.MainObjectDeleteArgs, "where">;

export default async function deleteMainObject({ where }: DeleteMainObjectInput, ctx: Ctx) {
  ctx.session.authorize();

  const mainObject = await db.mainObject.delete({ where });

  return mainObject;
}
