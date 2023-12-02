<template>
  <div class="main-wrapper  bg-[#FAF9F8]">
    <div class="cover-hero">
      <div class="cover-image relative block">
        <div class="xl:pb-[25%] pb-[40%]"></div>
        <div class="cover-image-wrapper absolute  right-0  bottom-0  top-0  h-full  w-full bg-[url('./assets/cover.jpeg')]  bg-no-repeat  bg-cover  bg-center"></div>
        <div class="cover-text  overflow-hidden  z-20 absolute top-0 left-0 bottom-0 h-full w-full flex">
          <div class="empty-col  w-72  mr-10"></div>
          <div class="flex-auto  flex  items-end">
            <div class="h-56 xl:block hidden  w-full  overflow-hidden p-4  pr-8">
              <h1 class="text-white  font-bold  text-3xl">{{ consultant?.firstname + ' ' + consultant?.lastname }}</h1>
              <span class="block  mt-3  text-white">{{ consultant?.fields?.map(field => field.name).join(', ') }}</span>
              <div class="divider w-72  my-4  bg-white bg-opacity-50  h-[1px]"></div>
              <span class="block  mt-3  text-white">{{ consultant?.email || 'ایمیلی برای این مشاور ثبت نشده است.' }}</span>
              <span class="block  mt-3  text-white">{{ consultant?.phone || 'شماره تلفنی برای این مشاور ثبت نشده است.' }}</span>
            </div>
          </div>
        </div>
        <div class="reserve-btn xl:flex hidden absolute translate-y-1/2 z-20 left-0 bottom-0 pl-8">
          <button class="bg-yellow-500 text-white  py-3 ml-2  px-14  rounded">دانلود رزومه</button>
          <button class="bg-blue-700  text-white  py-3  px-14  rounded">رزرو مشاوره</button>
        </div>
        <div class="cover-backdrop  z-10  w-full  h-full  top-0  right-0  absolute  bottom-0  bg-gradient-to-t  from-[rgba(0,0,0,.7)]  to-[rgba(0,0,0,0)]"></div>
      </div>
    </div>
    <div class="content-wrapper flex xl:flex-row flex-col">
      <div class="side-profile  z-30  relative xl:-top-56  xl:w-72 w-full xl:py-0 py-4  xl:mr-10  bg-white">
        <div class="profile-image xl:flex hidden relative">
          <div class="pb-[100%] bg-slate-400"></div>
          <div class="absolute  w-full  h-full  top-0  left-0  bottom-0  bg-[url('./assets/profile.jpeg')]  bg-no-repeat  bg-cover  bg-center"></div>
        </div>
        <div class="profile-image-mobile mx-auto -mt-[60px] xl:hidden flex w-[120px] h-[120px] p-[5px] bg-white rounded-full">
          <img class="w-full h-full object-cover rounded-full" src="../assets/profile.jpeg" alt="profile image">
        </div>
         <div class="h-56 xl:hidden text-center block  w-full  overflow-hidden p-4 pt-6">
              <h1 class="font-bold  text-3xl">{{ consultant?.firstname + ' ' + consultant?.lastname }}</h1>
              <span class="block  mt-3">{{ consultant?.fields?.map(field => field.name).join(', ') }}</span>
              <div class="divider w-72  my-4  bg-white bg-opacity-50  h-[1px]"></div>
              <span class="block  mt-3">{{ consultant?.email || 'ایمیلی برای این مشاور ثبت نشده است.' }}</span>
              <span class="block  mt-3">{{ consultant?.phone || 'شماره تلفنی برای این مشاور ثبت نشده است.' }}</span>
            </div>
            <div class="flex flex-row w-full justify-center">
            <button class="bg-white text-sm flex xl:hidden text-blue-600 border border-solid border-blue-600  py-2 mb-4 mx-2  px-10  rounded">دانلود رزومه</button>
            <button class="bg-blue-700 text-sm flex xl:hidden text-white  mx-2  py-2 mb-4  px-10  rounded">رزرو مشاوره</button>
            </div>
        <div class="bio  p-3  px-4" :class="{showmore:checkStatus}">
          <span class="text-sm  text-gray-400">بیوگرافی</span>
          <span class="text-sm mt-2  block  text-gray-500">{{ consultant?.slogan }}</span>
          <div class="text-sm  mt-2  text-gray-600  leading-7  font-light">
            {{ consultant?.bio || 'بیوگرافی برای این مشاور وارد نشده است.' }}
           
          </div>
          <!-- #TODO -->
          <div v-if="consultant?.socialMedias?.length !== 0" class="social-medias">
            <ul class="social-meida-wrapper  flex  justify-center  py-4">
              <a class="flex  justify-center  items-center  w-10  h-10  rounded  transition-transform  hover:-translate-y-1 bg-[#3763d2]" href="https://www.facebook.com/Odin-Design-Themes-and-Templates-1985202918413398/" target="_blank">
                <svg class="icon-facebook social-link-icon  fill-white  w-3  h-3  overflow-hidden">
                  <use href="#svg-facebook"></use>
                    <symbol id="svg-facebook" viewBox="0 0 18 18" preserveAspectRatio="xMinYMin meet">
                      <path d="M16.313,18h-4.504v-6.192h3.087V8.671h-3.087V7.135V6.831V6.814l0,0c0.01-0.328,0.277-0.591,0.607-0.591h0.067h1.113h1.62V3.086h-2.733l0,0l-0.009,0.018h-0.092c-2.051,0-3.712,1.661-3.712,3.711v0.911v0.945H6.191v3.137h2.479V18H1.687C0.755,18,0,17.242,0,16.313V1.686C0,0.754,0.755,0,1.687,0h14.626C17.244,0,18,0.754,18,1.686v14.627C18,17.242,17.244,18,16.313,18z"></path>
                    </symbol>
                </svg>  
              </a>
            </ul>
          </div>
        </div>
        <button class="text-[11px] block px-[10px] py-[7px] rounded-md bg-slate-200 text-gray-700 mr-auto ml-4 mt-4" @click="changeData">{{ readStatus }}</button>
      </div>
      <div class="flex-auto p-8">
        
        <div class="last-consultations">
          <span class="block  text-lg  mb-10  text-gray-700">آخرین مشاوره ها</span>
          <div v-if="loadingConsultations">
            <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
            <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
            <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
            <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
            <div class=" skeleton skeleton-loading w-full h-16  mb-6  rounded"></div>
          </div>
          <div v-else-if="consultations.length !== 0 && !loadingConsultations">
            <div v-for="consultation, index in consultations" :key="consultation.id" class="xl:h-16  mb-6  xl:rounded rounded-lg flex xl:flex-row flex-col  items-center xl:py-0 py-4  pl-8  pr-3 bg-white w-full">
              <div class="w-1/12">
                <div class="w-10 h-10  rounded  text-white  xl:flex hidden  items-center  justify-center bg-purple-600">{{ index + 1 }}</div>
              </div>
              <div class="text-sm  overflow-hidden  xl:w-2/12 xl:my-0 my-2">
                <span class="text-gray-400">حوزه: </span>
                <span class="text-gray-600 mr-1">{{ consultation.field.name }}</span>
              </div>
              <div class="text-sm  overflow-hidden   xl:w-3/12 xl:my-0 my-2">
                <span class="text-gray-400">وضعیت: </span>
                <span class=" mr-1  text-green-500">{{ consultation.status | getStatusLabel }}</span>
              </div>
              <div class="text-sm  overflow-hidden   xl:w-2/12 xl:my-0 my-2">
                <span class="text-gray-400">کاربر: </span>
                <span class="text-gray-600 mr-1">{{ consultation.user?.firstname ? consultation.user?.firstname + ' ' + consultation.user?.lastname : 'کاربر میتاک' }}</span>
              </div>
              <div class="text-sm  overflow-hidden   xl:w-2/12 xl:my-0 my-2">
                <span class="text-gray-400">امتیاز کاربر: </span>
                <span class="text-gray-600 mr-1">{{ consultation.irRated || 'ندارد' }}</span>
              </div>
              <div class="text-sm  overflow-hidden   xl:w-2/12 xl:my-0 my-2">
                <span class="text-gray-400">تایپ: </span>
                <span class="text-gray-600 mr-1">{{ consultation.type === 'VOICE_CHAT' ? 'صوتی' : 'ویدیویی' }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <!-- #TODO -->
            <div class="flex flex-col w-full h-full  items-center  justify-center">
              <img src="/img/website-consulting-illustration.png" alt="" class="w-96  rounded-lg  border">
              <span class="text-lg  block  mt-6  text-gray-600">مشاوره ای یافت نشد.</span>
              <p class="text-gray-500  text-sm  mt-3">اینجا لیست اخرین مشاوره های یک مشاور رو می تونید ببینید.</p>
              <button class="bg-[#FAF9F8]  border  border-blue-600  text-blue-600  py-2  mt-8  hover:bg-blue-600  hover:text-white  transition-all  px-14  rounded">رزرو مشاوره</button>
            </div>
          </div>
        </div>
        <div v-if="consultant.customers.length !== 0" class="custumers">
          <span class="block  text-lg  mt-14  mb-8  text-gray-700">مشتریان من</span>
          <div class="flex">
            <div class="ml-4  flex  flex-col  items-center" v-for="customer in consultant.customers" :key="customer.name + customer.url">
              <div class="customer-image-box  w-14  h-14  bg-gray-200  rounded"></div>
              <span class="text-gray-500 block  mt-2">{{ customer.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ConsultantProfile",

  data() {
    return {
      readStatus:'... بیشتر بخوانید',
      checkStatus:false,
      consultant: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        fields: [],
        bio: '',
        slogan: '',
        customers: [],
      },
      loadingConsultations: false,
      consultations: [],
    };
  },

  computed: {
    ...mapGetters(['consultantById']),
  },

  methods: {
    changeData:function(){

  if(this.readStatus=='... بیشتر بخوانید'){
    this.readStatus='بستن';
    this.checkStatus=true;
  }else{
    this.readStatus='... بیشتر بخوانید';
    this.checkStatus=false;
  }
  },
    async getConsultantProfile(consultantId) {
      try {
        let consultant = this.consultantById(consultantId);
        if(!consultant) {
          console.log('fetch from server')
          const { data } = await this.$store.dispatch("getConsultantById", {
            consultantId,
          });
          consultant = data.consultant;
        }
        this.consultant = consultant;
      } catch (error) {
        console.log(error);
      }
    },
    async getLastConsultations(consultantId) {
      try {
        this.loadingConsultations = true;
        const { data } = await this.$store.dispatch("getConsultations", {
          consultantId,
          page: 1,
          size: 10,
        });
        this.consultations = data.consultations;
        console.log(this.consultations);
        this.loadingConsultations = false;

      } catch (error) {
        console.log(error);
        this.loadingConsultations = false;
      }
    },
  },

  mounted() {
    const { id: consultantId = "" } = this.$route.params;
    if (!consultantId) {
      this.$router.push({ name: "home" });
      return;
    }
    this.getConsultantProfile(consultantId);
    this.getLastConsultations(consultantId);
  },
};
</script>
<style scoped>
  .bio {
max-height: 150px;
overflow: hidden;
transition: max-height 2s;
 }
 .showmore{
max-height: 500px;
overflow-y: hidden;
 }
</style>