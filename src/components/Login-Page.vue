<template>
  <div class="mainwrapper-login-page flex justify-center item-center content-center lg:w-[1024px] mx-auto w-11/12">
    <div
        class="login-page-wrapper flex overflow-hidden relative z-10 lg:flex-row flex-col bg-white rounded-[15px] w-[920px] shadow-[0_0_15px_3px_rgba(0,0,0,0.04)] my-8">
      <div class="login-page-section  flex flex-col lg:w-1/2 w-full p-8">
        <h1 class="font-bold text-[22px] text-gray-600">به حساب کاربری خود در می تاک وارد شوید</h1>
        <div class="not-alreadey-a-member flex xl:flex-row flex-col mt-4 text-sm mb-4">
                    <span class="text-gray-600">
                        نیاز به عضویت در می تاک دارید؟
                    </span>
          <router-link class="text-blue-500 xl:mr-2 xl:mt-0 mt-2" to="/Signup">
            عضویت در می تاک
          </router-link>
        </div>
        <form class="flex-col flex" @submit.prevent="sendLoginAndValidate">
          <ValidationObserver ref="login" class="w-full flex flex-col">
            <validation-provider v-slot="{ errors }" class="flex flex-col w-full"
                                 rules="emailorphone|required">
              <label class="flex mb-2 mt-4 text-sm" for="ایمیل یا شماره همراه">ایمیل یا شماره
                همراه</label>
              <input id=""
                     v-model="username"
                     class="flex w-full px-5 py-2 rounded-[10px] border border-solid border-gray-300" name="ایمیل یا شماره همراه" placeholder="ایمیل یا شماره همراه خود را وارد کنید">
              <span class="flex mt-2 text-xs text-red-500">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider v-slot="{ errors }" class="flex flex-col w-full" rules="password|required">
              <label class="mb-2 mt-4 text-sm" for="رمز عبور">رمز عبور</label>
              <input id=""
                     v-model="password"
                     class="w-full px-5 py-2 rounded-[10px] border border-solid border-gray-300" name="رمز عبور" placeholder="رمز عبور خود را وارد کنید" type="password">
              <span class="flex mt-2 text-xs text-red-500">{{ errors[0] }}</span>
            </validation-provider>
          </ValidationObserver>
          <!-- <button type="submit" class="mt-12 w-full px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold">
          ورود
      </button> -->
          <loading-btn :classes="['w-full', 'px-5', 'py-3', 'mt-12', 'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'rounded-lg', 'font-bold']" :loading="loading.login" :text="'ورود'"
                       type="submit"/>
        </form>
        <a class="flex flex-row mt-4 w-full px-5 py-3 bg-white text-gray-500 border border-solid border-gray-400 rounded-lg font-bold justify-center"
           href="/">
          <svg class="flex ml-2" height="19px" viewBox="0 0 48 48" width="18px"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  fill="#FFC107"/>
            <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  fill="#FF3D00"/>
            <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  fill="#4CAF50"/>
            <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  fill="#1976D2"/>
          </svg>
          <p class="flex" data-i18n-key="continuewithgoogle">با حساب گوگل وارد شوید</p>
        </a>
      </div>
      <div class="login-page-pic flex lg:w-1/2 w-full">
        <img alt="" class="lg:rounded-l-[15px] rounded-b-[15px]" src="../assets/Untitled.jpg">

      </div>

    </div>
  </div>
</template>
<script>
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required} from "vee-validate/dist/rules";
// import { extend } from 'vee-validate';
import LoadingBtn from '../components/LoadingBtn.vue'

extend('required', {
  ...required,
  message: 'لطفا {_field_} را وارد کنید'
});

extend('emailorphone', value => {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || /^(\+98|0)?9\d{9}$/.test(value)) {
    return true;
  }
  return 'ایمیل یا شماره موبایل صحیح نیست';
});
extend('password', value => {
  // set minimum 6 charachter lentgh for password
  if (value.length > 6) {
    return true;
  }
  return 'رمز عبور باید حداقل 6 کاراکتر باشد';
});
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver,
    LoadingBtn
  },
  data: function () {
    return {
      username: '',
      password: '',
      loading: {
        login: false,
      },
    };
  },
  methods: {
    sendLoginAndValidate() {
      this.$refs.login.validate().then((success) => {
        if (!success) return;
        this.login();
      });
    },

    setLoggedInUserInfo({accessToken, refreshToken}) {
      // clear bottom line if set refresh token
      localStorage.setItem('refreshToken', refreshToken)
      this.$store.commit('SET_BEARER', accessToken)
      localStorage.setItem('accessToken', accessToken)
      // this.$store.commit('UPDATE_UESR_INFO', userInfo)
      this.$store.commit('LOGIN_USER')
      this.$router.push(this.$router.currentRoute.query.to || '/')
    },

    login: async function () {
      try {
        this.loading.login = true;
        const payload = {
          username: this.username,
          password: this.password

        };
        const {data: loginRes} = await this.$store.dispatch('login', payload);
        this.loading.login = false;
        console.log(loginRes)
        this.setLoggedInUserInfo(loginRes);

      } catch (err) {
        this.loading.login = false;
        const {error} = err.response.data;
        console.log(error);
        this.$toast.open({
          message: error.detail,
          type: "error",
          position: "bottom-left",
          duration: 5000,
          dismissible: true
        })
      }
    },

  },
mounted() {
  this.$vs.loading.close();
}
}
</script>