import { useQuery } from "blitz";
import getCurrentUser from "app/users/queries/getCurrentUser";

// eslint-disable-next-line import/prefer-default-export
export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null);
  return user;
};
