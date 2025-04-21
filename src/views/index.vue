<script setup>
import { useCartStore } from '@/stores/counter.js'
import { onMounted } from 'vue';

// 資料－－－－－－ 
const store = useCartStore()
// 接收事件－－－－－－

// 流程－－－－－－

// 函式－－－－－－

// Api－－－－－－

// 生命週期－－－－－－

</script>

<template lang="pug">
  #Home
    .container
      div(class="py-4")
        h1(class="text-3xl max-lg:text-2xl text-md:text-base border-b border-[#00000020] pb-4 mb-4") 介面需求
        h2(class="text-lg font-semibold mb-2") 1.課程列表
        ul(class="mb-4 indent-[16px]")
          li 。 課程名稱
          li 。 開課狀態
          li 。 縮圖
          li 。 單價
          li 。 加入購物車按鈕(開課狀態：尚未開始時不能加入購物車)
        h2(class="text-lg font-semibold mb-2") 2.購物車頁(呈現已加入購物車的商品數)
        ul(class="mb-4 indent-[16px]")
          li 。 縮圖＋課程名稱＋單價＋刪除按鈕(單項刪除＋多選刪除)
          li 。 總計金額
          li 。 確認按鈕
        h2(class="text-lg font-semibold mb-2") 3.導航列
        ul(class="indent-[16px]")
          li 。 前面兩頁的換頁連結
</template>

<style scoped>

</style>
