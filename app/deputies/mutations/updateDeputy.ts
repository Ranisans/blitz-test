import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateDeputyInput = Pick<Prisma.DeputyUpdateArgs, "where" | "data">;

export default async function updateDeputy({ where, data }: UpdateDeputyInput, ctx: Ctx) {
  ctx.session.authorize();

  const deputy = await db.deputy.update({ where, data });

  return deputy;
}
