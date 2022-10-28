<template>
    <div>
        <three :skin="skin" :blockRow="blockRow" :total="total" v-if="type==3"/>
        <four :skin="skin" :blockRow="blockRow" v-if="type==4"/>
        <five :skin="skin" :blockRow="blockRow" v-if="type==5"/>

        <!-- 管理人员可编辑 -->
        <div v-if="$store.state.skin.adminRole" class="edit">
            <edit :type="type" :skin="skin" :editOk="skin2" :models="model"></edit>
        </div>
    </div>
</template>


<script>
import jxapi from "@/api/index";
import edit from "./edit";
import three from './entryThree'
import four from './entryFour'
import five from './entryFive'
export default {
    props:['setbg','setModel'],
    data(){
        return{
            skin:{},
            type:'3',
            blockRow:[1,2,3],
            total:0,
            model: '0'
        }
    },
    methods:{
        async skin2() {
            this.total = 0
            let _skin = await jxapi.skinGet({ data: { type: 3 } });
            if (_skin == "error") return;
            this.skin = _skin || {};
            if(this.skin.colorbg){
                this.setbg && this.setbg(this.skin.colorbg)
            }else{
                this.setbg && this.setbg()
            }
            if(this.skin.guide) this.total++;
            if(this.skin.manual) this.total++;
            if(this.skin.signup) this.total++;

            this.type = this.skin.types
            this.model = this.skin.model
            this.setModel && this.setModel(this.model)
            
            this.blockRow = this.skin.blockRow&&this.skin.blockRow.split(',')||[1,2,3]
        },
    },
    async created(){
        this.skin2();
    },
    components:{
        edit,
        three,
        four,
        five,
    }
}
</script>

<style lang="less" scoped>
.edit {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
}
</style>
