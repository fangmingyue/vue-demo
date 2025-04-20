<script setup>
import { RouterView } from 'vue-router'
import { useCartStore } from '@/stores/counter.js'
import Header from "@/components/layouts/header/index.vue"
import Footer from "@/components/layouts/footer/index.vue"
import { onMounted } from 'vue';

const store = useCartStore();
onMounted(()=>{
  let stored = JSON.parse(localStorage.getItem('classList'));
  store.count = Array.isArray(stored) ? stored.length : 0;
})
</script>

<template lang="pug">
  //- header
  Header
  //- main
  RouterView
  //- footer
  Footer
</template>

<style scoped></style>
