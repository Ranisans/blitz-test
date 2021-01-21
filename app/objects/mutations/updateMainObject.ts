import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateMainObjectInput = Pick<Prisma.MainObjectUpdateArgs, "where" | "data">;

export default async function updateMainObject({ where, data }: UpdateMainObjectInput, ctx: Ctx) {
  ctx.session.authorize();

  const mainObject = await db.mainObject.update({ where, data });

  return mainObject;
}
