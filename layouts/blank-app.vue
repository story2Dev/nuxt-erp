<template>
  <div class="flex h-screen flex-col">
    <nav class="flex justify-between px-4 py-1">
      <ul>
        <li
          class="flex cursor-pointer items-center gap-2"
          @click="$router.back()"
        >
          <Icon name="heroicons:arrow-left" size="16" />
          <span>{{ $t('back') }}</span>
        </li>
      </ul>
      <ul class="flex gap-2">
        <li class="cursor-pointer">
          {{ $t('feedback') }}
        </li>
        <li>
          <nuxt-link-locale to="/">
            <Icon name="heroicons:x-mark" size="16" />
          </nuxt-link-locale>
        </li>
      </ul>
    </nav>
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
