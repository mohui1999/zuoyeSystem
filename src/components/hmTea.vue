<template>
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
              <p>{{item.student_name}}</p>
              <p>{{item.student_Sno}}</p>
            </div>
            <div class="col-sm-3 col-md-3">
              <span class="label label-success pull-right" v-if="item.status==='已完成'">未批改</span>
              <span class="label label-danger pull-right" v-if="item.status==='待完成'">未完成</span>
              <span class="label label-primary pull-right" v-if="item.status==='已批改'">{{item.grade}}</span>
            </div>
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
                    alert("提交成功")
                    this.getHmtea();

                  }else {
                    this.$message.error('失败');
                  }
                },
                response => {
                  console.log('请求失败')
                });
              console.log("学生登录")

            }else{
              alert("未填分数！")
            }

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
