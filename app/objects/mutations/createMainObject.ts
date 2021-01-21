import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateMainObjectInput = Pick<Prisma.MainObjectCreateArgs, "data">;
export default async function createMainObject({ data }: CreateMainObjectInput, ctx: Ctx) {
  ctx.session.authorize();

  const mainObject = await db.mainObject.create({ data });

  return mainObject;
}
