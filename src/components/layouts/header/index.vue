<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useCartStore } from '@/stores/counter.js'
import { useRouter } from 'vue-router'

// 資料－－－－－－ 
const store = useCartStore();
const router = useRouter();
const cartList = ref([]) // 購物車紀錄的商品
const productNum = ref(0)
const drawer = ref(false)

// 接收事件－－－－－－
// 登出
const loginOut = () =>{
  store.isLoginPinia = false
  localStorage.setItem('isLogin','false')
  router.push('/login')
  drawer.value = false;
}

// 流程－－－－－－


// 函式－－－－－－


// Api－－－－－－


// 生命週期－－－－－－

onMounted(()=>{
  let stored = JSON.parse(localStorage.getItem('classList'));
  cartList.value = Array.isArray(stored) ? stored : [];
})

</script>

<template lang="pug">
  #Header
    .container
      .nav(class="flex justify-between items-center h-[70px] max-md:h-[60px]")
        RouterLink(to="/" class="text-white text-xl") 購物車模擬系統v1.0
        //- for pc
        div(class="flex items-center max-md:hidden")
          RouterLink(to="/" class="text-white mr-4") 返回首頁
          RouterLink(to="/class" class="text-white mr-4") 課程列表
          RouterLink(v-if="store.isLoginPinia" to="/cart" class="text-white cursor-pointer relative")
            img(src="../../../../public/cart.svg" class="w-[24px]")
            div(class="absolute left-[80%] bottom-[50%] w-[16px] h-[16px] bg-[red] flex justify-center items-center text-sm rounded-full") {{ store.count }}
          el-button(v-if="store.isLoginPinia" type="info" class="ml-8" @click="loginOut") 登出
        //- for mb
        div(class="hidden items-center max-md:flex")
          RouterLink(v-if="store.isLoginPinia" to="/cart" class="text-white cursor-pointer relative")
            img(src="../../../../public/cart.svg" class="w-[24px]")
            div(class="absolute left-[80%] bottom-[50%] w-[16px] h-[16px] bg-[red] flex justify-center items-center text-sm rounded-full") {{ store.count }}
          img(src="../../../../public/side.svg" class="ml-6" @click="drawer = true")
    el-drawer(v-model="drawer" title="I am the title" :with-header="false")
      div(class="flex flex-col justify-center items-center pt-12")
        RouterLink(to="/" @click="drawer = false" class="mb-8") 返回首頁
        RouterLink(to="/class" @click="drawer = false") 課程列表
        div(class="border-t border-[#00000020] w-full mt-8")
        el-button(v-if="store.isLoginPinia" type="info" class="mt-8" @click="loginOut") 登出

</template>

<style scoped>
#Header{
  background:var(--primary-500);
}
</style>