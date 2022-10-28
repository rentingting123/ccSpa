<template>
    <div>
        <el-dialog title="选择区域" :visible.sync="dialogVisible"  width="600px">
            <div>
                <p v-for="list in lists" :key="list.objectId" >
                    <el-radio v-model="choose" :label="list.id" border>{{list.objectName}}</el-radio>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="tohref">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:['close'],
    data(){
        return{
            dialogVisible: true,
            choose: '2375',
            lists:[
                {
                    "objectName": "华北区域（北京、天津、内蒙古、河北、山西）",
                    'id': '2375',
                    "objectId": 'https://cc.moocollege.com/#/details?id=2375',
                    "type": 0
                },
                {
                    "objectName": "华中区域（河南、湖北、湖南、江西）",
                    'id': '2376',
                    "objectId": 'https://cc.moocollege.com/#/details?id=2376',
                    "type": 0
                },
                {
                    "objectName": "华南区域（广东、广西、海南、香港、澳门）",
                    'id': '2377',
                    "objectId": 'https://cc.moocollege.com/#/details?id=2377',
                    "type": 0
                },
                {
                    "objectName": "华东区域（山东、江苏、上海、浙江、安徽、福建、台湾）",
                    'id': '2378',
                    "objectId": 'https://cc.moocollege.com/#/details?id=2378',
                    "type": 0
                },
                {
                    "objectName": "西北区域（新疆、甘肃、青海、宁夏、陕西）",
                    "id": '2379',
                    "objectId": 'https://cc.moocollege.com/#/details?id=2379',
                    "type": 0
                },
                {
                    "objectName": "西南区域（西藏、云南、贵州、四川、重庆）",
                    'id': '2380',
                    "objectId": 'https://cc.moocollege.com/#/details?id=2380',
                    "type": 0
                },
                {
                    "objectName": "东北区域（黑龙江、吉林、辽宁）",
                    'id': '2381',
                    "objectId": 'https://cc.moocollege.com/#/details?id=2381',
                    "type": 0
                },
                {
                    "objectName": "好设计创意奖合作伙伴",
                    'id': '4172',
                    "objectId": 'https://cc.moocollege.com/#/details?id=4172',
                    "type": 0
                },
            ]
        }
    },
    methods:{
        tohref(){
            window.open('https://cc.moocollege.com/#/details?id='+this.choose)
            this.dialogVisible = false
        }
    },
    watch:{
        dialogVisible(val){
            if(!val){
                this.close && this.close();
            }
        }
    }
}
</script>

<style lang="less" scoped>
p{
    margin: 10px 0;
    padding-left: 30px;
}
.el-radio.is-bordered+.el-radio.is-bordered{
    margin-left: 0;
}

</style>