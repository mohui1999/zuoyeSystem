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

      <div class="container">
        <div class="row">
          <div style="height: 100px;"></div>
          <div class="col-md-4 col-sm-2"></div>
          <div class="col-md-4 col-sm-10">
            <div>
              <div class="oneOfArticle">
                <div>
                  <h3>加入班级</h3>
                  <br>
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">班级号</label>
                      <input class="form-control" id="exampleInputEmail1" placeholder="班级号" v-model="classid">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">真实姓名</label>
                      <input class="form-control" id="exampleInputPassword1" placeholder="姓名" v-model="stuname">
                    </div>

                  </form>
                  <div style="height: 30px;"></div>
                  <button type="button" class="btn btn-primary btn-md btn-block" v-on:click="toClass">加    入</button>
                  <br>

                </div>
              </div>

            </div>

          </div>
          <div class="col-md-4 col-sm-2"></div>

        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: "enterClass",
      data(){
        return {
          classid:'',
          stuname:'',


        }
      },

      computed: {
        user () {
          return this.$store.state.user
        },

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

        toClass(){
          console.log(this.user)
          console.log(this.stuname)

          var that = this;
          if(that.stuname!=''&&that.classid!=''){
            //不空，注册学生与班级

            this.$http.post('https://andatong.top/wxapp/create_student',{
                Sno: this.user,
                name: this.stuname,
                userAvatar: 'http://xiemenglei.cn/wp-content/uploads/2019/10/avator4.png',
            },{emulateJSON: true}).then(response => {
                console.log("注册学生")
                console.log(response)
                if ( response.status == 200 && response.body.status=="success"){
                  //注册加入班级
                  this.$http.post('https://andatong.top/wxapp/class_api',{
                    Sno: this.user,
                    character: "student",
                    class_id: that.classid,
                  },{emulateJSON: true}).then(response => {
                      console.log("注册班级")
                      console.log(response)
                      if ( response.status == 200 && response.body.status=="success"){
                        // this.$router.push('/home')
                        this.$message({
                          message: '加入班级成功！',
                          type: 'success'
                        });

                      }else {
                        this.$message.error('加入班级失败，请稍后再试！');
                      }
                    },
                    response => {
                      this.$message.error('加入班级失败，请稍后再试！');
                    });

                }else {
                  this.$message.error('加入班级失败，请稍后再试！');
                }
              },
              response => {
                this.$message.error('加入班级失败，请稍后再试！');
              });

          }else{
            this.$message({
              message: '信息填写不完整!',
              type: 'warning'
            });
          }

        }
      }



    }
</script>

<style scoped>

</style>
