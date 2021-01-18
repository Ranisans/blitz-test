import { Ctx } from "blitz";

export default async function logout(_: any, { session }: Ctx): Promise<void> {
  await session.revoke();
}
