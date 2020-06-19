<template>
    <div>
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
                        alert("加入班级成功！")

                      }else {
                        alert("加入班级失败，请稍后再试！")
                      }
                    },
                    response => {
                      console.log('请求失败')
                    });

                }else {
                  alert("加入班级失败，请稍后再试！")
                }
              },
              response => {
                console.log('请求失败')
              });

          }else{
            alert("信息不全！")
          }

        }
      }



    }
</script>

<style scoped>

</style>
