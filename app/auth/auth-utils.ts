import { SecurePassword, AuthenticationError } from "blitz";
import db from "db";

// eslint-disable-next-line import/prefer-default-export
export const authenticateUser = async (login: string, password: string) => {
  const user = await db.user.findFirst({ where: { login } });
  if (!user) throw new AuthenticationError();

  const result = await SecurePassword.verify(user.hashedPassword, password);

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password);
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } });
  }
  const { hashedPassword, ...rest } = user;
  return rest;
};
