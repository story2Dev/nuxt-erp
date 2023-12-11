<template>
  <n-modal v-model:show="showModal">
    <n-card
      :title="$t('add')"
      :bordered="false"
      role="dialog"
      aria-modal="true"
      class="max-w-md"
      closable
      @close="showModal = false"
    >
      <div>
        <n-input
          v-model:value="name"
          :placeholder="$t('name')"
          @keyup.enter="handleAdd"
        />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <n-button @click="showModal = false">
            {{ $t('cancel') }}
          </n-button>
          <n-button type="primary" @click="handleAdd">
            {{ $t('add') }}
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  groupId?: number;
  parentId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const showModal = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const name = ref('');
const { t } = useI18n();
const notification = useNotification();
const { insert, terms } = useTerm();

async function handleAdd() {
  const { groupId, parentId } = props;
  const { errors, term } = await insert({
    name: name.value,
    groupId,
    parentId,
  });

  if (!errors) {
    notification.success({
      title: t('success'),
      duration: 3000,
    });
    showModal.value = false;
    terms.value = [...terms.value, term];
  }
}
</script>
