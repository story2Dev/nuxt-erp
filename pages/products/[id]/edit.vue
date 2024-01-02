<template>
  <div>
    <n-form ref="formRef" :model="frm" :rules="rules">
      <n-card :title="$t('edit')">
        <div class="grid gap-4 md:grid-cols-2">
          <article>
            <n-form-item path="name" :label="$t('name')">
              <n-input v-model:value="frm.name" :placeholder="$t('name')" />
            </n-form-item>

            <div class="grid grid-cols-2 gap-4">
              <n-form-item path="unitPrice" :label="$t('products.price')">
                <n-input-number
                  v-model:value="frm.unitPrice"
                  :parse="inputParse"
                  :format="inputFormat"
                  :show-button="false"
                  :placeholder="$t('products.price')"
                  class="w-full"
                />
              </n-form-item>
              <n-form-item path="cost" :label="$t('products.cost')">
                <n-input-number
                  v-model:value="frm.cost"
                  :parse="inputParse"
                  :format="inputFormat"
                  :show-button="false"
                  :placeholder="$t('products.cost')"
                  class="w-full"
                />
              </n-form-item>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <n-form-item path="category" :label="$t('unit')">
                <TermInput
                  v-model:value="frm.unitId"
                  :placeholder="$t('unit')"
                  :group-id="TermGroupID.productUnit"
                />
              </n-form-item>
              <n-form-item path="category" :label="$t('category')">
                <TermInput
                  v-model:value="frm.categoryId"
                  :placeholder="$t('category')"
                  :group-id="TermGroupID.category"
                />
              </n-form-item>
              <n-form-item path="type" :label="$t('type')">
                <TermInput
                  v-model:value="frm.typeId"
                  :group-id="TermGroupID.productType"
                  :placeholder="$t('type')"
                />
              </n-form-item>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <n-form-item path="stock" :label="$t('products.stock')">
                <n-input-number
                  v-model:value="frm.stockQuantity"
                  :placeholder="$t('products.stock')"
                  :show-button="false"
                />
              </n-form-item>
              <n-form-item
                path="stock_trackable"
                :label="$t('products.stock_trackable')"
              >
                <n-switch v-model:value="frm.stockTrackable" />
              </n-form-item>
            </div>

            <n-form-item path="description" :label="$t('description')">
              <n-input
                v-model:value="frm.description"
                :placeholder="$t('description')"
                type="textarea"
                rows="2"
              />
            </n-form-item>

            <n-form-item path="sku" :label="$t('products.sku')">
              <n-input
                v-model:value="frm.sku"
                :placeholder="$t('products.sku')"
              />
            </n-form-item>
            <n-form-item path="barcode" :label="$t('products.barcode')">
              <n-input
                v-model:value="frm.barcode"
                :placeholder="$t('products.barcode')"
              />
            </n-form-item>
          </article>

          <article>
            <h3 class="mb-2">{{ $t('image') }}</h3>
            <ul class="flex gap-4">
              <li
                class="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100"
              >
                <label for="file">
                  <icon
                    name="material-symbols-light:add-photo-alternate-outline-sharp"
                    size="30"
                  />
                </label>
              </li>
              <input id="file" type="file" class="hidden" accept="image/*" />
            </ul>
            <div class="mt-4">
              {{ $t('tag') }}
              <TermInput :group-id="TermGroupID.tag" type="checkbox" />
            </div>
          </article>
        </div>
        <div class="flex gap-2">
          <n-button @click="$router.back()">{{ $t('cancel') }}</n-button>
          <n-button type="primary" @click.prevent="handleUpdate">
            {{ $t('update') }}
          </n-button>
        </div>
      </n-card>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInst } from 'naive-ui';
import { TermGroupID } from '~/constants';

const notification = useNotification();
const { t } = useI18n();
const { frm, update, rules, fetchProduct } = useProduct();
const formRef = ref<FormInst | null>(null);

const { id } = useRoute().params;

const { errors, product } = await fetchProduct(`${id}`);
if (!errors) {
  frm.value = {
    ...product,
  };

  useHead({
    title: `Edit - ${product.name}`,
  });
}

function handleUpdate() {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const {
        categoryId,
        typeId,
        unitPrice = 0,
        sku = '',
        barcode = '',
        description = '',
        stockQuantity = 0,
        stockTrackable = false,
        name = '',
        cost = 0,
        unitId,
      } = frm.value;
      const { errors, product } = await update(`${id}`, {
        categoryId,
        typeId,
        unitPrice,
        name,
        sku,
        barcode,
        description,
        stockQuantity,
        stockTrackable,
        cost,
        unitId,
      });

      if (!errors) {
        notification.success({
          title: t('success'),
          description: t('products.update_success'),
          duration: 3000,
        });
        useRouter().push(`/products/${product.id}`);
        return;
      }
      notification.error({
        title: t('fail'),
        description: t('products.update_fail'),
        duration: 3000,
      });
      throw new Error(`Add product failed: ${errors}`);
    }
  });
}
</script>
