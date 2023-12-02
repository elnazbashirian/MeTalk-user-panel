<template>
<div v-if="!$route.meta.hideComponent" class="header-section bg-[#444792] xl:h-[90px] h-[60px] text-white relative">
      <div  id="sidemenu">
    <button class="sidemenu__btn" v-on:click="navOpen=!navOpen" v-bind:class="{active:navOpen}">
				<span class="top"></span>
				<span class="mid"></span>
				<span class="bottom"></span>
			</button>
    <transition name="translateX">
      <nav v-show="navOpen">
        <div class="sidemenu__wrapper">
          <ul v-show="$route.path==='/profile/consultation' || $route.path==='/profile/info' || $route.path==='/profile/setting' ? true : false" class="sidemenu__list">
            <li class="sidemenu__item"><router-link to="/profile/consultation">لیست مشاوره</router-link></li>
            <li class="sidemenu__item"><router-link to="/profile/info">اطلاعات کاربری</router-link></li>
            <li class="sidemenu__item"><router-link to="/profile/setting">تنظیمات</router-link></li>
            <li class="sidemenu__item"><router-link to="/">خروج از حساب کاربری</router-link></li>
          </ul>
          <ul v-show="$route.path==='/profile/consultation' || $route.path==='/profile/info' || $route.path==='/profile/setting' ? false : true" class="sidemenu__list">
            <li class="sidemenu__item"><router-link to="/">خانه</router-link></li>
            <li class="sidemenu__item"><router-link to="profile">پروفایل</router-link></li>
            <li class="sidemenu__item"><router-link to="profile/setting">تنظیمات</router-link></li>
            <li class="sidemenu__item"><a href="/">لینک</a></li>
          </ul>
        </div>
      </nav>
    </transition>
  </div>
  <div class="header-section-mobile-mode -mt-[60px] justify-center w-full  pt-[10px] xl:hidden flex flex-row">
    <img class="flex h-[45px]" src="../assets/logo.png" alt="">
  </div>
  <div class="header-section-desktop-mode mr-10 h-[90px] xl:flex hidden flex-row">
    <img class="flex mt-[10px] h-[70px] ml-10" src="../assets/logo.png" alt="">
    <router-link class="flex ml-8 w-[60px] transition-all duration-75 justify-center items-center content-center  hover:border-b-[4px] border-solid border-yellow-500" to="/">خانه</router-link>
    <router-link class="flex  ml-8  w-[60px] transition-all duration-75 justify-center items-center content-center hover:border-b-[4px] border-solid border-yellow-500" to="/profile" >پروفایل</router-link>
    <router-link class="flex  ml-8  w-[60px] transition-all duration-75 justify-center items-center content-center hover:border-b-[4px] border-solid border-yellow-500" to="profile/setting">تنظیمات</router-link>
<!--    <a class="flex transition-all duration-75  ml-8  w-[60px] justify-center items-center content-center hover:border-b-[4px] border-solid border-yellow-500" href="/">لینک</a>-->
<!--    <a class="flex transition-all duration-75  ml-8  w-[60px] justify-center items-center content-center hover:border-b-[4px] border-solid border-yellow-500" href="/">لینک</a>-->

  </div>
</div>
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Header",
        //set methode for whenever click on .sidemenu__item router-link it will remove active class from #sidemenu nav
        methods: {
            navClose() {
                this.navOpen = false;
            }
        },
        data() {
            return {
                navOpen: false
            };
        }
    };
</script>

<style>
</style>