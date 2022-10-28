<template>
    <div>
        <h1>类型管理</h1>

        <el-table border :data="tableData">
            <el-table-column prop="name" label="类型名称" ></el-table-column>
            <el-table-column prop="logo" label="logo" >
                <template slot-scope="{ row }">
                    <img :src="row.logo" height="30px">
                </template>
            </el-table-column>
            <el-table-column prop="memo" label="备注信息" ></el-table-column>
            <!-- <el-table-column label="操作" >
                <template slot-scope="{ row, index }">
                    <el-button type="primary" @click="update(row,index)">修改</el-button>
                    <el-button type="error" @click="del(row, index)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[
                {
                   name: '高校管理员',
                   logo: 'http://web.moocollege.com/mooc/hzq/operate/service/1.png',
                    id: 1,
                    memo: '尚未开通修改'
                },
                {
                   name: '参赛者',
                   logo: 'http://web.moocollege.com/mooc/hzq/operate/service/2.png',
                    id: 2,
                    memo: '尚未开通修改'
                },
                {
                   name: '主办方',
                   logo: 'http://web.moocollege.com/mooc/hzq/operate/service/3.png',
                    id: 3,
                    memo: '尚未开通修改'
                },
                {
                   name: '评审专家',
                   logo: 'http://web.moocollege.com/mooc/hzq/operate/service/4.png',
                    id: 4,
                    memo: '尚未开通修改'
                },
                {
                   name: '报名管理员',
                   logo: 'http://web.moocollege.com/mooc/hzq/operate/service/5.png',
                    id: 5,
                    memo: '尚未开通修改'
                },
            ],
        }
    }
}
</script>

<style lang='less' scoped>
h1{
    margin: 20px 0;
}

</style>