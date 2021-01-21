import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetChiefInput = Pick<Prisma.FindFirstChiefArgs, "where">;

export default async function getChief({ where }: GetChiefInput, ctx: Ctx) {
  ctx.session.authorize();

  const chief = await db.chief.findFirst({ where });

  if (!chief) throw new NotFoundError();

  return chief;
}
