import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetDeputyInput = Pick<Prisma.FindFirstDeputyArgs, "where">;

export default async function getDeputy({ where }: GetDeputyInput, ctx: Ctx) {
  ctx.session.authorize();

  const deputy = await db.deputy.findFirst({ where });

  if (!deputy) throw new NotFoundError();

  return deputy;
}
