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
            <n-button @click="testError">
              <template #icon>
                <Icon name="system-uicons:filter" />
              </template>
              {{ $t('filter') }}
            </n-button>
            <nuxt-link to="/products/add">
              <n-button type="primary">
                <template #icon>
                  <Icon name="system-uicons:plus" />
                </template>
                {{ $t('add') }}
              </n-button>
            </nuxt-link>
          </article>
        </div>
      </n-card>
    </section>
  </div>
</template>

<script setup lang="ts">
const search = ref('');

function testError() {
  throw new Error('test error');
}
</script>
