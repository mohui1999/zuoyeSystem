<template>
<div id="home">
  <!-- 首页内容 -->
  <div class="container" style="margin-bottom: 40px; ">
    <div class="row">
      <div class="allContent">
        <!-- 左边栏 -->
        <div class="col-sm-4 articleType hidden-xs">
          <div>
            <h3 style="font-weight: 600; margin: 0 0 40px 0;">作业</h3>
            <div class="oneOfArticleType clearfix hm-cursor" v-on:click="getList">
              <span>我的作业</span>
              <span class="pull-right">></span>
            </div>
            <div class="oneOfArticleType clearfix hm-cursor">
              <span>我的班级</span>
              <span class="pull-right">></span>
            </div>
            <div v-if="degree==='BKS'" class="oneOfArticleType clearfix hm-cursor" v-on:click="enterClass">
              <span>加入班级</span>
              <span class="pull-right">></span>
            </div>
            <div v-if="degree==='JS'" class="oneOfArticleType clearfix hm-cursor" v-on:click="toSend">
              <span>布置作业</span>
              <span class="pull-right">></span>
            </div>
          </div>
        </div>


        <!-- 作业列表 -->

        <div class="col-sm-8" style="padding:0 25px;" v-if="degree=='BKS'">
          <div class="btn-group" role="group" aria-label="..." style="margin: 25px;" >
            <button type="button" class="btn btn-default" v-on:click="status ='待完成' "
                    @change="getstatus" :style="{'background-color' : status==='待完成' ? '#7BA1C7' : '#FFFFFF'}">待完成</button>
            <button type="button" class="btn btn-default" v-on:click="status ='已完成' "
                    @change="getstatus" :style="{'background-color' : status==='已完成' ? '#7BA1C7' : '#FFFFFF'}">已完成</button>
            <button type="button" class="btn btn-default" v-on:click="status ='已批改' "
                    @change="getstatus" :style="{'background-color' : status==='已批改' ? '#7BA1C7' : '#FFFFFF'}">已批改</button>
          </div>

          <div class="allOfArticle">
            <!--作业-->
            <div class="oneOfArticle" v-for="item in homework_lst" v-on:click="tohmStu(item.homework_id)" >
              <div>
                <p class="hm-cursor">{{item.title}}</p>
                <br>
                <p class="glyphicon glyphicon-book time" style="opacity: 0.5; line-height: 14px;"><span
                  style="vertical-align: top;margin-left: 7px;">{{item.class_name}}</span> </p>
                <br>
                <p class="glyphicon glyphicon-user time" style="opacity: 0.5; line-height: 14px;"><span
                  style="vertical-align: top;margin-left: 7px;">{{item.teacher_name}}</span> </p>
                <br>
                <p class="glyphicon glyphicon-time time" style="opacity: 0.5; line-height: 14px;"><span
                  style="vertical-align: top;margin-left: 7px;">{{item.end_time}}</span> </p>

              </div>
            </div>

          </div>
        </div>
      </div>


<!--      老师-->
      <div class="col-sm-8" style="padding:0 25px;" v-if="degree=='JS'">

        <div class="allOfArticle">
          <!--作业-->
          <div class="oneOfArticle" v-for="item in homework_lst" v-on:click="toPigai(item.homework_id)">
            <div>
              <p class="hm-cursor">{{item.title}}</p>
              <br>
              <p class="glyphicon glyphicon-book time" style="opacity: 0.5; line-height: 14px;"><span
                style="vertical-align: top;margin-left: 7px;">{{item.class_name}}</span> </p>
              <br>
              <p class="glyphicon glyphicon-user time" style="opacity: 0.5; line-height: 14px;"><span
                style="vertical-align: top;margin-left: 7px;">{{item.teacher_name}}</span> </p>
              <br>
              <p class="glyphicon glyphicon-time time" style="opacity: 0.5; line-height: 14px;"><span
                style="vertical-align: top;margin-left: 7px;">{{item.end_time}}</span> </p>

            </div>
          </div>

        </div>
      </div>
    </div>

    </div>
  </div>

</template>

<script>
    export default {
      name: "home",
      data(){
        return {
          homework_lst:null,
          status:'待完成',
          homework_id:'',

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
      this.getList()
      },
      methods:{

        getstatus(){
          //获取选中
          console.log(this.status);

        },

        enterClass(){
          this.$router.push('/enterClass')
        },

        toSend(){
          console.log("发送")
        },

        tohmStu(res){
          console.log(res)
          this.homework_id = res
          this.$store.state.homework_id = res
          this.$router.push('/hmStu')
        },

        toPigai(res){
          console.log(res)
          this.homework_id = res
          this.$store.state.homework_id = res
          this.$router.push('/hmTea')
        },

        getList(){

          var that = this;

          if(that.degree=='JS'){
            this.$http.get('https://andatong.top/wxapp/homework_teacher',{
              params:{
                Tno: that.user,

              }
            }).then(response => {
                console.log('请求成功')
                this.homework_lst = response.body.homework_lst
                console.log(that.homework_lst)
              },
              response => {
                console.log('请求失败')
              });
          }else if(that.degree=='BKS'){
            this.$http.get('https://andatong.top/wxapp/homework_student',{
              params:{
                Sno: that.user,
                status: that.status
              }
            }).then(response => {
                console.log('请求成功')
              console.log(response)
                this.homework_lst = response.body.homework_lst
                console.log(that.homework_lst)
              },
              response => {
                console.log('请求失败')
              });

          }



        }

      },
      watch: {//监听数据变化

        status: function () {
          //this.count++;
          console.log(this.status);
          this.getList();
          //alert("什么鬼......");
        },

      }


    }
</script>

<style scoped>

</style>
