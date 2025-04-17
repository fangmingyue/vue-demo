<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/counter.js'
import { ElMessage } from 'element-plus'
// 資料－－－－－－ 
const store = useCartStore();
const cartList = ref([]) // 購物車紀錄的商品
const cartListCheck = ref([]) // 被選取的id
const totalMoney = ref(0) // 總金額

// 接收事件－－－－－－
// 刪除單個商品
const removeFromCart = (id) => {
  cartList.value = cartList.value.filter(item => item.id !== id);
  store.count = cartList.value.length
  localStorage.setItem('classList', JSON.stringify(cartList.value));
  ElMessage({
    message: '您已刪除商品',
    type: 'warning',
  })
}

// 刪除多個商品
const removeFromCartMt = () => {
  cartList.value = cartList.value.filter(item => !cartListCheck.value.includes(item.id));
  store.count = cartList.value.length
  localStorage.setItem('classList', JSON.stringify(cartList.value));
  ElMessage({
    message: '您已刪除商品',
    type: 'warning',
  })
}

// 確認購買
const buy = () =>{
  cartList.value = cartList.value.filter(item => !cartListCheck.value.includes(item.id));
  store.count = cartList.value.length
  localStorage.setItem('classList', JSON.stringify(cartList.value));
  ElMessage({
    message: '您已購買成功',
    type: 'success',
  })
}

// 流程－－－－－－


// 函式－－－－－－


// Api－－－－－－


// 生命週期－－－－－－

onMounted(()=>{
  let stored = JSON.parse(localStorage.getItem('classList'));
  cartList.value = Array.isArray(stored) ? stored : [];

  totalMoney.value = cartList.value.reduce((sum, item) => sum + item.price, 0)
})

// watch－－－－－－
watch(() => cartList.value,(newVal)=>{
  if(newVal){
    totalMoney.value = cartList.value.reduce((sum, item) => sum + item.price, 0)
  }
})
</script>

<template lang="pug">
  #Cart
    .container
      div(class="mb-4")
        el-breadcrumb(separator="/")
          el-breadcrumb-item(:to="{ path: '/' }") 首頁
          el-breadcrumb-item 購物車
      ElTable(
        ref="elElTable"
        :data="cartList"
        style="width: 100%; height:100%"
        :default-sort="{ prop: '', order: ''}"
        border
        :show-overflow-tooltip="true"
        header-row-class-name="table-header"
      )
        ElTableColumn(label="選取" width="60" fixed)
          template(#default="{ row }")
            div(class="flex justify-center")
              el-checkbox-group(v-model="cartListCheck")
                el-checkbox(:value="row.id" size="large")
        ElTableColumn(prop="imageUrl" label="縮圖" width="120")
          template(#default="{ row }")
            img(:src="row.imageUrl")
        ElTableColumn(prop="name" label="名稱" min-width="200")
        ElTableColumn(prop="price" label="價格" width="100")
        ElTableColumn(label="編輯" width="100")
          template(#default="{ row }")
            el-button(type="warning" class="flex justify-center p-2 cursor-pointer" @click="removeFromCart(row.id)") 刪除
      div(class="flex justify-between items-center mt-4")
        div 總金額: {{ totalMoney }} 元
        div(class="flex")
          el-button(type="info" @click="removeFromCartMt") 刪除選取
          el-button(type="primary" @click="buy") 確認購買
        

</template >

<style scoped>
  #Cart{
    padding:36px 0 64px;
  }
</style>