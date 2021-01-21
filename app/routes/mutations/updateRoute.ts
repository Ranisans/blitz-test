import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateRouteInput = Pick<Prisma.RouteUpdateArgs, "where" | "data">;

export default async function updateRoute({ where, data }: UpdateRouteInput, ctx: Ctx) {
  ctx.session.authorize();

  const route = await db.route.update({ where, data });

  return route;
}
