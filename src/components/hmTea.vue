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

    <!-- 作业详情内容 -->
    <div class="container" style="margin-bottom: 40px; ">
      <div class="row">
        <div class="detail-container articleType col-sm-12 col-md-5 hm-left">
          <div class="oneOfArticle">

            <h3>{{homeworks.title}}</h3>
            <p>{{homeworks.content}}</p>
            <br>
            <p class="glyphicon glyphicon-book time" style="opacity: 0.5; line-height: 14px;"><span
              style="vertical-align: top;margin-left: 7px;">{{homeworks.class_name}}</span> </p>
            <br>
            <p class="glyphicon glyphicon-user time" style="opacity: 0.5; line-height: 14px;"><span
              style="vertical-align: top;margin-left: 7px;">{{homeworks.teacher}}</span> </p>
            <br>
            <p class="glyphicon glyphicon-time time" style="opacity: 0.5; line-height: 14px;"><span
              style="vertical-align: top;margin-left: 7px;">{{homeworks.end_time}}</span> </p>
          </div>

          <!--        学生列表-->
          <div class="oneOfArticle">
            <h3>学生列表</h3>
          </div>
          <div>
            <div class="stu-item col-md-12 hm-cursor hm-bg hm-stuitem" v-for="(item,index) in homeworks.student_answers" v-on:click="getanswerdetail(item,index)">
              <div style="height: 10px"></div>
              <div class="col-sm-5 col-md-5">
                <p class="el-icon-user time" style=" line-height: 14px;"><span
                  style="vertical-align: top;margin-left: 7px;">{{item.student_name}}</span> </p>
                <br>
                <p class="el-icon-magic-stick time" style=" line-height: 14px;"><span
                  style="vertical-align: top;margin-left: 7px;">{{item.student_Sno}}</span> </p>
                <!--              <p>{{item.student_name}}</p>-->
                <!--              <p>{{item.student_Sno}}</p>-->
              </div>
              <div class="col-sm-3 col-md-3">
                <span class="label label-success pull-right" v-if="item.status==='已完成'">未批改</span>
                <span class="label label-danger pull-right" v-if="item.status==='待完成'">未完成</span>
                <span class="label label-primary pull-right" v-if="item.status==='已批改'">{{item.grade}}</span>
              </div>
              <div class="col-sm-3 col-md-3"></div>
            </div>
            <br>
          </div>


        </div>



        <div class="detail-container col-sm-12 col-md-7 hm-right">
          <!--        学生回答与批改区域-->
          <div style="color: #414141;margin: 25px;" v-if="answerdetail===''">点击左方学生姓名，可查看学生作业与批改。</div>
          <!--已经回答的区域-->
          <div class="oneOfArticle"  v-if="answerdetail!=''">

            <h3>学生回答</h3>
            <p class="el-icon-user time" style=" line-height: 14px;"><span
              style="vertical-align: top;margin-left: 7px;">{{answerdetail.student_name}}</span> </p>
            <br>
            <p class="el-icon-magic-stick time" style=" line-height: 14px;"><span
              style="vertical-align: top;margin-left: 7px;">{{answerdetail.student_Sno}}</span> </p>
            <br>
            <p>{{answerdetail.content}}</p>
            <div v-for="item in answerdetail.image">
              <img :src="item" class="this-img" alt="作业图片">
            </div>
          </div>
          <!--  评分区域-->
          <div class="oneOfArticle" v-if="answerdetail.status==='已批改'">

            <h3>已改成绩</h3>
            <h4>分数:{{answerdetail.grade}}</h4>
            <h4>评语</h4>
            <p>{{answerdetail.content_from_teacher}}</p>
          </div>

          <div class="oneOfArticle"  v-if="answerdetail!=''">
            <h3>提交成绩</h3>
            <form class="form-inline">
              <div class="form-group">
                <label for="exampleInputName2">分数</label>
                <input type="text" class="form-control" v-model="score" id="exampleInputName2" placeholder="0--100">
              </div>
            </form>
            <br>
            <p>评语</p>
            <textarea class="form-control" rows="5" v-model="teaContext"></textarea>
            <br>
            <p>
              <button type="button" class="btn btn-primary" v-on:click="sendScore">  提  交  </button>
            </p>

            <br>

          </div>

        </div>



      </div>
    </div>

  </div>




</template>

<script>
    export default {
        name: "hmTea",
      data(){
        return {
          homeworks:null,
          answerdetail:'',
          index: -1,
          teaContext:'',
          score:''
        }
      },
      computed: {
        user () {
          return this.$store.state.user
        },
        degree () {
          return this.$store.state.degree
        },
        homework_id () {
          return this.$store.state.homework_id
        }
      },
      created: function() { //打开组件即运行
        var that = this;
        console.log(that.answerdetail)
        this.getHmtea();

      },
      watch:{
        answerdetail:function(){
          //this.count++;
          console.log(this.answerdetail);

        }

      },
      methods:{

        getanswerdetail(item,index){
          var that =this;
          that.answerdetail=item;
          that.index = index;
          that.teaContext='';
          that.score=''


        },

          sendScore(){
            var that=this;
            console.log(that.answerdetail.answer_id)
            console.log(that.score)
            console.log(that.teaContext)
            if(this.score!=''){

              this.$http.post('https://andatong.top/wxapp/set_home_grade',{

                answer_id: that.answerdetail.answer_id,
                grade: that.score,
                content_from_teacher: that.teaContext

              },{emulateJSON: true}).then(response => {
                  console.log("分数提交")
                  console.log(response)
                  if ( response.status == 200&&response.body.status=='success'){
                    // 如果登录成功，则跳转到主页
                    this.$message({
                      message: '提交成功！',
                      type: 'success'
                    });
                    this.getHmtea();

                  }else {
                    this.$message.error('提交失败，请稍后再试！');
                  }
                },
                response => {
                  this.$message.error('提交失败，请稍后再试！');
            });
              console.log("学生登录")

            }else{
              this.$message({
                message: '未填分数!',
                type: 'warning'
              });
            }

          },

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

          getHmtea(){
              var that =this;
            this.$http.get('https://andatong.top/wxapp/singl_homework_info',{
              params:{
                homework_id: that.homework_id,
                character: "teacher",

              }
            }).then(response => {
                if(response.status==200){
                  console.log('请求成功')

                  console.log(response)
                  that.homeworks=response.body
                  if(that.index!=-1){
                    that.answerdetail = response.body.student_answers[that.index]
                  }
                }else{
                  alert("加载失败，请重试")
                }
              },
              response => {
                alert("加载失败，请重试")
              });
          }

      }
    }
</script>

<style scoped>

  .this-img{
    max-width: 100%;
    max-height: 100%;
  }

  .hm-left, .hm-right {
    width: 50%;
    height: 100vh;
    overflow: auto;
  }
  .hm-stuitem{
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;

    border-radius: 10px;

  }

</style>
