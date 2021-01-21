import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetMainObjectsInput = Pick<
  Prisma.FindManyMainObjectArgs,
  "where" | "orderBy" | "skip" | "take"
>;

export default async function getMainObjects(
  { where, orderBy, skip = 0, take }: GetMainObjectsInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const mainObjects = await db.mainObject.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.mainObject.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    mainObjects,
    nextPage,
    hasMore,
    count,
  };
}
