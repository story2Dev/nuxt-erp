export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuth();
  if (!user) return navigateTo('/signin');
});
