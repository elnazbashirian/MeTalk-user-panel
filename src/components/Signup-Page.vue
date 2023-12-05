<template>
    <div class="mainwrapper-login-page flex justify-center item-center content-center lg:w-[1024px] mx-auto w-11/12">
        <div
            class="login-page-wrapper flex overflow-hidden relative z-10 lg:flex-row flex-col bg-white rounded-[15px] w-[920px] shadow-[0_0_15px_3px_rgba(0,0,0,0.04)] my-8">
            <div class="login-page-section  flex flex-col lg:w-1/2 w-full p-8">
                <h1 class="font-bold text-[28px] text-gray-600">در می تاک ثبت نام کنید</h1>
                <div class="alreadey-a-member flex xl:flex-row flex-col mt-4 text-sm mb-4">
                    <span class="text-gray-600">
                        در حال حاضر عضو هستید ؟
                    </span>
                    <router-link to="/Login" class="text-blue-500 xl:mr-2 xl:mt-0 mt-2">
                        وارد شوید
                    </router-link>
                </div>
                <form class="flex flex-col" @submit.prevent="sendSignupAndValidate">
                    <ValidationObserver class="w-full flex flex-col" ref="signup">
                        <validation-provider class="flex flex-col w-full" rules="emailorphone|required"
                            v-slot="{ errors }">
                            <label class="flex mt-6 mb-4 text-sm" for="ایمیل یا شماره همراه">ایمیل یا شماره
                                همراه</label>
                            <input v-model="username"
                                class="flex px-5 py-2 rounded-lg border border-solid border-gray-300"
                                placeholder="ایمیل و یا شماره همراه خود را وارد کنید" type="text"
                                name="ایمیل یا شماره همراه" id="emailorphone">
                            <span class="flex mt-2 text-xs text-red-500">{{ errors[0] }}</span>
                        </validation-provider>
                        <label class="flex mt-6 mb-4 text-sm" for="رمز عبور">رمز عبور</label>
                        <validation-provider class="flex flex-col w-full" rules="password|required" v-slot="{ errors }">
                            <input v-model="password"
                                class="flex w-full px-5 py-2 rounded-lg border border-solid border-gray-300"
                                placeholder="رمز عبور را وارد کنید" type="password" name="رمز عبور" id="">
                            <span class="flex mt-2 text-xs text-red-500">{{ errors[0] }}</span>
                        </validation-provider>
                    </ValidationObserver>
                    <!-- <button type="submit"
                        class="w-full px-5 py-3 mt-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold">
                        ثبت نام
                    </button> -->
                    <loading-btn type="submit" :text="'ثبت نام'" :loading="loading.signup"
                        :classes="['w-full', 'px-5', 'py-3', 'mt-12', 'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'rounded-lg', 'font-bold']" />

                    <a href="/"
                        class="flex flex-row mt-4 w-full px-5 py-3 bg-white text-gray-500 border border-solid border-gray-400 rounded-lg font-bold justify-center">
                        <svg class="flex ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px"
                            height="19px">
                            <path fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        <p data-i18n-key="continuewithgoogle" class="flex">با حساب گوگل ثبت نام کنید</p>
                    </a>
                </form>
            </div>
            <div class="login-page-pic flex lg:w-1/2 w-full">
                <img class="lg:rounded-l-[15px] rounded-b-[15px]" src="../assets/Untitled.jpg" alt="">

            </div>
            <div :class="{ 'show': isActive }"
                class="signup-step-two flex flex-col absolute p-8 lg:w-1/2 w-full h-full bg-white z-20">
                <button v-on:click="removeTransformClass" class="close-button flex w-full py-3 mb-4">
                    <svg class="flex rotate-180" width="10" height="17" viewBox="0 0 10 17" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M9.62353 0.782842C9.82067 0.980224 9.9314 1.24778 9.9314 1.52675C9.9314 1.80572 9.82067 2.07328 9.62353 2.27066L3.34944 8.54475L9.62353 14.8188C9.80948 15.0184 9.91071 15.2823 9.9059 15.5551C9.90109 15.8278 9.79061 16.088 9.59773 16.2809C9.40486 16.4737 9.14466 16.5842 8.87193 16.589C8.59921 16.5938 8.33527 16.4926 8.13572 16.3067L1.11772 9.28866C0.920583 9.09128 0.809853 8.82372 0.809853 8.54475C0.809853 8.26579 0.920583 7.99823 1.11772 7.80084L8.13572 0.782842C8.3331 0.585705 8.60066 0.474976 8.87962 0.474976C9.15859 0.474976 9.42615 0.585705 9.62353 0.782842Z"
                            fill="#615DFA" />
                    </svg>
                </button>
                <div class="flex flex-col justify-center item-center content-center lg:mt-[70px] mt-[70px]">
                    <h1 class="font-bold text-[24px] text-gray-700 mx-auto mb-2">کد تایید</h1>
