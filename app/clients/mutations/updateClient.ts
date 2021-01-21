import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateClientInput = Pick<Prisma.ClientUpdateArgs, "where" | "data">;

export default async function updateClient({ where, data }: UpdateClientInput, ctx: Ctx) {
  ctx.session.authorize();

  const client = await db.client.update({ where, data });

  return client;
}
