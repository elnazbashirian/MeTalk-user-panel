<template>
    <div v-if="!loading && consultants.length !== 0"
        class="main-content-home bg-white min-h-[500px] xl:w-[960px] w-11/12 xl:mx-0 mx-auto flex xl:flex-row flex-col flex-wrap rounded-[15px] overflow-hidden">
      <router-link v-for="consultant in consultants" :key="consultant.id" :to="{ name: 'consultant', params: { id: consultant.id } }">
      <div class="profile-card-body relative xl:rounded-none rounded-[15px] xl:mb-0 mb-4 xl:w-[320px] w-full h-auto
            bg-white flex flex-col items-center">
          <img class="profile-card-header xl:rounded-t-none rounded-t-[15px] flex w-full h-[135px]"
               :src="consultant.coverImage ? 'https://api.metalk.online/static/' + consultant.coverImage : '/cover.png'" alt="profile card header">
          <img :src="consultant.profileImage ? 'https://api.metalk.online/static/' + consultant.profileImage : '/img.png'" alt="profile card avatar"
               class="profile-card-avatar flex w-[90px] h-[90px] object-cover rounded-full bg-white p-1 mx-auto absolute top-20">
        <div
              class="profile-card-section xl:rounded-b-none rounded-b-[15px] border-x border-solid border-[#f3f3f3] flex flex-col w-full justify-center items-center content-center pt-10">
            <div class="prfoile-card-stars-rating flex mt-4">
              <ul class="flex justify-center">
                <li>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                       class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512">
                    <path fill="currentColor"
                          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                       class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512">
                    <path fill="currentColor"
                          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                       class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512">
                    <path fill="currentColor"
                          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star"
                       class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512">
                    <path fill="currentColor"
                          d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star"
                       class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512">
                    <path fill="currentColor"
                          d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z">
                    </path>
                  </svg>
                </li>
              </ul>
            </div>
            <a class="profile-card-name text-[18px] text-title flex mt-4">{{ `${consultant.firstname}
                                    ${consultant.lastname}`
              }}</a>
            <a class="profile-card-field-name text-[12px] flex mt-2 text-[#ADAFCA]">{{ consultant.fields[0] &&
            consultant.fields[0].name
              }}</a>
            <div class="profile-card-slider w-full h-auto mt-6">
              <VueSlickCarousel v-bind="settings">
                <div>
                  <div class="profile-card-stat-container flex flex-col w-[250px] h-[100px] mx-auto">
                    <div
                        class="profile-card-stats w-full flex flex-row justify-center items-center content-center">
                      <div
                          class="profile-card-consultant-number flex flex-col w-1/3 justify-center item-center content-center">
                        <a class="flex text-[14px] mx-auto">∞</a>
                        <a class="flex text-[12px] text-[#ADAFCA] mx-auto">مشاور</a>
                      </div>
                      <div
                          class="profile-card-follower border-x border-solid border-[#DEDEDE] flex flex-col w-1/3 justify-center item-center content-center">
                        <a class="flex text-[14px] mx-auto">∞</a>
                        <a class="flex text-[12px] text-[#ADAFCA] mx-auto">دنبال کننده</a>
                      </div>
                      <div
                          class="profile-card-post-number flex flex-col w-1/3 justify-center item-center content-center">
                        <a class="flex text-[14px] mx-auto">∞</a>
                        <a class="flex text-[12px] text-[#ADAFCA] mx-auto">پست ها</a>
                      </div>
                    </div>
                    <div
                        class="profile-card-socialicons my-8 flex flex-row justify-between items-center mx-auto content-center w-[130px]">
                      <a class="profile-card-socialicon flex items-center justify-center">
                        <svg width="25px" height="25px" id="Capa_1" enable-background="new 0 0 512 512"
                             viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                                d="m512 256c0 127.78-93.62 233.69-216 252.89v-178.89h59.65l11.35-74h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98h32.28v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6v56.4h-65v74h65v178.89c-122.38-19.2-216-125.11-216-252.89 0-141.38 114.62-256 256-256s256 114.62 256 256z"
                                fill="#1877f2" />
                            <path
                                d="m355.65 330 11.35-74h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979h32.281v-63s-29.296-5-57.305-5c-58.476 0-96.695 35.44-96.695 99.6v56.4h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111v-178.889z"
                                fill="#fff" />
                          </g>
                        </svg>
                      </a>
                      <a class="profile-card-socialicon flex items-center justify-center">
                        <svg width="25px" height="25px" viewBox="0 0 152 152"
                             xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                          <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse"
                                          x1="22.26" x2="129.74" y1="22.26" y2="129.74">
                            <stop offset="0" stop-color="#fae100" />
                            <stop offset=".15" stop-color="#fcb720" />
                            <stop offset=".3" stop-color="#ff7950" />
                            <stop offset=".5" stop-color="#ff1c74" />
                            <stop offset="1" stop-color="#6c1cd1" />
                          </linearGradient>
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Circle">
                              <g id="_03.Instagram" data-name="03.Instagram">
                                <rect id="Background" fill="url(#linear-gradient)" height="152"
                                      rx="76" width="152" />
                                <g fill="#fff">
                                  <path id="Shade"
                                        d="m133.2 26c-11.08 20.34-26.75 41.32-46.33 60.9s-40.56 35.22-60.87 46.3q-1.91-1.66-3.71-3.46a76 76 0 1 1 107.45-107.48q1.8 1.8 3.46 3.74z"
                                        opacity=".1" />
                                  <g id="Icon">
                                    <path
                                        d="m94 36h-36a22 22 0 0 0 -22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22v-36a22 22 0 0 0 -22-22zm15 54.84a18.16 18.16 0 0 1 -18.16 18.16h-29.68a18.16 18.16 0 0 1 -18.16-18.16v-29.68a18.16 18.16 0 0 1 18.16-18.16h29.68a18.16 18.16 0 0 1 18.16 18.16z" />
                                    <path
                                        d="m90.59 61.56-.19-.19-.16-.16a20.16 20.16 0 0 0 -14.24-5.88 20.52 20.52 0 0 0 -20.38 20.67 20.75 20.75 0 0 0 6 14.61 20.19 20.19 0 0 0 14.42 6 20.73 20.73 0 0 0 14.55-35.05zm-14.59 28a13.56 13.56 0 1 1 13.37-13.56 13.46 13.46 0 0 1 -13.37 13.56z" />
                                    <path
                                        d="m102.43 54.38a4.88 4.88 0 0 1 -4.85 4.92 4.81 4.81 0 0 1 -3.42-1.43 4.93 4.93 0 0 1 3.43-8.39 4.82 4.82 0 0 1 3.09 1.12l.1.1a3.05 3.05 0 0 1 .44.44l.11.12a4.92 4.92 0 0 1 1.1 3.12z" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                      <a class="profile-card-socialicon flex items-center justify-center">
                        <svg width="25px" height="25px" id="Capa_1" enable-background="new 0 0 512 512"
                             viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                          <linearGradient
                              id="Oval_00000153700382965497781030000014141664724916521630_"
                              gradientTransform="matrix(1000 0 0 -1000 1981017 6242157)"
                              gradientUnits="userSpaceOnUse" x1="-1980.761" x2="-1980.761"
                              y1="6242.157" y2="6241.649">
                            <stop offset="0" stop-color="#2aabee" />
                            <stop offset="1" stop-color="#229ed9" />
                          </linearGradient>
                          <g id="Artboard" clip-rule="evenodd" fill-rule="evenodd">
                            <circle id="Oval" cx="256" cy="256"
                                    fill="url(#Oval_00000153700382965497781030000014141664724916521630_)"
                                    r="256" />
                            <path id="Path-3"
                                  d="m115.88 253.298c74.629-32.515 124.394-53.951 149.293-64.307 71.094-29.57 85.867-34.707 95.495-34.877 2.118-.037 6.853.488 9.92 2.977 4.55 3.692 4.576 11.706 4.071 17.01-3.853 40.48-20.523 138.713-29.004 184.051-3.589 19.184-10.655 25.617-17.495 26.246-14.866 1.368-26.155-9.825-40.554-19.263-22.531-14.77-35.26-23.964-57.131-38.376-25.275-16.656-8.89-25.81 5.514-40.771 3.77-3.915 69.271-63.494 70.539-68.899.159-.676.306-3.196-1.191-4.526s-3.706-.876-5.3-.514c-2.26.513-38.254 24.304-107.982 71.372-10.217 7.016-19.471 10.434-27.762 10.255-9.141-.197-26.723-5.168-39.794-9.417-16.032-5.211-28.774-7.967-27.664-16.817.578-4.611 6.926-9.325 19.045-14.144z"
                                  fill="#fff" />
                          </g>
                        </svg>
                      </a>
                      <a class="profile-card-socialicon flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px"
                             height="30px">
                          <path fill="#03a9f4" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
                          <path fill="#fff"
                                d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <div dir="rtl"
                       class="profile-card-description flex flex-col px-8 py-4 justify-center items-center content-center">
                    <div class="profile-card-description-title flex">
                      <a class="flex text-[14px] mb-1.5 text-title">{{ consultant.slogan }}</a>
                    </div>
                    <div class="profile-card-description-content flex">
                      <a class="flex text-[13px] text-[#ADAFCA] leading-6 text-center">{{ consultant.bio || 'بیوگرافی مشاور وارد نشده است' | truncate(100)
                        }}</a>
                    </div>
                  </div>
                </div>
              </VueSlickCarousel>
            </div>
            <div class="profile-card-buttons my-5 flex flex-row w-full justify-center items-center content-center">
              <!--                    <button class="flex items-center justify-center bg-[#615DFA] content-center px-5 py-1.5 rounded-md">-->
              <!--                        <p class="text-white text-[14px]">درخواست مشاوره</p>-->
              <!--                    </button>-->
              <router-link
                  :to="`/reserve/${consultant.id}`"
                  class="flex items-center justify-center bg-[#615DFA] content-center px-5 py-1.5 rounded-md"
              >
                <p class="text-white text-[14px]">درخواست مشاوره</p>
              </router-link>
            </div>
          </div>
      </div>
        </router-link>
    </div>

    <!-- #TODO -->
    <div class="main-content-home bg-white min-h-[500px] xl:w-[960px] w-11/12 xl:mx-0 mx-auto rounded-[15px] overflow-hidden" v-else-if="!loading && consultants.length === 0">
      <div class="flex flex-col w-full h-full  items-center  justify-center">
        <img src="/img/not-found.png" alt="" class="w-40">
        <span class="text-lg  block  mt-6  text-gray-300">هیچ مشاوری در این حوزه یافت نشد</span>
        <p class="text-gray-400  text-sm  mt-3">یک حوزه دیگر را انتخاب کنید</p>
      </div>
    </div>
    <div v-else
        class="main-content-home bg-white min-h-[500px] xl:w-[960px] w-11/12 xl:mx-0 mx-auto flex xl:flex-row flex-col flex-wrap rounded-[15px] overflow-hidden">
        <div v-for="n in resPerPage" :key="n" class="relative xl:rounded-none rounded-[15px] xl:mb-0 mb-4 xl:w-[320px] w-full h-auto
            bg-white flex flex-col items-center">
            <div
                class="skeleton skeleton-loading xl:rounded-t-none border-l-2 border-solid border-white rounded-t-[15px] flex w-full h-[135px]">
            </div>
            <div
                class="skeleton skeleton-loading flex w-[100px] h-[100px] object-cover rounded-full border-[10px]  border-solid border-white mx-auto absolute top-20">
            </div>
            <div
                class="profile-card-section xl:rounded-b-none rounded-b-[15px] border-x border-solid border-[#f3f3f3] flex flex-col w-full justify-center items-center content-center pt-10">
                <div class="skeleton skeleton-loading flex mt-4 h-[10px] w-[50px]">
                </div>
                <a class="skeleton skeleton-loading h-[20px] w-[100px] flex mt-4"></a>
                <div class="skeleton skeleton-loading w-[200px] h-[100px] mt-6">
                </div>
                <div class="profile-card-buttons my-5 flex flex-row w-full justify-center items-center content-center">
                    <button
                        class="skeleton skeleton-loading flex items-center justify-center w-[100px] h-[20px]  content-center px-5 py-1.5 rounded-md">
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
//set timeout for fallbacktemplate

export default {
    props: ['consultants', 'loading', 'resPerPage'],
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Profile-Card",
    components: {
        VueSlickCarousel,
    },
    methods: {
        // show name data of consultant.fields[0]




    },

    data() {
        return {
            settings: {
                arrows: false,
                dots: true,
                autoplay: true,
                dotsClass: 'slick-dots-custom',
            },
        }
    },
};
</script>
<style scoped>
.swiper-horizontal>.swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
    top: 135px !important;
    left: -135px !important;
}
</style>