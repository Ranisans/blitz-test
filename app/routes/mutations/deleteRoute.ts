import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteRouteInput = Pick<Prisma.RouteDeleteArgs, "where">;

export default async function deleteRoute({ where }: DeleteRouteInput, ctx: Ctx) {
  ctx.session.authorize();

  const route = await db.route.delete({ where });

  return route;
}
