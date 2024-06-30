<template>
  <div>
    <nav class="mb-4 flex flex-col items-center justify-center space-y-2">
      <div class="group relative flex items-center justify-center">
        <n-avatar
          circle
          :size="90"
          alt="Mark AI"
          src="https://avatars.githubusercontent.com/u/18229355?v=4"
        ></n-avatar>
        <n-button
          circle
          type="primary"
          size="small"
          class="invisible absolute bottom-0 right-1 group-hover:visible"
        >
          <Icon name="ic:outline-mode-edit-outline" size="18" />
        </n-button>
      </div>
      <h2 class="text-xl">Mark AI</h2>
      <h3>mark@email.com</h3>
    </nav>

    <n-card class="mb-4">
      <ul class="divide-y divide-slate-100 dark:divide-slate-800">
        <li class="flex justify-between py-2">
          <div class="flex items-center gap-2">
            <Icon name="solar:shield-user-bold-duotone" size="20" />
            <span>Personal Information</span>
          </div>
          <Icon name="system-uicons:chevron-right" size="20" />
        </li>
        <li class="flex justify-between py-2">
          <div class="flex items-center gap-2">
            <Icon
              name="solar:shield-keyhole-minimalistic-bold-duotone"
              size="20"
            />
            <span>Sign-In & Security</span>
          </div>
          <Icon name="system-uicons:chevron-right" size="20" />
        </li>
      </ul>
    </n-card>

    <n-card>
      <ul class="divide-y divide-slate-100 dark:divide-slate-800">
        <li class="flex justify-between py-2">
          <span>
            {{ $t('language') }}
          </span>
          <div class="w-full max-w-[150px]">
            <AppSwitchLanguage />
          </div>
        </li>
        <li class="py-2">
          <h4>{{ $t('theme') }}</h4>
          <AppSwitchTheme />
        </li>
      </ul>
    </n-card>
    <article class="mt-4 flex justify-between">
      <n-button @click="signOut">{{ $t('sign_out') }}</n-button>
      <n-button circle ghost>
        <template #icon>
          <Icon name="solar:question-circle-line-duotone" size="18" />
        </template>
      </n-button>
    </article>
  </div>
</template>

<script setup lang="ts">
const { title } = useApp();

const { signOut } = useAuth();

title.value = 'Your Account';
</script>
