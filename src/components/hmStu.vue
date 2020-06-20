<template>
    <div>
      <!-- 作业详情内容 -->
      <div class="container" style="margin-bottom: 40px; ">
        <div class="row">
          <div class="detail-container col-sm-5 col-md-5 articleType">
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
            <!--  评分区域-->
            <div class="oneOfArticle" v-if="homeworks.student_answers[0].status==='已批改'">

              <h3>成绩</h3>
              <h4>分数:{{homeworks.student_answers[0].grade}}</h4>
              <h4>评语</h4>
              <p>{{homeworks.student_answers[0].content_from_teacher}}</p>
            </div>
          <!--已经回答的区域-->
            <div class="oneOfArticle" >

              <h3>我的回答</h3>
              <p>{{homeworks.student_answers[0].content}}</p>
              <div v-for="item in homeworks.student_answers[0].image">
                <img :src="item" class="this-img" alt="作业图片">
              </div>
            </div>


          </div>

          <div class="detail-container col-sm-7 col-md-7">
            <div class="oneOfArticle">

              <h3>答题区域</h3>
              <br>
              <textarea class="form-control" rows="10" v-model="answer"></textarea>
              <br>
              <div class="form-group">
                <label for="exampleInputFile">图片上传</label>
                <input type="file" id="exampleInputFile">
                <!--                    <p class="help-block">Example block-level help text here.</p>-->
              </div>
              <br>
              <p>
                <button type="button" class="btn btn-primary">  提  交  </button>
              </p>

            </div>

          </div>



        </div>
      </div>


    </div>
</template>

<script>
    export default {
        name: "hmStu",
      data(){
        return {
          homeworks:'',
          answer:'',


        }
      },

      computed: {
        user () {
          return this.$store.state.user
        },
        homework_id () {
          return this.$store.state.homework_id
        },

      },
      created: function() { //打开组件即运行
        var that = this;
        this.getHomework()
      },

      methods:{

        getHomework(){
          var that =this;
          this.$http.get('https://andatong.top/wxapp/singl_homework_info',{
            params:{

              Sno: that.user,
              character: "student",
              homework_id: that.homework_id,

            }
          }).then(response => {
            if(response.status==200){
              console.log('请求成功')

              console.log(response)
              that.homeworks=response.body
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

</style>
