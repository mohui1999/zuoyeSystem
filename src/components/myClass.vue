<template>
  <div>
    <div style="height: 20px;"></div >

    <div class="col-md-1"></div>
    <div class="col-md-10">
      <div class="col-md-4" v-for="item in classList">
        <div class="col-md-1"></div>
        <div class="hm-cla-con col-md-10">
          <p class="glyphicon glyphicon-book time" style="opacity: 0.9; line-height: 14px;"><span
            style="vertical-align: top;margin-left: 7px;">{{item.class_name}}</span> </p>
          <br>
          <p class="glyphicon glyphicon-user time" style="opacity: 0.9; line-height: 14px;"><span
            style="vertical-align: top;margin-left: 7px;">{{item.teacher_lst[0]}}</span> </p>
        </div>
        <div class="col-md-1"></div>
      </div>

    </div>
    <div class="col-md-1"></div>

  </div>
    
</template>

<script>
    export default {
        name: "myClass",
      data(){
        return {
          classList:'',

        }
      },
      computed: {
        user () {
          return this.$store.state.user
        },
        degree () {
          return this.$store.state.degree
        }
      },
      created: function() { //打开组件即运行
        var that = this;
        this.getclassList()
      },

      methods:{
        getclassList(){
          var that = this;
          if (that.degree=='BKS'){
            this.$http.get('https://andatong.top/wxapp/class_api',{
              params:{
                Sno: that.user,
                all_or_my: "my",
                character: "student",
              }
            }).then(response => {
                if(response.status==200){
                  console.log('请求成功')
                  console.log(response)
                  this.classList = response.body.class_lst
                  console.log(that.classList)

                }else{
                  alert("加载失败，请重试！")
                }
              },
              response => {
                console.log('请求失败')
              });

          }else if(that.degree=='JS'){
            this.$http.get('https://andatong.top/wxapp/class_api',{
              params:{
                Tno: that.user,
                all_or_my: "my",
                character: "teacher",
              }
            }).then(response => {
                if(response.status==200){
                  console.log('请求成功')
                  console.log(response)
                  this.classList = response.body.class_lst
                  console.log(that.classList)

                }else{
                  alert("加载失败，请重试！")
                }
              },
              response => {
                console.log('请求失败')
              });

          }
        }

      }


    }
</script>

<style scoped>

  .hm-cla-con{
    padding: 15px;
    border-radius: 10px;
    background-color: #dbdcde;
  }

</style>
