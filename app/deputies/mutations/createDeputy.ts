import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateDeputyInput = Pick<Prisma.DeputyCreateArgs, "data">;
export default async function createDeputy({ data }: CreateDeputyInput, ctx: Ctx) {
  ctx.session.authorize();

  const deputy = await db.deputy.create({ data });

  return deputy;
}
