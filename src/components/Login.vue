<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!--登陆表单区-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghuming"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima"
                              type="password"></el-input>
                </el-form-item>
                <!--按钮区-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                /*登陆表单的数据绑定对象*/
                loginForm: {
                    username: '',
                    password: ''
                },
                /*表单的验证规则对象*/
                loginFormRules: {
                    /*验证用户名是否合法*/
                    username: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度为11位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在6到15之间', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            resetLoginForm() {
                // console.log(this)
                this.$refs.loginFormRef.resetFields();
            },
            login() {
                this.$refs.loginFormRef.validate(async (valid) => {
                    if (!valid) return;
                    const {data: res} = await this.$http.post('login', this.loginForm);
                    if (res.meta.status !== 200) return this.$message.error('登陆失败')
                    this.$message.success('登陆成功')


                    /*1. 登陆成功后的token，保存至客户端的sessionStorage(会话期间存储)
                    * （1）只能访问登陆API
                    * （2）只应在当前网站打开时生效
                    * 2. 通过编程式导航跳转到后台主页，路由地址 /home
                    * */
                    // res.data.token
                    window.sessionStorage.setItem('token', res.data.token)
                    await this.$router.push("/home")


                });
            }
        }
    };
</script>

<style lang="less" scoped>

    .login_container {
        background: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #dddddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #eeeeee;
        }
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

</style>
