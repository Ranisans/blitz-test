import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteDeputyInput = Pick<Prisma.DeputyDeleteArgs, "where">;

export default async function deleteDeputy({ where }: DeleteDeputyInput, ctx: Ctx) {
  ctx.session.authorize();

  const deputy = await db.deputy.delete({ where });

  return deputy;
}
