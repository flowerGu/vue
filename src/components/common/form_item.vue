<template>
    <div class="form_item">
        <label :for="name" :class="itemCls"></label>
        <input 
            type="text" 
            v-if="curType=='text'" 
            :name="name" 
            :placeholder="placeh" 
            v-model="model" 
            @input="handleInput"
            @keyup="handleKeyup"
            @blur="handleBlur"
            />
        <input 
            type="password" 
            v-if="curType=='password'" 
            :name="name" 
            :placeholder="placeh" 
            v-model="model" 
            @input="handleInput"
            @keyup="handleKeyup"
            @blur="handleBlur"
            />
        <span v-if="showEye" :class="eye?'me-ion-eye':'me-ion-eye-disabled'" @click="modi_type"></span>
    </div>
</template>

<script>
    export default{
        props:{
            type:{
                type:String,
                default:'text'
            },
            itemCls:String,
            name:String,
            vModel:String,
            placeh:String,
            showEye:Boolean,
            eye_status:Boolean      
        },
        data(){
            return {
               model:this.vModel,
               eye:this.eye_status,
               curType:this.type          
            }
        },
        methods:{
            modi_type(){
                this.curType = this.curType=='text'?'password':'text';
                this.eye=!this.eye;
            },
            handleInput(event){
                var value = event.target.value;
                this.$emit("input",value);
                this.$emit('change',value);
            },
            handleKeyup(event){
                var value = event.target.value;                
                this.$emit("keyup",value);
            },
            handleBlur(event){;
                var value = event.target.value;
                this.$emit("blur",value);
            }
        },
        mounted(){
        }
    }
</script>

<style>
    .form_item{
        position:relative;
        padding:.57rem 0;
        position: relative;
        border-top: 2px solid #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
        padding-left:.5rem;
        text-align:left;
        label{
            text-align:center;
            vertical-align: middle;
            color:#969696;
            height:36px;
            width:40px;
            padding-left:.5rem;
        }
        input{
            vertical-align: middle;
            font-size:.7rem;
            margin-left:1rem;
            border:none;
        }
        span{
            position:absolute;
            right:2%;
            top:50%;
            font-size: 1.2rem;
            transform: translateY(-50%);
            color:#e2e2e2;
        }
  }
</style>