<!--                    <span class="flex mx-auto text-gray-500">کد ارسال شده به ایمیل فلان را وارد کنید</span>-->
                    <!-- <div class="flex flex-row w-full justify-center mt-6">
                        <input
                            class="flex w-[40px] h-[40px] border border-solid border-gray-400 rounded-lg p-2 text-center mx-3"
                            type="text" name="" id="">
                        <input
                            class="flex w-[40px] h-[40px] border border-solid border-gray-400 rounded-lg p-2 text-center mx-3"
                            type="text" name="" id="">
                        <input
                            class="flex w-[40px] h-[40px] border border-solid border-gray-400 rounded-lg p-2 text-center mx-3"
                            type="text" name="" id="">
                        <input
                            class="flex w-[40px] h-[40px] border border-solid border-gray-400 rounded-lg p-2 text-center mx-3"
                            type="text" name="" id="">
                        <input
                            class="flex w-[40px] h-[40px] border border-solid border-gray-400 rounded-lg p-2 text-center mx-3"
                            type="text" name="" id="">


                    </div> -->
                    <form class="flex flex-col" @submit.prevent="sendVerifyCodeAndValidate">
                        <ValidationObserver class="w-full flex flex-col" ref="verifycode">
                            <validation-provider class="flex flex-col w-full" rules="verifycode|required"
                                v-slot="{ errors }">
                                <label class="mt-6 mb-4 text-sm" for="کد تایید">کد تایید</label>
                                <input v-model="verifyCode"
                                    class="flex px-5 py-2 rounded-lg border border-solid border-gray-300"
                                    placeholder="کد خود ارسال شده را وارد کنید" type="number" name="کد تایید" id="">
                                <span class="flex mt-2 text-xs text-red-500">{{ errors[0] }}</span>
                            </validation-provider>
                        </ValidationObserver>
                        <span class="flex mx-auto mt-8">
                            <span @click="sendSignupAndValidate"
                                :class="[allowSendVerifyCodeAgain ? 'text-blue-700' : 'text-gray-500   cursor-not-allowed']"
                                class="cursor-pointer  ml-2">فرستادن دوباره کد تایید</span>
                            <span class="text-gray-800">({{ confirmTimer | fmtMSS }})</span>
                        </span>

                        <!-- <button type="submit"
                            class="mt-12 w-full mx-auto px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold">
                            ثبت
                        </button> -->
                        <loading-btn type="submit" :text="'ثبت'" :loading="loading.verifyCode"
                            :classes="['w-full', 'px-5', 'py-3', 'mt-12', 'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'rounded-lg', 'font-bold']" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { ValidationProvider } from 'vee-validate';
