<template>
  <n-modal v-model:show="showModal">
    <n-card
      :title="$t('edit')"
      :bordered="false"
      role="dialog"
      aria-modal="true"
      class="max-w-md"
      closable
      @close="showModal = false"
    >
      <div>
        <n-input
          v-model:value="frm.name"
          :placeholder="$t('name')"
          @keyup.enter="handleUpdate"
        />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <n-button @click="showModal = false">
            {{ $t('cancel') }}
          </n-button>
          <n-button type="primary" @click="handleUpdate">
            {{ $t('update') }}
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  parentId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const showModal = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const { t } = useI18n();
const notification = useNotification();
const { update, terms, frm } = useTerm();

async function handleUpdate() {
  const { parentId } = props;
  const { id, name } = frm.value;
  const { errors, term } = await update(id as string, {
    name,
    parentId,
  });

  if (!errors) {
    notification.success({
      title: t('success'),
      duration: 3000,
    });
    showModal.value = false;
    terms.value = terms.value.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...term,
        };
      }
      return item;
    });
  }
}
</script>
