<template>

  <div>
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <div class="oneOfArticle" >
        <h3>布置作业</h3>
        <form class="">
          <div class="form-group">
            <input type="text" class="form-control" v-model="title" id="hmtitle" placeholder="作业标题">
          </div>
          <br>
          <textarea class="form-control" rows="8" v-model="context" placeholder="作业内容"></textarea>
          <br>
        </form>

        <p>班级选择</p>
        <el-select v-model="classvalue" placeholder="请选择">
          <el-option
            v-for="item in classList"
            :key="item.class_id"
            :label="item.class_name"
            :value="item.class_id">
          </el-option>
        </el-select>
        <div style="height: 10px;"></div>
        <br>
<!--        <input class="js-date-picker" type="text" placeholder="选择截止时间" v-on:click="selectendDate" readonly>-->
        <p>截止时间</p>
        <div class="block">
          <el-date-picker
            v-model="endtime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <br>
        <div style="height: 10px;"></div>
        <p>
          <button type="button" class="btn btn-primary btn-md btn-block" v-on:click="toAssign"> 提   交 </button>
        </p>

        <br>

      </div>
    </div>
    <div class="col-md-3"></div>


  </div>

</template>

<script>
    export default {
        name: "assignHm",
        data(){
          return {
            title:'',
            context:'',
            endtime:'',
            classid:'',
            classvalue: '',
            classList:[],
            timeString:'',

          }
        },

        computed: {
          user () {
            return this.$store.state.user
          },


        },
        // mounted() {
        //   this.selectendDate(); //加载日期选择控件
        // },
        created: function() { //打开组件即运行
          var that = this;
          this.getClassList()
        },

        methods:{

          toAssign(){
            var that = this;
            if(that.title == ''||this.context==''||this.classvalue==''||this.timeString==''){
              alert("请完整填写题目信息");
            }else{

              this.$http.post('https://andatong.top/wxapp/homework_teacher',{
                Tno: that.user,
                class_id: that.classvalue,
                title: that.title,
                content: that.context,
                end_time: that.timeString,

              },{emulateJSON: true}).then(response => {
                  console.log("发布作业")
                  console.log(response)
                  if ( response.status == 200 && response.body.status=="success"){
                    alert("发送成功！")
                  }else {
                    alert("发送失败，请稍后再试！")
                  }
                },
                response => {
                  console.log('请求失败');
                  alert("发送失败，请稍后再试！");
                });

            }
          },

          selectendDate(){
            var that = this;
            var calendar = new datePicker();
            calendar.init({
              trigger: ".js-date-picker" /*按钮选择器，用于触发弹出插件*/,
              type:
                "datetime" /*模式：date日期；datetime日期时间；time时间；ym年月；year:年*/,
              minDate: "2000-1-1" /*最小日期*/,
              maxDate: "2100-12-31" /*最大日期*/,
              onSubmit: function() {
                /*确认时触发事件*/
                var theSelectData = calendar.value;
                console.log(theSelectData)
              },
              onClose: function() {
                /*取消时触发事件*/
              }
            });
          },

          getClassList(){
            var that = this;
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
          },
          formatEDate:function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            var second= date.getSeconds();
            second = minute < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute;
          }

        },
      watch:{//监听数据变化

        classvalue:function(){
          //this.count++;
          console.log(this.classvalue);
          //alert("什么鬼......");
        },
        endtime:function(){
          //this.count++;
          console.log(this.endtime);
          var date = this.endtime;
          //时间转换
          // var endtimeString = this.formatEDate(this.endtime)

          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          var minute = date.getMinutes();
          minute = minute < 10 ? ('0' + minute) : minute;
          var second= date.getSeconds();
          second = minute < 10 ? ('0' + second) : second;
          var timeString = y + '-' + m + '-' + d+' '+h+':'+minute;
          console.log(timeString)
          this.timeString = timeString;
        },

      }
    }
</script>

<style scoped>

</style>
