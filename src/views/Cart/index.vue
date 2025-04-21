<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/counter.js'
import { ElMessage } from 'element-plus'
// 資料－－－－－－ 
const store = useCartStore();
const cartList = ref([]) // 購物車紀錄的商品
const cartListCheck = ref([]) // 被選取的id
const totalMoneyOrigin = ref(0) // 總金額未扣
const totalMoney = ref(0) // 總金額
const coupon = ref('') // CGYKO92689

// 接收事件－－－－－－
// 刪除單個商品
const removeFromCart = (id) => {
  cartList.value = cartList.value.filter(item => item.id !== id);
  store.count = cartList.value.length
  localStorage.setItem('classList', JSON.stringify(cartList.value));
  ElMessage({
      message: '您已刪除商品',
      type: 'success',
    })
}

// 刪除多個商品
const removeFromCartMt = () => {
  if(cartList.value.length !== 0 && cartListCheck.value.length !==0){
    ElMessage({
      message: '您已刪除商品',
      type: 'success',
    })
  }else{
    ElMessage({
      message: '請選擇商品',
      type: 'warning',
    })
  }
  cartList.value = cartList.value.filter(item => !cartListCheck.value.includes(item.id));
  store.count = cartList.value.length
  localStorage.setItem('classList', JSON.stringify(cartList.value));
  cartListCheck.value = []
}

// 確認購買
const buy = () =>{
  if(cartList.value.length !== 0 && cartListCheck.value.length !==0){
    if(coupon.value ==="CGYKO92689" && totalMoneyOrigin.value < 1000){
      ElMessage({
        message: '使用折價券商品價格不能低於1000',
        type: 'error',
      })
      return
    }
    coupon.value = ''
    ElMessage({
      message: '您已購買成功',
      type: 'success',
    })
  }else if(cartList.value.length == 0){
    ElMessage({
      message: '購物車內無商品',
      type: 'warning',
    })
  }else{
    ElMessage({
      message: '請選擇商品',
      type: 'warning',
    })
  }
  cartList.value = cartList.value.filter(item => !cartListCheck.value.includes(item.id));
  store.count = cartList.value.length
  localStorage.setItem('classList', JSON.stringify(cartList.value));
  cartListCheck.value = []
}

// 模擬折價券
const addCoupon = () =>{
  coupon.value = 'CGYKO92689'
}

// 流程－－－－－－


// 函式－－－－－－


// Api－－－－－－


// 生命週期－－－－－－

onMounted(() => {
  let stored = JSON.parse(localStorage.getItem('classList'));
  cartList.value = Array.isArray(stored) ? stored : [];
})

// watch－－－－－－
watch([cartList, cartListCheck, coupon], () => {
  // 根據勾選的 cartListCheck 去找出被選中的商品
  const selectedItems = cartList.value.filter(item => cartListCheck.value.includes(item.id))

  // 小計
  totalMoneyOrigin.value = selectedItems.reduce((sum, item) => sum + item.price, 0)

  // 有折扣則再扣除
  totalMoney.value = totalMoneyOrigin.value
  if (coupon.value === 'CGYKO92689' && totalMoneyOrigin.value >= 1000) {
    totalMoney.value -= 200
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
        empty-text="沒有商品"
        :show-overflow-tooltip="true"
        header-row-class-name="table-header"
      )
        ElTableColumn(label="選取" width="60" fixed)
          template(#default="{ row }")
            div(class="flex justify-center")
              el-checkbox-group(v-model="cartListCheck")
                el-checkbox(:value="row.id" size="large")
        ElTableColumn(prop="imageUrl" label="商品" width="120")
          template(#default="{ row }")
            img(:src="row.imageUrl")
        ElTableColumn(prop="name" label="名稱" min-width="200")
        ElTableColumn(prop="price" label="價格" width="100")
        ElTableColumn(label="編輯" width="100")
          template(#default="{ row }")
            el-button(type="warning" class="flex justify-center p-2 cursor-pointer" @click="removeFromCart(row.id)") 刪除
      //- 折扣模擬
      .coupon
        div(class="flex mt-4 max-sm:flex-col")
          div(class="w-[64px] mt-1 max-sm:mb-2") 折價券
          div(class="flex flex-col")
            div(class="flex")
              el-input(v-model="coupon" style="width: 200px" placeholder="請填入折價券" clearable)
              el-button(type="info" class="ml-2" @click="addCoupon") 模擬
            div(class="mt-2")
              div(class="text-sm text-[var(--primary-400)]") 單筆訂單只限用一張折價券。
              div(class="text-sm text-[var(--primary-400)]") 取消訂單，︀辦理整筆退費後之保留商品為符合折價券使用條件時，︀若折價券仍在使用期間內，︀將退至帳戶中。
      div(class="flex justify-between items-start mt-4 border-t border-[#eeeeee] pt-4 max-md:flex-col max-md:items-center")
        .cart-info
          div(class="mb-1") 小計 : NT$ {{ totalMoneyOrigin }} 元
          div 折價券 : - NT {{ coupon === 'CGYKO92689' ? 200 : 0 }}
          .tip(v-if="coupon === 'CGYKO92689' && totalMoneyOrigin < 1000" class="text-[red] text-sm") *折價券小計必須大於1000元才可以使用
          div(class="border-t border-[#eeeeee] pt-2 mt-2") 總金額 : NT$ {{ totalMoney }} 元
        div(class="flex max-md:mt-6")
          el-button(type="info" @click="removeFromCartMt") 刪除選取
          el-button(type="primary" @click="buy") 確認購買
        

</template >

<style scoped>
  #Cart{
    padding:36px 0 64px;
  }
</style>