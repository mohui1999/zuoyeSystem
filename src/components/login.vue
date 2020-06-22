<template>
  <div id="hm-login">
    <div class="container-fluid hidden-xs">
      <div class="row">
        <nav class="cc-nav">
          <ul class="clearfix">
            <li class="pull-left"><a style="color: #5574F7;">HOMI</a></li>
            <li class="pull-left iconfont iconego-menu visible-xs-block"></li>
            <!--            <li class="pull-right"><img src="../img/man-1.png" alt=""></li>-->

<!--            <li class="pull-right hidden-xs"><a>我的</a></li>-->
<!--            <li class="pull-right hidden-xs"><a>首页</a></li>-->
            <li class="pull-right hidden-xs"><a>登录</a></li>

          </ul>
        </nav>
      </div>

    </div>
    <div style="height: 40px;"></div>

    <div class="container-fluid  hidden-xs clearfix">
      <div class="row">
        <!-- 电脑端左边展示部分 -->
        <div class="col-sm-12 col-md-6">
          <div class="login-con">
            <img class="login-img img-rounded " src="http://xiemenglei.cn/wp-content/uploads/2020/06/36564AF02064C7382784339ED2FA178F.jpg">
            <div class="container">
              <div class="carousel-caption" style="letter-spacing: 4px">
                <h1>安徽大学</h1>
                <hr style="width: 100px;border:1px solid #ff4136">
                <p>Anhui University
                </p>
                <img class="login-avatar"  src="http://xiemenglei.cn/wp-content/uploads/2020/06/ahu-img.jpg">
              </div>
            </div>
          </div>
        </div>


        <!-- 电脑端右边登录部分 -->
        <div class="col-sm-12 col-md-6">

          <div class="login-con2">

            <form class="form-horizontal">
              <div class="form-group">
                <label for="inputAccountl3" class="col-md-12 login-text">账号</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" id="inputAccountl3" placeholder="Account" v-model="user">
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword3" class="col-md-12 login-text">密码</label>
                <div class="col-sm-12">
                  <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="password">
                </div>
              </div>


<!--              <div class="col-md-12">-->
<!--                <div class="col-md-6">选择身份：</div>-->
<!--                <select class="col-md-3" name="public-choice" v-model="degree" @change="getselected" >-->
<!--                  <option :value="item.id" v-for="item in peopleList" >{{item.name}}</option>-->
<!--                </select>-->
<!--                <div class="col-md-3"></div>-->

<!--              </div>-->
              <div style="height: 25px"></div>
              <div class="row">
                <div class="col-md-3"></div>
                <el-radio class="col-md-3" style="margin-left: 15px" v-model="degree" label="BKS">学生</el-radio>
                <el-radio class="col-md-3" v-model="degree" label="JS">教师</el-radio>
                <div class="col-md-3"></div>
              </div>



<!--              <div class="form-group" style="margin-right: 170px;">-->
<!--                <div class="container" >-->
<!--                  <div class="col-sm-2 login-text2" >-->
<!--                    <div class="checkbox">-->
<!--                      <label>-->
<!--                        <input type="checkbox"> 记住密码-->
<!--                      </label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="col-sm-3 checkbox" style="margin-right: 170px;">-->
<!--                      <a >忘记密码？</a>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
              <div style="height: 25px"></div>
              <div class="form-group">

                <div class="col-sm-12">
                  <button  v-on:click="loginJudge" class="btn btn-primary2 btn-block">登录</button>
                </div>
<!--                <div class="col-sm-6">-->
<!--                  <button  v-on:click="handleOther" class="btn btn-primary3 btn-block">注册</button>-->
<!--                </div>-->
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>

    <!-- 手机端显示登录界面 -->
    <div class="login-background container-fluid visible-xs-block">
      <div class="row">
        <div class="col-xs-12 text-center">
          <h2 class="phone-head">登录</h2>
        </div>
        <div class="col-xs-12 ">
          <img class="login-avatar2 center-block"  src="http://xiemenglei.cn/wp-content/uploads/2019/07/avatar.jpg">
        </div>

        <div class="col-xs-12 ">
          <form class="form-horizontal ">
            <div class="form-group">
              <div class="col-sm-12">
                <input type="text" class="form-control" id="inputAccount" placeholder="账号">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input type="password" class="form-control" id="inputPassword" placeholder="密码">
              </div>
            </div>
            <div class="form-group col-sm-12" >
              <div class="container" >
                <div class="row">
                  <div class="col-sm-3 login-text2" >
                    <div class="checkbox">
                      <label>
                        <input type="checkbox"> 记住密码
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-3 checkbox" >
                    <a >忘记密码？</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-12">
                <button type="submit" class="btn btn-primary3 btn-block">登录</button>
              </div>
            </div>
          </form>

        </div>

      </div>

    </div>

  </div>
