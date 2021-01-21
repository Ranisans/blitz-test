import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateChiefInput = Pick<Prisma.ChiefCreateArgs, "data">;
export default async function createChief({ data }: CreateChiefInput, ctx: Ctx) {
  ctx.session.authorize();

  const chief = await db.chief.create({ data });

  return chief;
}
