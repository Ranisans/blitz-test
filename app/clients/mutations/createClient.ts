import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateClientInput = Pick<Prisma.ClientCreateArgs, "data">;
export default async function createClient({ data }: CreateClientInput, ctx: Ctx) {
  ctx.session.authorize();

  const client = await db.client.create({ data });

  return client;
}
