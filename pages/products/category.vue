<template>
  <div>
    <TermTable :group-id="TermGroupID.category" />
  </div>
</template>

<script setup lang="ts">
import { TermGroupID } from '~/constants';

useHead({
  title: 'Category',
});
</script>
