import { USER_KEY } from '~/constants';
import type { User } from '~/types';

export const useAuthUser = () => {
  const userCookie = useCookie(USER_KEY);
  return computed<User>(() => {
    if (!userCookie.value) return null;
    return typeof userCookie.value === 'string'
      ? JSON.parse(userCookie.value)
      : userCookie.value;
  });
};
