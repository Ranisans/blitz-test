import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteChiefInput = Pick<Prisma.ChiefDeleteArgs, "where">;

export default async function deleteChief({ where }: DeleteChiefInput, ctx: Ctx) {
  ctx.session.authorize();

  const chief = await db.chief.delete({ where });

  return chief;
}
