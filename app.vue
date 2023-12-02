<template>
  <div class="bg-[#fafafa]">
    <n-config-provider :theme-overrides="lightThemeOverrides">
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
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { lightThemeOverrides } from './theme.config';
</script>
