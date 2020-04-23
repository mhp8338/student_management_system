<template>
    <div>
        <!--面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图-->
        <el-card>
            <!--添加角色按钮区域-->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
                </el-col>
            </el-row>
            <!--角色列表-->
            <el-table :data="roleList" :border="true" :stripe="true">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter']"
                                v-for="(item1,i1) in scope.row.children"
                                :key="item1.id">
                            <!--渲染一级权限-->
                            <el-col :span="5">
                                <el-tag :closable="true" @close="removeRightById(scope.row,item1.id)">
                                    {{item1.authName}}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!--渲染二级和三级权限-->
                            <el-col :span="19">
                                <!--通过for嵌套渲染二级权限-->
                                <el-row :class="[i2===0 ? '':'bdtop','vcenter']" v-for="(item2,i2) in item1.children"
                                        :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag type="success" :closable="true"
                                                @close="removeRightById(scope.row,item2.id)">{{item2.authName}}
                                        </el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!--三级权限-->
                                    <el-col :span="18">
                                        <el-tag v-for="(item3) in item2.children" :key="item3.id" type="warning"
                                                :closable="true" @close="removeRightById(scope.row,item3.id)">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>

                                </el-row>
                            </el-col>
                        </el-row>
                        <!--<pre>{{scope.row}}</pre>-->
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"
                                   @click="removeRoleById(scope.row.id)">删除
                        </el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting"
                                   @click="showSetRightDialog(scope.row)">分配权限
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--添加角色的对话框-->
        <el-dialog
                title="添加角色"
                :visible.sync="addDialogVisible"
                width="50%" @close="addDialogClosed">
            <!--内容主题-->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
        </el-dialog>
        <!--修改角色对话框-->
        <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="50%" @close="editDialogClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="角色名称">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
        <!--分配权限的对话框-->
        <el-dialog
                title="分配权限"
                :visible.sync="setRightDialogVisible"
                width="30%" @close="setRightDialogClosed">
            <!--树型控件-->
            <el-tree :data="rightsList" :props="treeProps" :show-checkbox="true" node-key="id"
                     :default-expand-all="true" :default-checked-keys="defKeys" ref="treeRef"></el-tree>
            <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                /*所有角色列表数据*/
                roleList: [],
                /*控制添加对话框的显示与隐藏*/
                addDialogVisible: false,
                /*添加角色的表单数据*/
                addForm: {
                    roleName: '',
                    roleDesc: ''
                },
                /*验证规则对象*/
                addFormRules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '请用户名的长度在3到10个之间', trigger: 'blur'}
                    ],
                    roleDesc: [
                        {required: false}
                    ]
                },
                editDialogVisible: false,
                editForm: {},
                editFormRules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '请用户名的长度在3到10个之间', trigger: 'blur'}
                    ],
                    roleDesc: [
                        {required: false}
                    ]
                },
                /*控制分配权限对话框的显示与隐藏*/
                setRightDialogVisible: false,
                rightsList: [],
                /*树型控件的属性绑定*/
                treeProps: {
                    label: 'authName',
                    children: 'children'
                },
                /*默认选中的节点id数组*/
                defKeys: [],
                //即将分配权限的ID
                roleId: ''
            }
        },
        created() {
            this.getRolesList()
        },
        methods: {
            /*获取所有角色的列表*/
            async getRolesList() {
                const {data: res} = await this.$http.get('roles');
                if (res.meta.status !== 200) return this.$message.error("获取角色列表失败")
                this.roleList = res.data

                console.log(this.roleList)
            },
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
            },
            /*点击按钮添加新角色*/
            addUser() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return
                    // 发起添加角色的网络请求
                    const {data: res} = await this.$http.post('addRoles', this.addForm)
                    if (res.meta.status !== 201) {
                        this.$message.error('添加角色失败')
                    }
                    this.$message.success('添加角色成功')
                    /*隐藏添加用户的对话框*/
                    this.addDialogVisible = false
                    /*重新获取数据列表*/
                    await this.getRolesList()
                })
            },
            async showEditDialog(id) {
                const {data: res} = await this.$http.get('getrolebyid/' + id)
                if (res.meta.status !== 200) {
                    return this.$message.error("查询角色信息失败")
                }
                this.editForm = res.data
                this.editDialogVisible = true
            },
            /*监听修改角色对话框关闭*/
            editDialogClose() {
                this.$refs.editFormRef.resetFields()
            },
            /*修改用户信息并提交*/
            editUserInfo() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return
                    //发起修改用户信息请求
                    const {data: res} = await this.$http.put('editroleinfobyid/' + this.editForm.id, {
                        email: this.editForm.email,
                        mobile: this.editForm.mobile
                    })
                    if (res.meta.status !== 200) {
                        return this.$message.error('更新角色信息失败')
                    }

                    /*关闭对话框*/
                    this.editDialogVisible = false
                    /*刷新数据列表*/
                    await this.getRolesList()
                    /*提示修改成功*/
                    this.$message.success("更新角色信息成功 ")

                })
            },
            /*通过ID删除角色*/
            async removeRoleById(id) {
                /*弹框询问用户是否删除数据*/
                const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                /*用户确认删除 返回值为confirm 取消为cancel*/
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }
                const {data: res} = await this.$http.delete('deleterole/' + id)
                if (res.meta.status !== 200) {
                    return this.$message.error('删除角色失败')
                }
                this.$message.success('删除角色成功')
                await this.getRolesList()
            },
            /*根据id删除对应的权限*/
            async removeRightById(role, rightId) {
                /*弹框提示用户是否删除*/
                const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)

                if (confirmResult !== 'confirm') return this.$message.info('取消了删除')
                const {data: res} = await this.$http.delete(`rolesright/${role.id}/rights/${rightId}`);
                if (res.meta.status !== 200) {
                    return this.$message.error('删除权限失败')
                }
                role.children = res.data

            },
            /*展示分配权限对话框*/
            async showSetRightDialog(role) {
                this.roleId = role.id
                /*获取所有权限数据*/
                const {data: res} = await this.$http.get('rights/tree');
                if (res.meta.status !== 200) return this.$message.error('获取权限数据失败')
                /*把获取到的权限数据保存至DATA中*/
                this.rightsList = res.data
                /*递归获取三级节点的ID*/
                this.getLeafKeys(role, this.defKeys)
                this.setRightDialogVisible = true
            },
            /*通过递归形式，获取所有三级权限I，并保存到数组*/
            getLeafKeys(node, arr) {
                if (!node.children) {
                    return arr.push(node.id)
                }
                node.children.forEach(item => this.getLeafKeys(item, arr))
            },
            /*监听分配权限对话框的关闭事件*/
            setRightDialogClosed() {
                this.defKeys = []

            },
            /*点击确定为角色分配权限*/
            async allotRights() {
                const keys = [
                    ...this.$refs.treeRef.getCheckedKeys(),
                    ...this.$refs.treeRef.getHalfCheckedKeys()
                ]
                console.log(keys)
                const idStr = keys.join(',')
                const {data: res} = await this.$http.post(`addRightToRoles/${this.roleId}/rights`, idStr);
                if (res.meta.status !== 200) {
                    return this.$message.error('分配权限失败')
                }
                this.$message.success('分配权限成功')
                await this.getRolesList()
                this.setRightDialogVisible = false


            }
        }
    }
</script>

<style lang="less" scoped>
    .el-tag {
        margin: 7px
    }

    .bdtop {
        border-top: 1px solid #eeeeee;
    }

    .bdbottom {
        border-bottom: 1px solid #eeeeee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }

</style>
