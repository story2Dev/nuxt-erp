<template>
  <div class="flex h-full flex-col items-center justify-center">
    <section class="mx-auto flex w-full max-w-sm flex-col space-y-4 p-4">
      <h2 class="text-center font-mono text-4xl font-bold text-primary-600">
        Nuxt ERP
      </h2>
      <h2 class="text-center text-base text-gray-600">
        {{ $t('signin_your_account') }}
      </h2>

      <n-input v-model:value="frm.email" :placeholder="$t('email')">
        <template #prefix>
          <Icon name="system-uicons:mail" />
        </template>
      </n-input>
      <n-input
        v-model:value="frm.password"
        :placeholder="$t('password')"
        type="password"
        show-password-on="mousedown"
      >
        <template #prefix>
          <Icon name="system-uicons:lock" />
        </template>
      </n-input>

      <n-button type="primary" block :loading="loading" @click="handleSigin">
        {{ $t('signin') }}
      </n-button>
      <article class="flex justify-between">
        <ul class="flex flex-grow flex-wrap gap-2">
          <li v-for="(item, index) in languages" :key="index">
            <n-button
              text
              :class="{
                'text-primary-600': locale === item.value,
              }"
              size="small"
              @click="setLocale(item.value)"
            >
              {{ item.label }}
            </n-button>
          </li>
        </ul>

        <nuxt-link to="/forgot-pssword" class="text-xs">
          {{ $t('forgot_password') }}
        </nuxt-link>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

definePageMeta({
  layout: 'blank',
});

useHead({
  title: 'Sign In',
});

const frm = ref({
  email: '',
  password: '',
});

const languages = locales.value.map((item: any) => ({
  label: item.name,
  value: item.code,
}));

const { signIn } = useAuth();
const notification = useNotification();
const { t } = useI18n();
const loading = ref(false);

async function handleSigin() {
  try {
    const { email, password } = frm.value;
    loading.value = true;
    await signIn(email, password);
    loading.value = false;
    notification.success({
      title: t('auth.signin_success'),
      description: t('auth.welcome_back'),
      duration: 4000,
    });
    navigateTo('/');
  } catch (error) {
    loading.value = false;
    notification.error({
      title: t('auth.signin_failed'),
      description: t('auth.invalid_credentials'),
      duration: 4000,
    });
  }
}
</script>
