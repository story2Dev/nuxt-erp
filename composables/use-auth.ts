import { SESSION_KEY, TOKEN_KEY, USER_KEY } from '~/constants';

export const useAuth = () => {
  const config = useRuntimeConfig();

  const cookieSession = useCookie<any>(SESSION_KEY);
  const token = useCookie(TOKEN_KEY);
  const userCookie = useCookie(USER_KEY);

  function setAuthSession(session: any) {
    cookieSession.value = {
      ...session,
      accessTokenExpiresIn: Date.now() + session.accessTokenExpiresIn * 1000,
    };
    token.value = session.accessToken;
    userCookie.value = JSON.stringify(session.user);
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

  function refreshToken() {
    const { accessTokenExpiresIn, refreshToken } = cookieSession.value || {};
    if (!accessTokenExpiresIn) return;

    if (accessTokenExpiresIn > Date.now()) {
      return;
    }
    $fetch(`${config.public.authApi}/token`, {
      method: 'POST',
      body: { refreshToken },
    }).then((res: any) => {
      setAuthSession(res);
    });
  }

  async function signOut() {
    try {
      const { refreshToken } = cookieSession.value;
      cookieSession.value = null;
      token.value = null;
      await $fetch(`${config.public.authApi}/signout`, {
        method: 'POST',
        body: { all: true, refreshToken },
      });

      navigateTo('/signin');
    } catch (error) {
      navigateTo('/signin');
      throw new Error(`[useAuth] signOut: Error signing out: ${error}`);
    }
  }

  return {
    signIn,
    refreshToken,
    signOut,
    user: cookieSession.value?.user || null,
  };
};
