import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetMainObjectInput = Pick<Prisma.FindFirstMainObjectArgs, "where">;

export default async function getMainObject({ where }: GetMainObjectInput, ctx: Ctx) {
  ctx.session.authorize();

  const mainObject = await db.mainObject.findFirst({ where });

  if (!mainObject) throw new NotFoundError();

  return mainObject;
}
