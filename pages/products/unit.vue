<template>
  <div>
    <TermTable :group-id="TermGroupID.productUnit" />
  </div>
</template>

<script setup lang="ts">
import { TermGroupID } from '~/constants';

useHead({
  title: 'Unit',
});
</script>
