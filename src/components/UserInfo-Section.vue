<template>
  <div class="user-info-section xl:p-8 p-0 pt-8 xl:w-full w-[500px] mx-auto">
    <div class="user-info-input-area w-11/12 xl:mx-0 mx-auto xl:w-[500px]">
      <p class="mt-2 mb-8 text-gray-800 flex text-md">اطلاعات خود را وارد کنید</p>
      <form @submit.prevent="submitForm">
        <input v-model="userInfo.firstname" name="name" required type="text">
        <label for="name" :class="{ 'active': userInfo.firstname }" placeholder="نام"></label>

<!--        <input v-model="userInfo.phone" name="phone" required readonly type="text">-->
<!--        <label for="phone" :class="{ 'active': userInfo.phone }" placeholder="شماره تماس"></label>-->

        <input v-model="userInfo.email" name="email" required type="text">
        <label for="email" :class="{ 'active': userInfo.email }" placeholder="آدرس ایمیل"></label>

        <input v-model="userInfo.age" name="age" required type="text">
        <label for="age" :class="{ 'active': userInfo.age }" placeholder="سن"></label>

        <input
            class="cursor-pointer bg-[#615DFA] hover:bg-[#433df8] lg:w-[340px] w-5/6 lg:mx-0 mx-auto text-white px-24 mt-[50px] mb-6 lg:text-[18px] text-[14px] py-3 rounded-[15px] flex justify-center items-center content-center"
            type="submit"
            value="ذخیره"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {
        id: "",
        firstname: "",
        phone: "",
        email: "",
        age: "",
      },
      originalUserInfo: {},
    };
  },
  methods: {
    getUserInfo() {
      axios.get(`/api/user/profile`).then(
          (response) => {
            this.userInfo = response.data;
            this.originalUserInfo = { ...this.userInfo };
          },
          (error) => {
            console.error("Error fetching data:", error);
          }
      );
    },
    submitForm() {
      const updatedFields = this.getUpdatedFields();

      if (Object.keys(updatedFields).length === 0) {
        this.$toast.open({
          message: "اطلاعاتی برای تغییر موجود نیست",
          type: "error",
          position: "bottom-left",
          duration: 5000,
          dismissible: true,
        });
        return;
      }

      axios
          .put(`/api/user/profile`, updatedFields)
          .then(() => {
            this.$toast.open({
              message: 'اطلاعات با موفقیت به روزرسانی شد',
              type: "success",
              position: "bottom-left",
              duration: 5000,
              dismissible: true,
            });
          })
          .catch((error) => {
            console.error("Error updating data:", error);
            this.$toast.open({
              message: "خطا در به روزرسانی اطلاعات",
              type: "error",
              position: "bottom-left",
              duration: 5000,
              dismissible: true,
            });
          });
    },
    getUpdatedFields() {
      const updatedFields = {};
      for (const key in this.userInfo) {
        if (this.userInfo[key] !== this.originalUserInfo[key]) {
          updatedFields[key] = this.userInfo[key];
        }
      }
      return updatedFields;
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>
