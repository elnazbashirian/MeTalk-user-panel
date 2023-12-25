<template>
    <div class="xl:rounded-[15px] py-6 xl:mt-0 mt-4 w-full bg-[#f7f7fa]">
        <div class="block overflow-x-auto mx-6">
          <div class="last-consultations">
            <div class="flex xl:flex-row flex-col-reverse  justify-between  items-center  mb-10">
              <span class="block  text-lg  text-gray-700 xl:mt-0 mt-4">آخرین مشاوره ها</span>
              <router-link v-if="consultations.length !== 0"  to="/" class="bg-[#FAF9F8]  border  border-blue-600  text-blue-600  py-2  hover:bg-blue-600  hover:text-white  transition-all  px-10  rounded">درخواست مشاوره جدید</router-link>
            </div>
            <div v-if="loadingConsultations">
              <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
              <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
              <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
              <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
              <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
            </div>
            <div v-else-if="consultations.length !== 0 && !loadingConsultations">
              <div @click.stop="goToConsultationDetailPage(consultation.id, consultation.status)" v-for="consultation, index in consultations" :key="consultation.id" class="flex xl:flex-row flex-col xl:h-16  hover:-translate-y-1  cursor-pointer  hover:border  border-blue-600  transition-transform  mb-6  xl:rounded rounded-lg items-center xl:py-0 py-4  pl-8  pr-3 bg-white w-full">
                <div class="flex w-1/12">
                  <div class="xl:flex hidden w-10 h-10  rounded  text-white items-center  justify-center bg-purple-600">{{ index + 1 }}</div>
                </div>
                <div class="flex text-sm  overflow-hidden  xl:w-3/12 xl:my-0 my-2">
                  <span class="text-gray-400">حوزه: </span>
                  <span class="text-gray-600 mr-1">{{ consultation.field.name }}</span>
                </div>
                <div class="flex text-sm  overflow-hidden   xl:w-3/12 xl:my-0 my-2">
                  <span class="text-gray-400">وضعیت: </span>
                  <span class=" mr-1" :class="statusColorMap[consultation.status]">{{ consultation.status | getStatusLabel }}</span>
                </div>
                <!-- <div class="text-sm  overflow-hidden  w-2/12">
                  <span class="text-gray-400">کاربر: </span>
                  <span class="text-gray-600 mr-1">{{ consultation.user?.firstname ? consultation.user?.firstname + ' ' + consultation.user?.lastname : 'کاربر میتاک' }}</span>
                </div> -->
                <div class="flex text-sm  overflow-hidden   xl:w-2/12 xl:my-0 my-2">
                  <span class="text-gray-400">امتیاز شما: </span>
                  <span class="text-gray-600 mr-1">{{ consultation.irRated || 'ندارد' }}</span>
                </div>
                <div class="flex text-sm  overflow-hidden   xl:w-2/12 xl:my-0 my-2  xl:mr-auto">
                  <span class="text-gray-400">تایپ: </span>
                  <span class="text-gray-600 mr-1">{{ getConsultationTypeText(consultation.type) }}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex flex-col w-full h-full  items-center  justify-center">
                <img src="/img/website-consulting-illustration.png" alt="" class="w-96  rounded-lg  border">
                <span class="text-lg  block  mt-6  text-gray-600">مشاوره ای یافت نشد.</span>
                <p class="text-gray-500  text-sm  mt-3">اینجا لیست اخرین مشاوره های خودتون رو می تونید ببینید.</p>
                <router-link to="/" class="bg-[#FAF9F8]  border  border-blue-600  text-blue-600  py-2  mt-8  hover:bg-blue-600  hover:text-white  transition-all  px-14  rounded">رزرو مشاوره</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center  mt-8">
          <div class="inline-block">
            <pagination
            :loading="loadingConsultations"
            @change="pageChanged"
            :max="10"
            v-model="currentPage"
            :length="totalPage"
          />
          </div>
        </div>
    </div>
</template>
<script>
import Pagination from "../components/PaginationComponent";

export default {
  name: "ConsultationListSection",
  components: {
    Pagination,
  },

  data() {
    return {
      loadingConsultations: false,
      consultations: [],
      currentPage: 1,
      resultPerPage: 10,
      totalPage: 0,
      statusColorMap: {
        REQUESTED: "text-orange-600",
        ACCEPTED: "text-green-600",
        REJECTED: "text-red-600",
        RESERVED: "text-blue-600",
        IN_PROGRESS: "text-blue-600",
        CANCELED: "text-red-600",
        FINISHED: "text-black"
      },
      mapStatusToTabSection: {
        'REQUESTED': 'reserve',  
        'RESERVED': 'details',
        'ACCEPTED': 'reserve',
        'REJECTED': 'reserve',
        'IN_PROGRESS': 'details',
        'CANCELED': 'details',
        'FINISHED': 'details',
      }
    };
  },

  methods: {
    getConsultationTypeText(type) {
      switch (type) {
        case "IN_FACE":
          return "مراجعه حضوری";
        case "VOICE_CHAT":
          return "تماس صوتی";
        case "VIDEO_CHAT":
          return "تماس تصویری";
        default:
          return "نوع مشاوره ناشناخته";
      }
    },
    goToConsultationDetailPage(id, status) {
      this.$router.push({name: 'Reserve', params: { id }, query: { requested: 'true', page: this.mapStatusToTabSection[status] } });
    },
    pageChanged() {
      this.getUserConsultations();
    },
    async getUserConsultations() {
      try {
        this.loadingConsultations = true;
        const { data, headers } = await this.$store.dispatch("getUserConsultations", {
          size: this.resultPerPage,
          page: this.currentPage,
        });
        this.totalPage = Math.ceil(
          headers["x-total-count"] / this.resultPerPage
        );
        console.log(this.totalPage);
        this.consultations = data.consultations;
        this.loadingConsultations = false;

      } catch (error) {
        console.log(error);
        this.loadingConsultations = false;
      }
    },
  },

  mounted() {
    this.getUserConsultations();
  },
};
</script>