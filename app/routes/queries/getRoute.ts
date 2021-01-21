import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetRouteInput = Pick<Prisma.FindFirstRouteArgs, "where">;

export default async function getRoute({ where }: GetRouteInput, ctx: Ctx) {
  ctx.session.authorize();

  const route = await db.route.findFirst({ where });

  if (!route) throw new NotFoundError();

  return route;
}
