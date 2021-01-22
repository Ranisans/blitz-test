import { Ctx } from "blitz";
import db, { Prisma } from "db";
import { IObject } from "../constants";

type GetMainObjectsInput = Pick<Prisma.FindManyMainObjectArgs, "where" | "orderBy">;

export default async function getMainObjects(
  { where, orderBy }: GetMainObjectsInput,
  ctx: Ctx
): Promise<IObject[] | null> {
  ctx.session.authorize();

  const mainObjects = await db.mainObject.findMany({
    where,
    orderBy,
    select: {
      number: true,
      title: true,
      address: true,
      telephones: true,
      mode: true,
      signal: true,
      gps: true,
      typeCheck: true,
      dayMode: true,
      daytimeMode: true,
      nightMode: true,
      opened: true,
    },
    include: {
      client: { select: { name: true } },
      chief: { select: { name: true } },
      deputy: { select: { name: true } },
      route: { select: { name: true } },
      company: { select: { name: true } },
    },
  });

  return mainObjects ? ((mainObjects as unknown) as IObject[]) : null;
}
