export default defineNuxtRouteMiddleware(() => {
  const { refreshToken } = useAuth();
  refreshToken();
});
