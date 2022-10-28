<template>
    <div class="main">
        <banner />
        <part1 />
        <part2 />
        <part3 />
        <part4 />
        <part5 />
        <part6 />
    </div>
</template>

<script>
import banner from '../view/jxws/banner'
import part1 from '../view/jxws/part1'
import part2 from '../view/jxws/part2'
import part3 from '../view/jxws/part3'
import part4 from '../view/jxws/part4'
import part5 from '../view/jxws/part5'
import part6 from '../view/jxws/part6'
export default {
    components:{
        banner,
        part1,
        part2,
        part3,
        part4,
        part5,
        part6,
    }
}
</script>