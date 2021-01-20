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
  for (let i = 0; i < role.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await db.role.create({ data: { name: role[i] } });
  }
};

export default seed;
