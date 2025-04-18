<script setup>
import { get_data, post_data } from '@/api/api.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/counter.js'
import { ElNotification } from 'element-plus'
import dayjs from 'dayjs'

// 資料－－－－－－ 
const store = useCartStore();
const router = useRouter();
const classListData = ref([])
const classList = ref([])
const loading = ref(true)

const classType = (type) =>{
  switch(type){
    case '音樂':
      return '#e59e24'
      break;
    case '戲劇':
      return '#27cee8'
      break;
    case '親子':
      return '#e8be27'
      break;
    default:
      return '#b7b7b7'
      break;
  }
}

const classLimit = (limit) =>{
  switch(limit){
    case '4歲以上':
      return '#5c94e8'
      break;
    case '6歲以上':
      return '#5c94e8'
      break;
    case '7歲以上':
      return '#5c94e8'
      break;
    case '12歲以上':
      return '#5c94e8'
      break;
    case '輔15級':
      return '#ED6316'
      break;
    case '普遍級':
      return '#55BB34'
      break;
    default:
      return '#b7b7b7'
      break;
  }
}

// 接收事件－－－－－－
// 加入購物車並存到localStorage
const addCart = (course) => {
  let stored = JSON.parse(localStorage.getItem('classList'));
  classList.value = Array.isArray(stored) ? stored : [];

  const exists = classList.value.some(item => item.id === course.id);

  if (!exists) {
    classList.value.push(course);
    ElNotification({
      title: '操作成功',
      message: `加入購物車成功：${course.name}`,
      type: 'success',
    })
    localStorage.setItem('classList', JSON.stringify(classList.value));
    store.count = classList.value.length
  } else {
    ElNotification({
      title: '操作重複',
      message: `商品已在購物車內：${course.name}`,
      type: 'warning',
    })
  }

  console.log(classList.value);
}

// 立即結帳
const addCartNow = (course) => {
  let stored = JSON.parse(localStorage.getItem('classList'));
  classList.value = Array.isArray(stored) ? stored : [];

  const exists = classList.value.some(item => item.id === course.id);

  if (!exists) {
    classList.value.push(course);
    localStorage.setItem('classList', JSON.stringify(classList.value));
    store.count = classList.value.length
  } else {
    router.push('/cart')
  }
}

// 流程－－－－－－


// 函式－－－－－－


// Api－－－－－－
const getClassData = async () => {
  loading.value = true
  try {
    const res = await get_data('https://script.google.com/macros/s/AKfycbyGmoZukCQze0nw3UF-VX9ELODVy5Rs6CIQ1U-YbwNHfG3JIjGz4JThKAvWJB1P0qTg/exec');
    classListData.value = res;
  } catch (error) {
    console.error('資料取得失敗', error);
  } finally {
    loading.value = false
  }
}

// 生命週期－－－－－－
onMounted(async()=>{
  await getClassData();
})

</script>

<template lang="pug">
  #Class
    .container
      div(class="mb-4")
        el-breadcrumb(separator="/")
          el-breadcrumb-item(:to="{ path: '/' }") 首頁
          el-breadcrumb-item 課程列表
      div(v-if="loading" class="text-center py-20 text-gray-500")
        div(class="w-full flex justify-center")
          img(src="../../../public/loading.gif" class="max-w-[250px]")
      .class-list(class="grid grid-cols-12 gap-4")
        div(v-for="item in classListData" :key="item.id" class="relative col-span-3 bg-[#e0f2fe] rounded-sm p-4 max-xl:col-span-4 max-md:col-span-6 max-sm:col-span-12")
          h2(class="font-semibold text-lg mb-2 min-h-[64px]") {{ item.name }}
          h6 課程時間
          div(class="text-sm py-2") {{ dayjs(item.startDateTime).format('YYYY-MM-DD HH:mm:ss')}} ~ {{ dayjs(item.endDateTime).format('YYYY-MM-DD HH:mm:ss') }}
          div(class="max-h-[420px] overflow-hidden")
            img(:src="item.imageUrl" class="w-full h-auto max-h-[420px] object-cover")
          .info(class="bg-white p-4 mt-4")
            .info-data(class="flex justify-between mb-2")
              .price 價格:{{ item.price }}
              div(class="flex")
                .limit(class="p-1 text-white rounded-sm text-sm mr-1" :style="{ backgroundColor: classLimit(item.ageRestriction) }") {{ item.ageRestriction }}
                .type(class="p-1 text-white rounded-sm text-sm" :style="{ backgroundColor: classType(item.displayCategory) }") {{ item.displayCategory }}
            .info-btn(class="flex justify-end border-t border-[#EDF2FA] py-2")
              //- 有開放課程
              div(v-if="item.status === '已開始'" class="flex")
                div(class="w-[36px] p-2 bg-[#e29a41] rounded-sm mr-2 cursor-pointer"  @click="addCart(item)")
                  img(src="../../../public/cart.svg")
                RouterLink(:to="`/cart`" class="p-2 rounded-sm text-white bg-[#0369a1] cursor-pointer" @click="addCartNow(item)") 立即結帳
              //- 無開放課程
              div(v-else)
                div(class="flex items-center")
                  div(v-if="item.status === '尚未開始'" class="mr-4 cursor-pointer")
                    el-tooltip(effect="dark" content="立即預約提醒" placement="top")
                      img(src="../../../public/clock.svg" class="w-[28px] h-[28px]")
                  div(class="inline-flex p-2 rounded-sm text-white bg-[#a3a3a3] cursor-not-allowed") {{ item.status }}
          //-如果已結束
          .over(v-if="item.status === '已結束'" class="absolute left-0 top-0 w-full h-full bg-[#00000040] flex justify-center items-center")
            div(class="text-white text-3xl font-semibold bg-[#00000080] w-[120px] h-[120px] rounded-full flex justify-center items-center tracking-wider") 已結束
</template>

<style scoped>
  #Class{
    padding:36px 0 64px;
  }
</style>