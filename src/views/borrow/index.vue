<template>
  <div class="page-layout-card">
    <el-card class="head">
      <el-row>
        <el-form
          :inline="true"
          ref="formRef"
          :model="form"
          :rules="rules"
          status-icon
        >
          <el-form-item label="借书证号" prop="sno">
            <el-input v-model="form.sno"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :icon="Search"
              @click="submitForm(formRef)"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="body">
      <info></info>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { FormRules, FormInstance } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { request } from '@/api/service'
import info from './info.vue'

const stu_info = ref(false)
const formRef = ref<FormInstance>()
const form = ref({
  sno: '',
})
const res = ref()

const rules = ref<FormRules>({
  sno: [
    { required: true, message: '请输入借书证号' },
    { pattern: /^[0-9]+$/, message: '输入必须为数字' },
    { len: 10, message: '长度需为10位' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  stu_info.value = false
  const success = await formEl.validate((valid: boolean, fields) => {
    if (valid) {
      console.log('submit!')
      return true
    } else {
      console.log('error submit!', fields)
      return false
    }
  })
  // 表单初步验证成功向后端请求数据
  if (success) {
    const sno = form.value.sno
    res.value = await request({
      url: '/borrow/stuInfo',
      method: 'get',
      params: { sno },
    })
  }
  stu_info.value = true
  console.log(res.value)
}
</script>

<style lang="scss" scoped>
.page-layout-card {
  background-color: #eee;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
}
.head {
  margin: 10px 10px 0px;
}
.body {
  height: 100%;
  margin: 10px 10px 10px;
}
</style>
