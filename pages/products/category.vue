<template>
  <div>
    <section>
      <n-card>
        <div class="flex justify-between">
          <article>
            <n-input v-model:value="search" :placeholder="$t('search')">
              <template #prefix>
                <Icon name="system-uicons:search" />
              </template>
            </n-input>
          </article>
          <article class="flex justify-end gap-2">
            <n-button>
              <template #icon>
                <Icon name="system-uicons:filter" />
              </template>
              {{ $t('filter') }}
            </n-button>

            <n-button type="primary">
              <template #icon>
                <Icon name="system-uicons:plus" />
              </template>
              {{ $t('add') }}
            </n-button>
          </article>
        </div>
      </n-card>
    </section>
    <section></section>
  </div>
</template>

<script setup lang="ts">
const search = ref('');
</script>
