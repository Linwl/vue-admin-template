<template>
  <div>
    <ButtonGroup v-for="(item,index) in buttonList" :key="index">
        <Button :type="item.type" :ghost="item.ghost" @click="item.click" :disabled="item.disabled">{{item.name}}</Button>
    </ButtonGroup>
    <br><br>
  </div>
</template>

<script>
export default {
  name: 'topmenu',
  props: {
    buttonList:{
      type:Array,
      default:[]
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>