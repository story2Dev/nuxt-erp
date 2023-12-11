export default defineEventHandler(async (event) => {
  const { message, info = 'Error' } = await readBody(event);
  if (!message) {
    setResponseStatus(event, 400);
    return {
      message: 'No message',
    };
  }

  setResponseStatus(event, 2001);
  const discordAPI = process.env.DISCORD_WEB_HOOK_URL + '';
  const username = process.env.DISCORD_USERNAME || 'Nuxt ERP Error Handler';
  // send discord message

  await fetch(discordAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `### ${info}\n${message}`,
      username,
    }),
  });

  return {
    message: 'success',
  };
});
