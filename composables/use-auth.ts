import { SESSION_KEY, TOKEN_KEY } from '~/constants';

export const useAuth = () => {
  const config = useRuntimeConfig();

  const cookieSession = useCookie(SESSION_KEY);
  const token = useCookie(TOKEN_KEY);

  function setAuthSession(session: any) {
    cookieSession.value = session;
    token.value = session.accessToken;
  }

  async function signIn(email: string, password: string) {
    try {
      const req: any = await $fetch(
        `${config.public.authApi}/signin/email-password`,
        {
          method: 'POST',
          body: { email, password },
        }
      );
      const { session } = req;
      setAuthSession(session);
    } catch (error) {
      throw new Error(`Error signing in: ${error}`);
    }
  }

  return { signIn };
};
