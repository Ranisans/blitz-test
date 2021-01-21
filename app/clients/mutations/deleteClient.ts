import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteClientInput = Pick<Prisma.ClientDeleteArgs, "where">;

export default async function deleteClient({ where }: DeleteClientInput, ctx: Ctx) {
  ctx.session.authorize();

  const client = await db.client.delete({ where });

  return client;
}
