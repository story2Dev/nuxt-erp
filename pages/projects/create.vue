<template>
  <div>
    <section class="mx-auto max-w-md p-4">
      <h1 class="mb-2 text-xl font-semibold">{{ $t('projects.create') }}</h1>

      <article>
        <n-form>
          <n-form-item :label="$t('projects.name')">
            <n-input
              v-model:value="frm.name"
              :placeholder="$t('projects.name')"
            />
          </n-form-item>
          <div class="mb-4">
            <CommonColor v-model="frm.color" />
          </div>
          <n-form-item :label="$t('tag')">
            <n-dynamic-tags v-model:value="frm.tags" />
          </n-form-item>
        </n-form>

        <n-button type="primary" block @click.prevent="handleCreate">
          {{ $t('create') }}
        </n-button>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { INSERT_PROJECT } from '~/gql/mutate';

const { client } = useApolloClient();
definePageMeta({
  layout: 'blank-app',
});

const frm = ref({
  tags: ['teacher', 'programmer'],
  color: '#000',
  name: '',
  description: '',
});

const { t } = useI18n();
const notification = useNotification();
const user = useAuthUser();

async function handleCreate() {
  try {
    const { name } = frm.value;
    const { data, errors } = await client.mutate({
      mutation: INSERT_PROJECT,
      variables: {
        object: toHasuraInput({
          name,
          userId: user.value?.id,
          projectMeta: {
            data: [
              {
                key: 'color',
                value: frm.value.color,
              },
              ...frm.value.tags.map((tag) => ({
                key: 'tags',
                value: tag,
              })),
            ],
          },
        }),
      },
    });
    notification.success({
      title: t('success'),
      description: t('created_successfully'),
      duration: 4000,
    });
  } catch (error) {
    notification.error({
      title: t('failed'),
      description: t('something_went_wrong'),
      meta: `${error}`,
      duration: 4000,
    });
    throw new Error(`[handleCreate]: error: ${error}`);
  }
}
</script>
