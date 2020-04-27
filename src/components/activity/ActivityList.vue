<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区-->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" :clearable="true" @clear="getActivityList">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddPage">添加活动</el-button>
                </el-col>
            </el-row>
            <!--table表格区域-->
            <el-table :data="activityList" :border="true" :stripe="true">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="活动名称" prop="activity_name"></el-table-column>
                <el-table-column label="活动说明" prop="activity_desc"></el-table-column>
                <el-table-column label="报名截止时间" prop="activity_deadline">
                    <template slot-scope="scope">{{scope.row.activity_deadline | dataFormat}}</template>
                </el-table-column>
                <el-table-column label="签到位置"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!--编辑按钮-->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="showEditDialog(scope.row.id)"></el-button>
                        <!--删除按钮-->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="removeById(scope.row.activity_id)"></el-button>
                        <el-tooltip effect="dark" content="活动详情" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-document" size="mini"
                                       @click="showDetailDialog(scope.row.activity_id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页区-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total" :background="true">
            </el-pagination>
        </el-card>

        <!--修改活动对话框-->
        <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="60%" @close="editDialogClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="110px">
                <el-form-item label="活动名称" prop="activity_name" label-width="110px">
                    <el-input v-model="editForm.activity_name"></el-input>
                </el-form-item>
                <el-form-item label="活动描述" prop="activity_desc" label-width="110px">
                    <el-input v-model="editForm.activity_desc"></el-input>
                </el-form-item>
                <el-form-item label="限制人数" prop="activity_limit_num" label-width="110px">
                    <el-input v-model="editForm.activity_limit_num"></el-input>
                </el-form-item>
                <el-form-item label="学年学期" prop="activity_term" label-width="110px">
                    <el-input v-model="editForm.activity_term"></el-input>
                </el-form-item>
                <el-form-item label="活动开始时间" prop="activity_start_time" label-width="110px">
                    <el-date-picker
                            v-model="editForm.activity_start_time"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="活动结束时间" prop="activity_end_time" label-width="110px">
                    <el-date-picker
                            v-model="editForm.activity_end_time"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="报名截止时间" prop="activity_deadline" label-width="110px">
                    <el-date-picker
                            v-model="editForm.activity_deadline"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签到起始时间" prop="activity_signIn_time" label-width="110px">
                    <el-date-picker
                            v-model="editForm.activity_signIn_time"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签到结束时间" prop="activity_signOut_time" label-width="110px">
                    <el-date-picker
                            v-model="editForm.activity_signOut_time"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签到位置" prop="activity_site" label-width="110px">
                    <el-input v-model="editForm.activity_site"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!--活动详情对话框-->
        <el-dialog
                title="活动详情"
                :visible.sync="detailDialogVisible"
                width="60%" @close="editDialogClose">
            <div>
                <p>活动名称：{{editForm.activity_name}}</p>
                <p>活动描述：{{editForm.activity_desc}}</p>
                <p>限制人数：{{editForm.activity_limit_num}}</p>
                <p>学年学期：{{editForm.activity_term}}</p>
                <p>活动开始时间：{{editForm.activity_start_time| dataFormat}}</p>
                <p>活动结束时间：{{editForm.activity_end_time| dataFormat}}</p>
                <p>报名截止时间：{{editForm.activity_deadline| dataFormat}}</p>
                <p>签到起始时间：{{editForm.activity_signIn_time| dataFormat}}</p>
                <p>签到结束时间：{{editForm.activity_signOut_time| dataFormat}}</p>
                <p>签到位置：{{editForm.activity_site}}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                /*查询参数对应对象*/
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                /*活动列表*/
                activityList: [],
                /*总数据条数*/
                total: 0,
                /*控制编辑对话框的弹出*/
                editDialogVisible: false,
                detailDialogVisible: false,
                editForm: {},
                editFormRules: {
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
                        {required: true, message: '请输入签到位置', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getActivityList()
        },
        methods: {
            /*根据分也获取对应的活动列表*/
            async getActivityList() {
                const {data: res} = await this.$http.get('activity', {params: this.queryInfo});
                if (res.meta.status !== 200) return this.$message.error('获取活动列表失败')
                this.$message.success('获取活动列表成功')
                console.log(res.data)
                this.activityList = res.data.activities
                this.total = res.data.total
            },
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getActivityList()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage
                this.getActivityList()
            },
            async removeById(id) {
                const confirmResult = await this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') return this.$message.info('已经取消删除')
                const {data: res} = await this.$http.delete(`deleteActivitiesById/${id}`);
                if (res.meta.status !== 200) return this.$message.error('删除失败')
                this.$message.success('删除成功')
                await this.getActivityList()
            },
            goAddPage() {
                this.$router.push('/workList/add')
            },
            /*监听修改用户对话框关闭*/
            editDialogClose() {
                this.$refs.editFormRef.resetFields()
            },
            async showEditDialog(id) {
                const {data: res} = await this.$http.get('getactivitybyid/' + id)
                if (res.meta.status !== 200) {
                    return this.$message.error("查询活动信息失败")
                }
                this.editForm = res.data
                this.editDialogVisible = true
            },
            async showDetailDialog(id) {
                const {data: res} = await this.$http.get('getactivitybyid/' + id)
                if (res.meta.status !== 200) {
                    return this.$message.error("查询活动信息失败")
                }
                this.editForm = res.data
                this.detailDialogVisible = true
            },
            /*修改用户信息并提交*/
            editUserInfo() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return
                    //发起修改用户信息请求
                    const {data: res} = await this.$http.put('editactivityinfobyid/' + this.editForm.id, {
                        activity_name: this.editForm.activity_name,
                        activity_desc: this.editForm.activity_desc,
                        activity_limit_num: this.editForm.activity_limit_num,
                        activity_term: this.editForm.activity_term,
                        activity_start_time: this.editForm.activity_start_time,
                        activity_end_time: this.editForm.activity_end_time,
                        activity_deadline: this.editForm.activity_deadline,
                        activity_signIn_time: this.editForm.activity_signIn_time,
                        activity_signOut_time: this.editForm.activity_signOut_time,
                        activity_site: this.editForm.activity_site

                    })
                    if (res.meta.status !== 200) {
                        return this.$message.error('更新活动信息失败')
                    }

                    /*关闭对话框*/
                    this.editDialogVisible = false
                    /*刷新数据列表*/
                    await this.getActivityList()
                    /*提示修改成功*/
                    this.$message.success("更新活动信息成功 ")

                })

            }
        }
    }
</script>

<style lang="less" scoped>

</style>
