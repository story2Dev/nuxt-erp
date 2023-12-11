/* eslint-disable no-console */
export default defineNuxtPlugin((nuxtApp) => {
  // Also possible
  nuxtApp.hook('vue:error', (error: any, _, info: string) => {
    // console.log('vue:error', error?.message);
    const { message } = error;
    if (process.env.NODE_ENV === 'development') {
      console.error({ info, message });
      return;
    }
    const path = useRoute().path;
    // send discord message
    $fetch('/api/discord', {
      method: 'POST',
      body: {
        message: `${message}\n${path}`,
        info,
      },
    });
  });
});
