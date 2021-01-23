import { Ctx } from "blitz";
import db, { Prisma } from "db";
import { IObject } from "../constants";

type GetMainObjectsInput = Pick<Prisma.FindManyMainObjectArgs, "where" | "orderBy">;

export default async function getMainObjects(
  { where, orderBy }: GetMainObjectsInput,
  ctx: Ctx
): Promise<IObject[]> {
  ctx.session.authorize();

  const mainObjects = await db.mainObject.findMany({
    where,
    orderBy,
    include: {
      client: { select: { name: true } },
      chief: { select: { name: true } },
      deputy: { select: { name: true } },
      route: { select: { name: true } },
      company: { select: { name: true } },
    },
  });

  return ((mainObjects as unknown) as IObject[]) || [];
}
