<template>
  <div>

    <div class="container-fluid hidden-xs">
      <div class="row">
        <nav class="cc-nav">
          <ul class="clearfix">
            <li class="pull-left"><a style="color: #5574F7;" v-on:click="toHome">HOMI</a></li>
            <li class="pull-left iconfont iconego-menu visible-xs-block"></li>
            <!--            <li class="pull-right"><img src="../img/man-1.png" alt=""></li>-->

            <li class="pull-right hidden-xs" v-on:click="loginOut"><a>退出登录</a></li>
            <li class="pull-right hidden-xs" v-on:click="toHome"><a>首页</a></li>
            <!--          <li class="pull-right hidden-xs"><a>登录</a></li>-->

          </ul>
        </nav>
      </div>

    </div>
    <div style="height: 40px;"></div>

    <div style="height: 20px;"></div >

    <div class="col-md-1"></div>
    <div class="col-md-10">
      <div class="col-md-4" v-for="item in classList">
        <div class="col-md-1"></div>
        <div class="hm-cla-con col-md-10" style="margin-bottom: 30px">
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
        toHome(){
          this.$router.push('/home')
        },

        loginOut(){

          this.$confirm('是否退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.state.user = this.user
            this.$store.state.degree = this.degree
            this.$router.push('/')
            this.$message({
              type: 'info',
              message: '已登出'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消登出'
            });
          });


        },

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
