import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateChiefInput = Pick<Prisma.ChiefUpdateArgs, "where" | "data">;

export default async function updateChief({ where, data }: UpdateChiefInput, ctx: Ctx) {
  ctx.session.authorize();

  const chief = await db.chief.update({ where, data });

  return chief;
}