// import { extend } from 'vee-validate';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from "vee-validate/dist/rules";
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
extend('verifycode', value => {
    // set 6 charachter lentgh for password and must be number
    if (value.length == 6 && /^[0-9]*$/.test(value)) {
        return true;
    }

    return 'کد تایید باید 6 رقم باشد';
});

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Signup',
    components: {
        ValidationProvider,
        ValidationObserver,
        LoadingBtn
    },

    data: function () {
        return {
            isActive: false,
            username: '',
            verifyCode: '',
            password: '',
            confirmTimer: 60,
            allowSendVerifyCodeAgain: true,
            confirmTimerSetTimeout: '',
            loading: {
                signup: false,
                // login: false,
                verifyCode: false,
            },
        };
    },
    filters: {
        fmtMSS: (s) => {
            return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s
        }
    },

    methods: {
        sendSignupAndValidate() {
            this.$refs.signup.validate().then((success) => {
                if (!success) return;
                this.signup();
            });
        },
        sendVerifyCodeAndValidate() {
            this.$refs.verifycode.validate().then((success) => {
                if (!success) return;
                this.sendVerifyCode();
            });
        },
        register() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    alert('Form Submitted!');
                    return;
                }

                alert('Form is invalid!');
            });
        },
        addTransformClass: function () {
            this.isActive = true;
        },
        removeTransformClass: function () {
            this.isActive = false;
        },
        sendVerifyCodeAgain() {
            if (!this.allowSendVerifyCodeAgain) return
            this.sendVerifyCode()
            this.setConfirmTimer()
        },

        setConfirmTimer() {
            clearInterval(this.confirmTimerSetTimeout)
            this.confirmTimer = 60
            this.allowSendVerifyCodeAgain = false
            this.confirmTimerSetTimeout = setInterval(() => {
                if (this.confirmTimer === 0) {
                    clearInterval(this.confirmTimerSetTimeout)
                    this.allowSendVerifyCodeAgain = true
                    return
                }
                this.confirmTimer = this.confirmTimer - 1
            }, 1000)
        },

        setLoggedInUserInfo({ accessToken, refreshToken }) {
            // clear bottom line if set refresh token
            localStorage.setItem('refreshToken', refreshToken)
            this.$store.commit('SET_BEARER', accessToken)
            // this.$store.commit('UPDATE_UESR_INFO', userInfo)
            this.$store.commit('LOGIN_USER')
            this.$router.push(this.$router.currentRoute.query.to || '/')
        },


        sendVerifyCode: async function () {
            try {
                this.loading.verifyCode = true;
                const payload = {
                    method: this.getSignUpMethod(this.username),
                    username: this.username,
                    code: this.verifyCode,
                    password: this.password,
                }
                const { data: verifyCodeRes } = await this.$store.dispatch('verifyCode', payload);
                console.log('verifyCodeRes', verifyCodeRes);
                this.setLoggedInUserInfo(verifyCodeRes);

            } catch (err) {
                this.loading.verifyCode = false;
                const { error } = err.response.data;
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
        getSignUpMethod: function (value) {
            if (/^(\+98|0)?9\d{9}$/.test(value)) {
                return 'phone'
            } else {
                return 'email'
            }
        },
        signup: async function () {
            try {
                this.loading.signup = true;
              // const payload = {
              //   type: "register",
              //   method: "phone",
              //   username: this.username,
              // };
              //   const { data: userExistance } = await this.$store.dispatch('checkUserExistance', payload);
              //
              //   if (userExistance.userExists && userExistance.activated) {
              //       // console.log('user exists');
              //       this.$toast.open({
              //           message: "ایمیل شما قبلا ثبت شده است",
              //           type: "error",
              //           position: "bottom-left",
              //           duration: 5000,
              //           dismissible: true
              //       });
              //       this.loading.signup = false;
              //       return;
              //   }
                const registerPayload = {
                    method: this.getSignUpMethod(this.username),
                    username: this.username,
                }
                const { data: registerData } = await this.$store.dispatch('register', registerPayload)
                console.log("registerData", registerData);
                this.loading.signup = false;
                this.addTransformClass();
                this.setConfirmTimer();

            } catch (err) {
                this.loading.signup = false;
                const { error } = err.response.data;
              console.log(error)
                if (error.detail === 'code.exists.before') {
                    if (this.allowSendVerifyCodeAgain) {
                        this.setConfirmTimer();
                    }
                    this.addTransformClass();
                }
                console.log(error);
                this.$toast.open({
                    message: error.detail,
                    type: "error",
                    position: "bottom-left",
                    duration: 5000,
                    dismissible: true
                })
            }
        }
    },

}
</script>