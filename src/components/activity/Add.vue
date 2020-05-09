<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加活动</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区-->
        <el-card>
            <!--提示区域-->
            <el-alert
                    title="添加活动信息"
                    type="info"
                    center
                    show-icon
                    :closable="false">
            </el-alert>
            <!--步骤条-->
            <el-steps :active="activeIndex-0" finish-status="success" :align-center="true">
                <el-step title="基本信息"></el-step>
                <el-step title="其他信息"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- tab -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="活动名称" prop="activity_name">
                            <el-input v-model="addForm.activity_name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动描述" prop="activity_desc">
                            <el-input v-model="addForm.activity_desc"></el-input>
                        </el-form-item>
                        <el-form-item label="限制人数" prop="activity_limit_num">
                            <el-input v-model="addForm.activity_limit_num" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="学年学期" prop="activity_term">
                            <el-input v-model="addForm.activity_term"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="其他信息" name="1">
                        <el-form-item label="活动开始时间" prop="activity_start_time" label-width="120px">
                            <el-date-picker
                                    v-model="addForm.activity_start_time"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="活动结束时间" prop="activity_end_time" label-width="120px">
                            <el-date-picker
                                    v-model="addForm.activity_end_time"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="报名截止时间" prop="activity_deadline" label-width="120px">
                            <el-date-picker
                                    v-model="addForm.activity_deadline"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="签到起始时间" prop="activity_signIn_time" label-width="120px">
                            <el-date-picker
                                    v-model="addForm.activity_signIn_time"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="签到结束时间" prop="activity_signOut_time" label-width="120px">
                            <el-date-picker
                                    v-model="addForm.activity_signOut_time"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="签到位置" prop="activity_site" label-width="120px">
                            <el-input v-model="addForm.activity_site"></el-input>
                        </el-form-item>
                        <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom"
                                 :plugin="plugin" :events="events" class="amap-demo">
                        </el-amap>
                        <el-button type="primary" @click="add">添加活动</el-button>
                    </el-tab-pane>
                </el-tabs>

            </el-form>
        </el-card>
    </div>
</template>

<script>
    import VueAMap from 'vue-amap'

    let amapManager = new VueAMap.AMapManager();
    export default {
        data() {
            let self = this
            return {
                activeIndex: '0',
                /*添加活动的表单数据对象*/
                addForm: {
                    activity_name: '',
                    activity_desc: '',
                    activity_limit_num: 0,
                    activity_term: '',
                    activity_start_time: '',
                    activity_end_time: '',
                    activity_deadline: '',
                    activity_signIn_time: '',
                    activity_signOut_time: '',
                    activity_site: ''
                },
                addFormRules: {
                    activity_name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'}
                    ],
                    activity_desc: [
                        {required: true, message: '请输入活动描述信息', trigger: 'blur'}
                    ],
                    activity_limit_num: [
                        {required: true, message: '请输入活动限制人数', trigger: 'blur'}
                    ],
                    activity_term: [
                        {required: true, message: '请输入活动举办的学年学期', trigger: 'blur'}
                    ],
                    activity_start_time: [
                        {type: 'date', required: true, message: '请选择活动开始的时间', trigger: 'change'}
                    ],
                    activity_end_time: [
                        {type: 'date', required: true, message: '请选择活动结束的时间', trigger: 'change'}
                    ],
                    activity_deadline: [
                        {type: 'date', required: true, message: '请选择报名截止的时间', trigger: 'change'}
                    ],
                    activity_signIn_time: [
                        {type: 'date', required: true, message: '请选择签到起始的时间', trigger: 'change'}
                    ],
                    activity_signOut_time: [
                        {type: 'date', required: true, message: '请选择签到结束的时间', trigger: 'change'}
                    ],
                    activity_site: [
                        {required: true, message: '请填写详细的位置信息', trigger: 'blur'}
                    ]

                },
                /*地图相关*/
                amapManager,
                zoom: 16,
                center: [116.343034, 39.950728],
                address: '',
                events: {
                    click(e) {
                        let {lng, lat} = e.lnglat;
                        self.lng = lng
                        self.lat = lat

                        alert('已选择签到位置')
                    }
                },
                lng: 0,
                lat: 0,
                plugin: ['ToolBar', {
                    pName: 'MapType',
                    defaultType: 0,
                    events: {
                        init(o) {
                            console.log(o);
                        }
                    }
                }]
            }
        },
        created() {

        },
        methods: {
            beforeTabLeave(activateName, oldActivateName) {
                if (oldActivateName === '0' && (this.addForm.activity_name.length === 0
                    || this.addForm.activity_desc.length === 0
                    || this.addForm.activity_limit_num === 0
                    || this.addForm.activity_term.length === 0)) {
                    this.$message.error('请优先完成基础信息的填充')
                    return false
                }

                if (oldActivateName === '1' && (this.addForm.activity_start_time === ''
                    || this.addForm.activity_end_time === ''
                    || this.addForm.activity_deadline === ''
                    || this.addForm.activity_signIn_time === ''
                    || this.addForm.activity_signOut_time === ''
                    || this.addForm.activity_site === '')) {
                    this.$message.error('请优先完成其他信息的填充')
                    return false
                }
            },
            add() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return this.$message.error('请填写必要的表单项目')
                    /*执行添加的业务逻辑*/
                    const {data: res} = await this.$http.post('addActivities', {
                        form: this.addForm,
                        loc: {lng: this.lng, lat: this.lat}
                    });
                    if (res.meta.status !== 201) {
                        return this.$message.error('添加活动失败!')
                    }
                    this.$message.success('添加活动成功')
                    await this.$router.push('/workList')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .amap-demo {
        height: 300px;
    }
</style>
