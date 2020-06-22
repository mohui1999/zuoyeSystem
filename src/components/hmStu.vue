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
<!--              <el-upload-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                list-type="picture-card"-->
<!--                :on-preview="handlePictureCardPreview"-->
<!--                :on-remove="handleRemove">-->
<!--                <i class="el-icon-plus"></i>-->
<!--              </el-upload>-->

              <p style="font-weight: bold">图片上传</p>
              <div>
                <div>
                  <el-upload
                    class="upload-demo"
                    action="https://andatong.top/wxapp/upload_img"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"

                    :limit="3"
                    :multiple="true"
                    :on-success="onSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，数量不超过三张，且不超过2Mb</div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </div>

              <br>
              <div style="height: 10px;"></div>
              <p>
                <el-button type="primary" v-on:click="toSubmit"> 提 交 <i class="el-icon-upload el-icon--right"></i></el-button>
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
          imgUrl:[],
          fileList:[],
          img1:'',
          img2:'',
          img3:'',
          dialogImageUrl: '',
          dialogVisible: false


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

      methods: {

        getHomework() {
          var that = this;
          this.$http.get('https://andatong.top/wxapp/singl_homework_info', {
            params: {

              Sno: that.user,
              character: "student",
              homework_id: that.homework_id,

            }
          }).then(response => {
              if (response.status == 200) {
                console.log('请求成功')

                console.log(response)
                that.homeworks = response.body
              } else {
                alert("网络异常，请重试")
              }
            },
            response => {
              alert("加载失败，请重试")
            });

        },
        handleRemove(file, fileList) {
          console.log(file, fileList)
          if(file.response[0].img_path==this.img1){
            this.img1=''
          }else if(file.response[0].img_path==this.img2){
            this.img2=''
          }else if(file.response[0].img_path==this.img3){
            this.img3=''
          }
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;

        },
        handlePreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        onSuccess:function(res){
          console.log(res);
          if(this.img1==""){
            this.img1=res[0].img_path;
          }else if(this.img2==""){
            this.img2=res[0].img_path;
          }else if(this.img3==""){
            this.img3=res[0].img_path;
          }


        },
        beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
          // console.log(file);
          const isJPG = true;
          // const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        handleExceed(files, fileList) {//图片上传超过数量限制
          this.$message.error('上传图片不能超过3张!');
          // console.log(file, fileList);
        },
        imgUploadError(err, file, fileList){//图片上传失败调用
          console.log(err)
          this.$message.error('上传图片失败!');
        },

        toSubmit(){
          //提交作业
          var that = this;
          if(this.answer==''&&this.img1==''&&this.img2==''&&this.img3==''){

            this.$message({
              message: '没有填写答案哦!',
              type: 'warning'
            });
          }else{
            this.$http.post('https://andatong.top/wxapp/homework_student',{
              Sno: that.user,
              homework_id: that.homework_id,
              content: that.answer,
              img1: that.img1,
              img2: that.img2,
              img3: that.img3

            },{emulateJSON: true}).then(response => {
                console.log("提交作业")
                console.log(response)
                if ( response.status == 200 && response.body.status=="success"){
                  this.$message({
                    message: '作业提交成功！',
                    type: 'success'
                  });
                  this.getHomework()
                }else {
                  this.$message.error('提交失败，请稍后再试！');
                }
              },
              response => {
                console.log('请求失败');
                this.$message.error('提交失败，请稍后再试！');
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

      },
      watch:{
        img1:function(){
          //this.count++;
          console.log(this.img1);

        },
        img2:function () {
          console.log(this.img2)
        },
        img3:function () {
          console.log(this.img3)
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
