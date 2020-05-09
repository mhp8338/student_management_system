<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区-->
        <el-card>
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
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Detail"
    }
</script>

<style scoped>

</style>
