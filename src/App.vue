<template>
  <div id="app">
    <div class="container-fluid hidden-xs">
      <div class="row">
        <nav class="cc-nav">
          <ul class="clearfix">
            <li class="pull-left"><a style="color: #5574F7;">HOMI</a></li>
            <li class="pull-left iconfont iconego-menu visible-xs-block"></li>
<!--            <li class="pull-right"><img src="../img/man-1.png" alt=""></li>-->

            <li class="pull-right hidden-xs"><a>我的</a></li>
            <li class="pull-right hidden-xs"><a>首页</a></li>
            <li class="pull-right hidden-xs"><a>登录</a></li>

          </ul>
        </nav>
      </div>

    </div>
    <div style="height: 40px;"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;

}
</style>
