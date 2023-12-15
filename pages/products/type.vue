<template>
  <div>
    <TermTable :group-id="TermGroupID.productType" />
  </div>
</template>

<script setup lang="ts">
import { TermGroupID } from '~/constants';

useHead({
  title: 'Product Type',
});
</script>
