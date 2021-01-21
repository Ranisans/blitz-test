import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetChiefsInput = Pick<Prisma.FindManyChiefArgs, "where" | "orderBy" | "skip" | "take">;

export default async function getChiefs(
  { where, orderBy, skip = 0, take }: GetChiefsInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const chiefs = await db.chief.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.chief.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    chiefs,
    nextPage,
    hasMore,
    count,
  };
}
