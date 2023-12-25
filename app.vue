<template>
  <div class="bg-[#fafafa] dark:bg-slate-800">
    <naive-config :theme-config="themeConfig">
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-loading-bar-provider>
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
            </n-loading-bar-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </naive-config>
  </div>
</template>

<script setup lang="ts">
import { themeConfig } from './theme.config';
</script>
