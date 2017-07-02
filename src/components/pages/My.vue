<template>
    <div>
        123
        <Header :text="msg" :num="nos" @emits="listen"></Header>
    </div>

</template>

<script>
    export default{
        data(){
            return {
                msg:'您',
                nos:233,
                mm:'',
            }
        },
        methods:{
            listen(mm){
                // this.gets=mm
                this.mm = mm;
                console.log(this.mm)
            }
        }
    }
</script>