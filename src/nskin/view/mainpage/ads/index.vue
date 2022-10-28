<template>
    <div id="ids" @wheel='wheel' @click="click">
        <!-- <div class="top"></div> -->
        <img class="idsmain" @click="toEmpowerment" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/mess.png" >
    </div>
</template>

<script>
export default {
    data(){
        return{
            cando: false
        }
    },
    computed: {
        show:{
            get(){
                return this.$store.state.showads
            },
            set(val){
                this.$store.state.showads = val
            }
        }
    },
    created(){
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        this.$nextTick(()=>{
            setTimeout(()=>{
                document.getElementById('ids').style.zIndex = 990
                this.cando = true
            }, 3000)
        })
    },
    beforeDestroy(){
        document.getElementsByTagName('html')[0].style.overflow = 'auto'
        this.show = false
    },
    methods:{
        toEmpowerment(){
            if(!this.cando) return;
            this.$router.push('/empowerment')
            
        },
        wheel(){
            if(!this.cando) return;
            this.show = false
        },
        click(){
            if(!this.cando) return;
            this.show = false
        }
    }
}
</script>

<style lang='less' scoped>
#ids{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100vh;
    max-width: 100%;
    overflow: hidden;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    background-image: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/bg1.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: 0;
    transition: 5s all ease;
    .top{
        width: 100%;
        height: 79px;
        background: rgba(255, 255, 255, 0.66);
        background: #007EED;
    }
    .idsmain{
        width: 797px;
        height: auto;
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        cursor: pointer;
    }
}
</style>