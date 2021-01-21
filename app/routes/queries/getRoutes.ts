import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetRoutesInput = Pick<Prisma.FindManyRouteArgs, "where" | "orderBy" | "skip" | "take">;

export default async function getRoutes(
  { where, orderBy, skip = 0, take }: GetRoutesInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const routes = await db.route.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.route.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    routes,
    nextPage,
    hasMore,
    count,
  };
}