</template>

<script>

    export default {
        name: "login",
      data(){
        return {
          user:'',
          password:'',
          degree:'BKS',
          peopleList:[
            {
              id: 'BKS',
              name: '学生'
            },
            {
              id: 'JS',
              name: '教师'
            }
          ],


        }
      },
      created(){
        //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
        this.degree = this.peopleList[0].id;;
      },
      methods:{
        getselected(){
          //获取选中
          console.log(this.degree)
        },

        loginJudge(){
          var that =this;
          if(that.user==''||that.password==''){
            console.log('用户名密码为空')
            this.$message({
              message: '请输入账户名与密码!',
              type: 'warning'
            });
          }else{
            if(that.user.indexOf("TE") != -1 && that.degree=='JS'){
              console.log("1")
              that.handleLogin();
            }else if(that.user.indexOf("TE") != -1 && that.degree=='BKS'){
              console.log("2")
              this.$message({
                message: '教师用户请选择教师身份登录!',
                type: 'warning'
              });
            }else if(that.user.indexOf("TE") == -1 && that.degree=='JS'){
              console.log("3")
              this.$message({
                message: '学生用户请选择学生身份登录!',
                type: 'warning'
              });
            }else if(that.user.indexOf("TE") == -1 && that.degree=='BKS'){
              console.log("4")
              that.handleLogin();
            }

          }

        },

        handleLogin(){
          //登录函数
          this.$store.state.user = this.user
          this.$store.state.degree = this.degree
          var that = this;
          this.openFullScreen2();
          if(that.degree=='BKS'){

            var data={     //注意：此处不能写 params了
              user: that.user,
                password: that.password,
                choice: 1,
                degree: 'BKS'
            }

            // this.$http.post('https://lzzzzl.top/info',{
            //
            //     user: that.user,
            //     password: that.password,
            //     choice: 1,
            //     degree: 'BKS'
            //
            // },{emulateJSON: true}).then(response => {
            //     console.log("学生登录")
            //     console.log(response)
            //     if ( response.status == 200){
            //       // 如果登录成功，则跳转到主页
            //           this.$message({
            //             message: '登录成功！',
            //             type: 'success'
            //           });
            //       this.$router.push('/home')
            //
            //     }else {
            //       this.$message.error('登录失败！');
            //     }
            //   },
            //   response => {
            //    this.$message.error('请求失败，请稍后再试！');
            //   });
            // console.log("学生登录")
            this.$message({
              message: '登录成功！',
              type: 'success'
            });
            this.$router.push('/home')

          }else if(that.degree=='JS'){

            this.$http.post('https://andatong.top/wxapp/teacher_login',{

                Tno: that.user,
                pwd: that.password,

            },{emulateJSON: true}).then(response => {
                console.log(response)
                console.log('请求成功')
                console.log(response.status)
                if ( response.status == 200){
                  // 如果登录成功，则跳转到主页
                  this.$message({
                    message: '登录成功！',
                    type: 'success'
                  });
                  this.$router.push('/home')

                }else {
                  this.$message.error('登录失败!');
                }

              },
              response => {
                console.log('请求失败,请稍后再试！')
              });

          }
        },
        handleOther(){
          var that = this;
          this.$http.get('https://andatong.top/wxapp/homework_student',{
            params:{
              Sno: 'YA1714192',
              status: '待完成'
            }
          }).then(response => {
              console.log(response)
              console.log('请求成功')
            },
            response => {
              console.log('请求失败')
            });

        },
        openFullScreen2() {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
            loading.close();
          }, 500);
        }
      },

      watch:{//监听数据变化

        user:function(){
           //this.count++;
           console.log(this.user);
          //alert("什么鬼......");
          },
        password:function(){
          //this.count++;
          console.log(this.password);
          //alert("什么鬼......");
        },
        degree:function(){
          //this.count++;
          console.log(this.degree);
          //alert("什么鬼......");
        },

        }

    }

</script>

<style scoped>

</style>
