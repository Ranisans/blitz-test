import { SecurePassword } from "blitz";
import db from "./index";

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const role = ["Administrator", "DutyOfficer", "Assistant", "User"];

const seed = async (): Promise<void> => {
  const { ADMIN_NAME, ADMIN_LOGIN, ADMIN_PASSWORD } = process.env;

  if (ADMIN_NAME === undefined || ADMIN_LOGIN === undefined || ADMIN_PASSWORD === undefined)
    throw new Error();

  for (let i = 0; i < role.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await db.role.create({ data: { name: role[i] } });
  }

  const hashedPassword = await SecurePassword.hash(ADMIN_PASSWORD);
  const adminRole = await db.role.findFirst({ where: { name: role[0] } });

  if (!adminRole) throw new Error();

  await db.user.create({
    data: {
      login: ADMIN_LOGIN,
      name: ADMIN_NAME,
      hashedPassword,
      role: { connect: { id: adminRole.id } },
    },
  });
};

export default seed;
