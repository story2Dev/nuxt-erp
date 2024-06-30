<template>
  <div>
    <n-popover trigger="click">
      <template #trigger>
        <article class="flex h-10 w-10 items-center justify-center gap-2">
          <img
            alt="Mark AI"
            src="https://avatars.githubusercontent.com/u/18229355?v=4"
            class="h-full w-full rounded-full object-cover"
          />
        </article>
      </template>
      <section>
        <article
          class="flex flex-col items-center justify-center gap-2 px-4 py-2"
        >
          <h1 class="text-base font-semibold">mark@email.com</h1>

          <img
            alt="Mark AI"
            src="https://avatars.githubusercontent.com/u/18229355?v=4"
            class="h-20 w-20 rounded-full object-cover"
          />
        </article>

        <nav
          class="mt-4 flex flex-col divide-y divide-slate-100 rounded-lg bg-slate-50 dark:divide-slate-700 dark:bg-slate-800"
        >
          <NuxtLink
            to="/settings/accounts"
            class="flex items-center gap-2 px-4 py-2"
          >
            <Icon name="heroicons:user-circle" size="20" />
            <span>Account</span>
          </NuxtLink>
          <NuxtLink
            to="/settings/accounts"
            class="flex items-center gap-2 px-4 py-2"
          >
            <Icon name="heroicons:shield-check" size="20" />
            <span>Security</span>
          </NuxtLink>
          <NuxtLink to="/settings" class="flex items-center gap-2 px-4 py-2">
            <Icon name="heroicons:cog" size="20" />
            <span>Systems</span>
          </NuxtLink>
        </nav>

        <ul
          class="mt-4 flex flex-col divide-y divide-slate-100 rounded-lg bg-slate-50 dark:divide-slate-700 dark:bg-slate-800"
        >
          <li class="flex items-center gap-2">
            <div class="flex flex-grow items-center gap-2 p-2">
              <Icon name="heroicons:moon" size="20" />
              <span>{{ $t('theme') }}</span>
            </div>
            <div class="flex items-center justify-end gap-2 px-2">
              <AppSwitchTheme mode="dropdown" />
            </div>
          </li>
          <li class="flex items-center gap-2">
            <div class="flex flex-grow items-center gap-2 p-2">
              <Icon name="heroicons:globe-alt" size="20" />
              <span>{{ $t('language') }}</span>
            </div>
            <div class="flex justify-end pr-2">
              <AppSwitchLanguage mode="dropdown" />
            </div>
          </li>
          <li class="flex items-center gap-2 px-4 py-2">
            <Icon name="fluent:person-feedback-32-regular" size="20" />
            <span>{{ $t('feedback') }}</span>
          </li>
        </ul>

        <nav
          class="mt-4 flex flex-col divide-y divide-slate-100 rounded-lg bg-slate-50 dark:divide-slate-700 dark:bg-slate-800"
        >
          <NuxtLink to="/settings" class="flex items-center gap-2 px-4 py-2">
            <Icon name="heroicons:arrow-left-on-rectangle" size="20" />
            <span>{{ $t('sign_out') }}</span>
          </NuxtLink>
        </nav>
      </section>
    </n-popover>
  </div>
</template>

<script setup lang="ts"></script>
