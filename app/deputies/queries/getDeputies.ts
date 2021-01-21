import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetDeputiesInput = Pick<Prisma.FindManyDeputyArgs, "where" | "orderBy" | "skip" | "take">;

export default async function getDeputies(
  { where, orderBy, skip = 0, take }: GetDeputiesInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const deputies = await db.deputy.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.deputy.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    deputies,
    nextPage,
    hasMore,
    count,
  };
}
