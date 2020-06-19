<template>
  <div id="hm-login">
    <div class="container-fluid  hidden-xs clearfix">
      <div class="row">
        <!-- 电脑端左边展示部分 -->
        <div class="col-sm-12 col-md-6">
          <div class="login-con">
            <img class="login-img img-rounded " src="http://xiemenglei.cn/wp-content/uploads/2019/07/190707.jpg">
            <div class="container">
              <div class="carousel-caption" style="letter-spacing: 4px">
                <h1>安徽大学</h1>
                <hr style="width: 100px;border:1px solid #ff4136">
                <p>Anhui University
                </p>
                <img class="login-avatar"  src="http://xiemenglei.cn/wp-content/uploads/2019/07/avatar.jpg">
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
<!--               下拉选择菜单-->
<!--              <div class="btn-group">-->
<!--                <button type="button" class="pbtn btn-default drodown-toggle" data-toggle="dropdown"-->
<!--                        aria-haspopup="true" aria-expanded="false">-->
<!--                  选择身份 <span class="caret"></span>-->
<!--                </button>-->
<!--                <ul class="dropdown-menu">-->
<!--                  <li><a href="#">学生</a></li>-->
<!--                  <li><a href="#">教师</a></li>-->
<!--                </ul>-->
<!--              </div>-->

              <div class="col-md-12">
                <div class="col-md-6">选择身份：</div>
                <select class="col-md-3" name="public-choice" v-model="degree" @change="getselected" >
                  <option :value="item.id" v-for="item in peopleList" >{{item.name}}</option>
                </select>
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
              <div style="height: 45px"></div>
              <div class="form-group">
                <div class="col-sm-6">
                  <button  v-on:click="handleLogin" class="btn btn-primary2 btn-block">登录</button>
                </div>
                <div class="col-sm-6">
                  <button  v-on:click="handleOther" class="btn btn-primary3 btn-block">注册</button>
                </div>
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

        handleLogin(){
          //登录函数
          this.$store.state.user = this.user
          this.$store.state.degree = this.degree
          var that = this;
          if(that.degree=='BKS'){

            var data={     //注意：此处不能写 params了
              user: that.user,
                password: that.password,
                choice: 1,
                degree: 'BKS'
            }

            this.$http.post('https://lzzzzl.top/info',{

                user: that.user,
                password: that.password,
                choice: 1,
                degree: 'BKS'

            },{emulateJSON: true}).then(response => {
                console.log("学生登录")
                console.log(response)
                if ( response.status == 200){
                  // 如果登录成功，则跳转到主页
                  this.$router.push('/home')

                }else {
                  this.$message.error('登录失败');
                }
              },
              response => {
                console.log('请求失败')
              });
            console.log("学生登录")
            // this.$router.push('/home')

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
                  this.$router.push('/home')

                }else {
                  this.$message.error('登录失败');
                }

              },
              response => {
                console.log('请求失败')
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
