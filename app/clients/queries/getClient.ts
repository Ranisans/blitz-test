import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetClientInput = Pick<Prisma.FindFirstClientArgs, "where">;

export default async function getClient({ where }: GetClientInput, ctx: Ctx) {
  ctx.session.authorize();

  const client = await db.client.findFirst({ where });

  if (!client) throw new NotFoundError();

  return client;
}
