<template>
  <div class="user-setting-section xl:p-8 p-0 pt-8 xl:w-full w-[500px] mx-auto">
    <div class="user-info-input-area w-11/12 xl:mx-0 mx-auto xl:w-[500px]">
      <form @submit.prevent="changePassword">
        <input v-model="currentPassword" name="currentpassword" required type='password'>
        <label for="currentpassword" :class="{ 'active': currentPassword }" placeholder='رمز عبور فعلی'></label>

        <input v-model="newPassword" name="newpassword" required type='password'>
        <label :class="{ 'active': newPassword }" for="newpassword" placeholder='رمز عبور جدید'></label>

        <input v-model="newPasswordAgain" name="newpasswordagain" required type='password'>
        <label :class="{ 'active': newPasswordAgain }" for="newpasswordagain" placeholder='تکرار رمز عبور جدید'></label>

        <input
            class="cursor-pointer bg-[#615DFA] hover:bg-[#433df8] lg:w-[340px] w-5/6 lg:mx-0 mx-auto text-white px-24 lg:mt-4 mb-6 lg:text-[18px] text-[14px] py-3 rounded-[15px] flex justify-center items-center content-center"
            type="submit" value="ذخیره">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: 'UserSetting',
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    };
  },
  methods: {
    changePassword() {
      if (this.newPassword !== this.newPasswordAgain) {
        this.$toast.open({
          message: 'رمز عبور جدید و تکرار آن باید یکسان باشند',
          type: "error",
          position: "bottom-left",
          duration: 5000,
          dismissible: true,
        });
        return;
      }

      const payload = {
        oldPass: this.currentPassword,
        newPass: this.newPassword,
      };

      axios.post('/api/auth/change-password', payload)
          .then(() => {
            this.$toast.open({
              message: 'رمز با موفقیت تغییر یافت',
              type: "success",
              position: "bottom-left",
              duration: 5000,
              dismissible: true,
            });
          })
          .catch(error => {
            console.error('Error changing password:', error);
            this.$toast.open({
              message: 'خطا در تغییر رمز عبور',
              type: "error",
              position: "bottom-left",
              duration: 5000,
              dismissible: true,
            });
          });
    },
  },
};
</script>
