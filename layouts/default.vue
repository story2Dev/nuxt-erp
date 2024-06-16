<template>
  <div class="flex h-screen flex-col">
    <AppBar />

    <section class="flex flex-grow overflow-y-auto">
      <div class="hidden md:block">
        <aside
          class="group relative flex h-full w-14 flex-col items-center bg-gray-100 dark:bg-slate-700"
        >
          <div class="flex w-full items-center pt-4">
            <AppSideBar />
          </div>
        </aside>
      </div>
      <main class="flex h-full flex-grow flex-col">
        <div class="h-full flex-grow">
          <slot></slot>
        </div>
      </main>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts"></script>
