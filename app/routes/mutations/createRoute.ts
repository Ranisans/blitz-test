import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateRouteInput = Pick<Prisma.RouteCreateArgs, "data">;
export default async function createRoute({ data }: CreateRouteInput, ctx: Ctx) {
  ctx.session.authorize();

  const route = await db.route.create({ data });

  return route;
}
