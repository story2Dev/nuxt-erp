<template>
  <div>
    <footer class="border-t border-slate-100 md:hidden">
      <nav class="flex items-center justify-between gap-4 p-2 px-4">
        <NuxtLink to="/">
          <Icon name="ep:house" size="24" />
        </NuxtLink>
        <NuxtLink to="/documents">
          <Icon name="system-uicons:document" size="24" />
        </NuxtLink>

        <div class="relative">
          <n-button
            circle
            type="primary"
            class="absolute -left-7 -top-10 h-14 w-14 shadow-xl"
          >
            <Icon name="system-uicons:plus" size="30" />
          </n-button>
        </div>
        <NuxtLink to="/reports">
          <Icon name="material-symbols-light:multiline-chart" size="24" />
        </NuxtLink>
        <NuxtLink to="/settings">
          <Icon name="heroicons:cog" size="24" />
        </NuxtLink>
      </nav>
    </footer>
  </div>
</template>
