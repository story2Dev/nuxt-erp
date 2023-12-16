<template>
  <div class="w-full">
    <n-select
      v-if="type == 'select'"
      :options="terms"
      value-field="id"
      label-field="name"
      v-bind="$attrs"
    />
    <article v-else-if="type == 'checkbox'">
      <n-checkbox-group v-bind="$attrs">
        <nav :class="wrapperClass">
          <n-checkbox
            v-for="(item, index) in terms"
            :key="index"
            :value="item.id"
            :label="item.name"
          />
        </nav>
      </n-checkbox-group>
    </article>
    <article v-else-if="type == 'radio'">
      <n-radio-group v-bind="$attrs" :name="name">
        <nav :class="wrapperClass">
          <n-radio
            v-for="(item, index) in terms"
            :key="index"
            :value="item.id"
            :label="item.name"
          />
        </nav>
      </n-radio-group>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Term } from '~/types';

interface Props {
  groupId: number;
  type?: 'select' | 'radio' | 'checkbox';
  wrapperClass?: string;
  name?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'select',
  wrapperClass: 'flex flex-wrap gap-2',
  name: 'term',
});

const { getTerms } = useTerm();
const terms = ref<Term[]>([]);

const { items } = await getTerms({
  where: {
    group_id: {
      _eq: props.groupId,
    },
  },
});

terms.value = items;
</script>
