<template>
  <div>
    <ul class="flex flex-wrap gap-4">
      <li v-for="(item, index) in quizAccessApp" :key="index">
        <nuxt-link
          :to="item.to"
          class="group flex cursor-pointer flex-col items-center rounded-xl bg-white p-4 px-6 hover:bg-primary-50 dark:bg-slate-900 dark:hover:bg-slate-950"
        >
          <Icon
            :name="item.icon"
            class="transition-all group-hover:rotate-12 group-hover:scale-125 group-hover:text-primary-600"
            size="30"
          />
          <h3>{{ item.title }}</h3>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { quizAccessApp } from '~/constants';
</script>
