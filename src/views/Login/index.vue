<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/counter.js'
import { ElMessage } from 'element-plus'

// 資料－－－－－－ 
const store = useCartStore()
const router = useRouter()
const ruleFormRef = ref()

const ruleForm = reactive({
  account:'', // admin
  password:'' //admin
})

const rules = reactive({
  account: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 4, max: 20, message: '帳號為4~20字元', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '請輸入密碼',
      trigger: 'change',
    },
  ]
})

// 接收事件－－－－－－
// 登入
const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      // 驗證通過後，再來檢查帳號密碼邏輯
      if (ruleForm.account === 'admin' && ruleForm.password === 'admin') {
        store.isLoginPinia = true;
        localStorage.setItem('isLogin','true')
        ElMessage({
          message: '成功登入',
          type: 'success',
        })
        router.push('/')
      } else {
        ElMessage({
          message: '未知錯誤',
          type: 'error',
        })
      }
    } else {
      ElMessage({
        message: '帳號或密碼錯誤',
        type: 'error',
      })
    }
  })
}


// 清除資料
const clear = () =>{
  loginData.account ='';
  loginData.password ='';
}

// 流程－－－－－－

// 函式－－－－－－

// Api－－－－－－

// 生命週期－－－－－－

</script>

<template lang="pug">
  #Login
    .container
      .login-form(class="w-full max-w-[300px] bg-[var(--primary-100)] px-6 py-8 rounded-sm fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]")
        div(class="flex justify-center items-center mb-4 text-lg")
          h1 會員登入
        el-form(ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="auto")
          el-form-item(label="帳號" prop="account")
            el-input(v-model="ruleForm.account" type="text" min="4" max="20")
          el-form-item(label="密碼" prop="password")
            el-input(v-model="ruleForm.password" type="password" show-password)
          el-form-item
            div(class="flex justify-center w-full")
              el-button(type="info" @click="clear") 清除
              el-button(type="primary" @click="submitForm(ruleFormRef)") 登入
        //- 提示
        div(class="border-t-[1px] border-[#00000015] text-[#00000060] text-sm flex justify-center pt-4") 帳號: admin / 密碼: admin          
</template>

<style scoped>

</style>