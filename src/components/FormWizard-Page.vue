<template>
  <div class="home  bg-[#FAF9F8]  w-full   h-full  flex">
    <div class="w-full lg:px-20 px-4 py-4 pb-4 h-full">
      <FormWizard :activeStep="activeStep" @changePage="goToPage" :steps="ideaWizardSteps">
        <div class="body  lg:rounded-2xl  bg-white  p-4 pb-8  h-full  overflow-auto  overflow-x-hidden  scroll-style">
          <div v-show="activeStep === 1"
            :class="activeStep === 1 ? 'slide-in  wizard-tab-content' : ''" class="wizard-tab-1">
            <!-- <p class="text-grey-600">اطلاعات مشاور</p> -->
            <div class="flex  flex-col  lg:flex-row mt-2">
              <div class="lg:w-1/2">
                <span class="block  text-gray-800  mb-2">انتخاب حوزه مشاوره</span>
                <span class="block  mb-2 text-gray-600 text-sm leading-7">لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem
                  ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از
                  این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته
                  شده استفاده می نماید</span>
                <div v-if="!consultation?.status" class="a-filter mb-3 p-4 lg:pr-0 lg:w-2/3 w-full">
                  <label class="select relative" for="slct">
                    <p class="absolute -top-[14px] right-[12px] text-[13px] text-[#ADAFCA]">تخصص</p>
                    <!-- #TODO -->
                    <select v-model="selectedField" id="slct" required="required">
                      <option value="" disabled="disabled" selected="selected">یک تخصص انتخاب کنید</option>
                      <option v-for="field in consultant.fields" :key="field.id" :value="field.id">{{ field.name }}</option>
                    </select>
                    <svg>
                      <use xlink:href="#select-arrow-down"></use>
                    </svg>
                  </label>
                  <!-- SVG Sprites-->
                  <svg class="sprites">
                    <symbol id="select-arrow-down" viewbox="0 0 10 6">
                      <polyline points="1 1 5 5 9 1"></polyline>
                    </symbol>
                  </svg>
                </div>
                <div v-else>
                  <span class="my-8  text-black  text-sm  block"><span class="text-gray-600 ml-2">حوزه انتخاب شده:</span> {{ consultation?.field?.name }}</span>
                </div>
                <div
                  class="price-per-hour inline-block mt-0 mb-6  px-4 py-3 bg-[#d9edf7] text-sm border-solid border-r-[5px] lg:w-auto w-full border-[#bce8f1]">
                  <p class="inline-block text-[#31708f]">قیمت هر ساعت مشاوره :</p>
                  <p class="inline-block mr-2 font-bold text-[#31708f]">{{ consultant?.pricePerHour ? parseInt(consultant?.pricePerHour) + '  ' + 'تومان' : 'مشخص نشده' }}</p>
                </div>
                <button v-if="!consultation?.status" @click="confirmSelectedField" :disabled="!selectedField" :class="[selectedField ? '' : 'cursor-not-allowed  bg-opacity-50  hover:bg-opacity-50']"
                  class="bg-[#615DFA] hover:bg-[#433df8] lg:w-[340px] w-5/6 lg:mx-0 mx-auto text-white px-24 lg:mt-4 mb-6 lg:text-[18px] text-[14px] py-3 rounded-[10px] flex justify-center items-center content-center">ادامه</button>
              </div>
              <div class="lg:w-1/2">
                <div
                  class="profile-card-body relative rounded-[15px] mx-auto xl:mb-0 mb-4 w-[320px] h-auto bg-white flex flex-col items-center">
                  <img class="profile-card-header rounded-t-[15px] flex w-full h-[135px]"
                       :src="consultant.coverImage ? 'https://api.metalk.online/static/' + consultant.coverImage : '/cover.png'" alt="profile card header">
                  <img :src="consultant.profileImage ? 'https://api.metalk.online/static/' + consultant.profileImage : '/img.png'" alt="profile card avatar"
                    class="profile-card-avatar flex w-[90px] h-[90px] object-cover rounded-full bg-white p-1 mx-auto absolute top-20">
                  <div
                    class="profile-card-section xl:rounded-b-none rounded-b-[15px] border-x border-solid border-[#f3f3f3] flex flex-col w-full justify-center items-center content-center pt-10">
                    <a class="profile-card-name text-[18px] text-title flex mt-4">{{
                      consultant?.firstname ? `${consultant?.firstname} ${consultant?.lastname}` : 'نامشخص'
                    }}</a>
                    <a class="profile-card-name-about text-[12px] flex mt-2 text-[#ADAFCA]">{{
                      consultant?.fields?.reduce((acc, item) => {
                        if (!acc) return item.name;
                        return acc + ", " + item.name;
                      }, "") || 'حوزه کاری نامشخص'
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
                            <div v-if="consultant?.socialMedias?.length !== 0" class="social-medias">
                              <ul class="social-meida-wrapper  flex  justify-center  my-8">
                                <a :class="getSocialMediaColor(social.name)" v-html="getSocialMediaIcon(social.name)" v-for="social in consultant?.socialMedias" :key="social.name" class="flex  justify-center  items-center  w-10  h-10  rounded  transition-transform  ml-2  hover:-translate-y-1 " href="https://www.facebook.com/Odin-Design-Themes-and-Templates-1985202918413398/" target="_blank">
                                </a>
                              </ul>
                            </div>
                            <!-- <div
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
                                <svg width="25px" height="25px" viewBox="0 0 152 152" xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="22.26"
                                    x2="129.74" y1="22.26" y2="129.74">
                                    <stop offset="0" stop-color="#fae100" />
                                    <stop offset=".15" stop-color="#fcb720" />
                                    <stop offset=".3" stop-color="#ff7950" />
                                    <stop offset=".5" stop-color="#ff1c74" />
                                    <stop offset="1" stop-color="#6c1cd1" />
                                  </linearGradient>
                                  <g id="Layer_2" data-name="Layer 2">
                                    <g id="Circle">
                                      <g id="_03.Instagram" data-name="03.Instagram">
                                        <rect id="Background" fill="url(#linear-gradient)" height="152" rx="76"
                                          width="152" />
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
                                  <linearGradient id="Oval_00000153700382965497781030000014141664724916521630_"
                                    gradientTransform="matrix(1000 0 0 -1000 1981017 6242157)"
                                    gradientUnits="userSpaceOnUse" x1="-1980.761" x2="-1980.761" y1="6242.157"
                                    y2="6241.649">
                                    <stop offset="0" stop-color="#2aabee" />
                                    <stop offset="1" stop-color="#229ed9" />
                                  </linearGradient>
                                  <g id="Artboard" clip-rule="evenodd" fill-rule="evenodd">
                                    <circle id="Oval" cx="256" cy="256"
                                      fill="url(#Oval_00000153700382965497781030000014141664724916521630_)" r="256" />
                                    <path id="Path-3"
                                      d="m115.88 253.298c74.629-32.515 124.394-53.951 149.293-64.307 71.094-29.57 85.867-34.707 95.495-34.877 2.118-.037 6.853.488 9.92 2.977 4.55 3.692 4.576 11.706 4.071 17.01-3.853 40.48-20.523 138.713-29.004 184.051-3.589 19.184-10.655 25.617-17.495 26.246-14.866 1.368-26.155-9.825-40.554-19.263-22.531-14.77-35.26-23.964-57.131-38.376-25.275-16.656-8.89-25.81 5.514-40.771 3.77-3.915 69.271-63.494 70.539-68.899.159-.676.306-3.196-1.191-4.526s-3.706-.876-5.3-.514c-2.26.513-38.254 24.304-107.982 71.372-10.217 7.016-19.471 10.434-27.762 10.255-9.141-.197-26.723-5.168-39.794-9.417-16.032-5.211-28.774-7.967-27.664-16.817.578-4.611 6.926-9.325 19.045-14.144z"
                                      fill="#fff" />
                                  </g>
                                </svg>
                              </a>
                              <a class="profile-card-socialicon flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px">
                                  <path fill="#03a9f4" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
                                  <path fill="#fff"
                                    d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12" />
                                </svg>
                              </a>
                            </div> -->
                          </div>
                        </div>
                        <div>
                          <div
                            class="profile-card-description flex flex-col px-8 py-4 pt-0 justify-center items-center content-center">
                            <div class="profile-card-description-title flex">
                              <p dir="rtl" class="flex text-[14px] mb-1.5 text-title">{{ consultant?.slogan || 'شعاری مشخص نشده است' }}</p>
                            </div>
                            <div class="profile-card-description-content flex">
                              <p dir="rtl" class="flex text-[13px] text-[#ADAFCA] leading-6 text-center">{{ consultant?.bio || 'بیوگرافی مشاور وارد نشده است. در این قسمت توضیحاتی مربوط به مشاور وارد میشود' | truncate(100) }}</p>
                            </div>
                          </div>
                        </div>
                      </VueSlickCarousel>
                    </div>
                    <div
                      class="profile-card-buttons my-5 flex flex-row w-full justify-center items-center content-center">
                      <!-- <button class="bg-[#615DFA] flex flex-row items-center justify-center content-center mr-4 px-5 py-1.5 rounded-md">
    <p class="flex text-[14px] text-white ml-2">دنبال کردن</p>
    <svg class="flex" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.00008 6.00002H1.66675M7.00008 11.3334V6.00002V11.3334ZM7.00008 6.00002V0.666687V6.00002ZM7.00008 6.00002H12.3334H7.00008Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
</button> -->
                      <!-- <button class="flex items-center justify-center bg-[#615DFA] content-center px-5 py-1.5 rounded-md">
<p class="text-white text-[14px]">درخواست مشاوره</p>
</button> -->
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div v-show="activeStep === 2"
            :class="activeStep === 2 ? 'slide-in  wizard-tab-content' : ''" class="wizard-tab-2">
            <p>درخواست مشاوره</p>
            <div class="flex  flex-col  lg:flex-row  mt-8">
              <div class="lg:w-1/2">
                <div class="text-editor-container w-full">
                  <Editor v-if="!consultation?.status" ref="editor" :config="editorConfig" />
                  <div v-else>
                    <span class="text-gray-600 block  text-sm  mb-4">پیام شما: </span>
                    <p class="text-gray-700" v-html="getHtmlFromEditorJs(consultation?.request?.description)"></p>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2">
                <div class="card-info  mt-8  lg:mt-0 mb-8  p-6  border  border-grey-400  rounded-md">
                  <div class="card-info__header  flex  items-center  text-grey">
                    <span class="ml-2">
                      <svg class="w-5  h-5  fill-current  text-grey" height="512pt" viewBox="0 0 512 512" width="512pt"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="m277.332031 128c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0" />
                        <path
                          d="m256 405.332031c-8.832031 0-16-7.167969-16-16v-165.332031h-21.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h37.332031c8.832031 0 16 7.167969 16 16v181.332031c0 8.832031-7.167969 16-16 16zm0 0" />
                        <path
                          d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" />
                        <path
                          d="m304 405.332031h-96c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                      </svg>
                    </span>
                    <span>
                      راهنما:
                    </span>
                  </div>
                  <p class="text-grey  text-sm  mt-3  leading-6">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                    و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                    کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                    آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                    ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                  </p>
                </div>
                <loading-btn v-if="!consultation?.status" @onClick="sendConsultationRequest" type="button" :text="'ارسال درخواست'" :loading="sendConsultationRequestLoading"
                        :classes="['bg-[#615DFA] hover:bg-[#433df8] lg:w-[340px] w-5/6 lg:mx-0 mx-auto text-white px-24 lg:mt-4 mb-6 lg:text-[18px] text-[14px] py-3 rounded-[10px] flex justify-center items-center content-center']" />
              </div>
              <!-- " -->
            </div>
          </div>
          <div v-show="activeStep === 3"
            :class="activeStep === 3 ? 'slide-in  wizard-tab-content' : ''" class="wizard-tab-3">
            <p>رزرو مشاوره</p>
            <div class="flex  flex-col  lg:flex-row  mt-8">
              <div class="lg:w-2/3" :class="{'lg:w-full': ['RESERVED', 'REQUESTED'].includes(consultation.status)}">
                <div>
                  <div v-if="consultation.status === 'REQUESTED'">
                    <div class="flex flex-col w-full h-full  items-center  text-center  justify-center">
                      <img src="/img/website-consulting-illustration.png" alt="" class="w-96  rounded-lg  border">
                      <span class="text-lg  block  mt-6  text-gray-600">درخواست مشاوره ارسال شد.</span>
                      <p class="text-gray-500  text-sm  leading-7  lg:w-80  mt-3">
                        درخواست مشاوره شما با موفقیت ثبت شد. پس از بررسی درخواست توسط مشاور و قبول یا رد کردن درخواست از طریق پیامک و ایمیل به شما اطلاع داده می شود.
                      </p>
                      <router-link to="/profile/consultation">
                        <button class="bg-[#FAF9F8]  border  border-blue-600  text-blue-600  py-2  mt-8  hover:bg-blue-600  hover:text-white  transition-all  px-14  rounded">لیست مشاوره های من</button>
                      </router-link>
<!--                      <button class="bg-[#FAF9F8]  border  border-blue-600  text-blue-600  py-2  mt-8  hover:bg-blue-600  hover:text-white  transition-all  px-14  rounded">لیست مشاوره های من</button>-->
                    </div>
                  </div>
                  <div v-else-if="consultation.status === 'ACCEPTED'">
                    <span class="text-lg  block  mb-3  text-green-600">درخواست شما توسط مشاور پذیرفته شد.</span>
                    <p class="text-gray-600 leading-7 text-sm mb-2 w-11/12">
                      لطفا یک یا چنتا از تایم های پیشنهادی را انتخاب کنید و دکمه رزرو را بزنید. در صورتی که هیچکدام از تایم های زیر مد نظرتون نیست لطفا مشاوره را کنسل کنید و درخواست جدیدی ثبت کنید.
                    </p>
                  </div>
                  <div v-else-if="consultation.status === 'REJECTED'">
                    <span class="text-lg  block  mb-3  text-red-600">درخواست مشاوره رد شد</span>
                    <p class="text-gray-600 leading-7 text-sm mb-2 w-11/12">
                      متاسفانه درخواست شما توسط مشاور رد شد. شما می توانید در حوزه های مختلف مشاوره دیگه ای رو ثبت کنید.
                    </p>
                    <router-link to="/">
                      <button class="bg-[#FAF9F8]  border  border-blue-600  text-blue-600  py-2  mt-8  hover:bg-blue-600  hover:text-white  transition-all  px-14  rounded">درخواست مشاوره جدید</button>
                    </router-link>
                  </div>
                  <div v-if="consultation?.status === 'ACCEPTED'"
                    class="consultant-time-reservation mt-6 lg:w-11/12 w-full">
                    <ul class="flex flex-row flex-wrap">
                      <li v-for="time in consultation.accept.recommendedTimes" :key="time.startAt" class="flex lg:w-auto ml-4  mt-4  w-1/3">
                        <label :for="time.startAt" 
                          class="a-reservation-time p-4 rounded-lg border-solid border border-gray-300 lg:ml-0 ml-2 lg:w-[130px]">
                          <input @change="chkRsrv()" v-model="chkRsrvs" :id="time.startAt" :value="time.startAt" type="radio" :name="time.startAt">
                          <span class="checkmark"></span>
                          <p class="text-[16px] my-2 mt-[30px]">{{ getDateDayName(time.startAt) }}</p>
                          <p class="text-xs mb-2 text-gray-800">{{ getDate(time.startAt) }}</p>
                          <p class="text-xs text-gray-800">{{ getDateHours(time.startAt, time.endAt) }}</p>
                        </label>
                      </li>
                    </ul>
                    <div v-if="consultant?.pricePerHour" class="total-price flex flex-row mt-10 mb-8 text-lg">
                      <p class="flex ml-2 text-gray-600">مجموع قیمت :</p>
                      <p class="flex ml-2 font-bold">{{ calculateTotalPrice() }} تومان</p>
                    </div>
                    <loading-btn v-if="consultation?.status === 'ACCEPTED'" @onClick="reserve" type="button" :text="'رزرو'" :loading="reserveConsultationLoading"
                        :classes="['bg-[#615DFA] reserve-button hover:bg-[#433df8] lg:w-[340px] w-5/6 lg:mx-0 mx-auto text-white px-24 lg:mt-4 mb-6 text-[18px] py-3 rounded-[15px] flex justify-center items-center content-center']" />
                  </div>
                  <div v-if="['RESERVED'].includes(consultation.status)">
                    <div class="flex flex-col w-full h-full  items-center  text-center  justify-center">
                      <img src="/img/website-consulting-illustration.png" alt="" class="w-96  rounded-lg  border">
                      <span class="text-lg  block  mt-6  text-gray-600">مشاوره برای شما رزرو شد</span>
                      <p class="text-gray-500  text-sm  leading-7  lg:w-80  mt-3">
                        ما از طریق ایمیل یا پیامک به شما خبر میدیم لطفا صبور باشید.
                      </p>
                      <button class="bg-[#FAF9F8]  border  border-blue-600  text-blue-600  py-2  mt-8  hover:bg-blue-600  hover:text-white  transition-all  px-14  rounded">دیدن جزئیات مشاوره</button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="consultation?.status === 'ACCEPTED' && consultation?.accept?.description" class="lg:w-1/2">
                <div class="card-info  mt-8  lg:mt-0  p-6  border  border-grey-400  rounded-md">
                  <div class="card-info__header  flex  items-center  text-grey">
                    <span class="ml-2">
                      <svg class="w-5  h-5  fill-current  text-grey" height="512pt" viewBox="0 0 512 512" width="512pt"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="m277.332031 128c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0" />
                        <path
                          d="m256 405.332031c-8.832031 0-16-7.167969-16-16v-165.332031h-21.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h37.332031c8.832031 0 16 7.167969 16 16v181.332031c0 8.832031-7.167969 16-16 16zm0 0" />
                        <path
                          d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" />
                        <path
                          d="m304 405.332031h-96c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                      </svg>
                    </span>
                    <span>
                      پیام مشاور:
                    </span>
                  </div>
                  <p v-html="getHtmlFromEditorJs(consultation?.accept?.description)" class="text-gray-700  text-sm  mt-3  leading-6"></p>
                </div>
              </div>
              <div v-if="consultation?.status === 'REJECTED' && consultation?.reject?.description" class="lg:w-1/2">
                <div class="card-info  mt-8  lg:mt-0  p-6  border  border-grey-400  rounded-md">
                  <div class="card-info__header  flex  items-center  text-grey">
                    <span class="ml-2">
                      <svg class="w-5  h-5  fill-current  text-grey" height="512pt" viewBox="0 0 512 512" width="512pt"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="m277.332031 128c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0" />
                        <path
                          d="m256 405.332031c-8.832031 0-16-7.167969-16-16v-165.332031h-21.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h37.332031c8.832031 0 16 7.167969 16 16v181.332031c0 8.832031-7.167969 16-16 16zm0 0" />
                        <path
                          d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" />
                        <path
                          d="m304 405.332031h-96c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                      </svg>
                    </span>
                    <span>
                      پیام مشاور:
                    </span>
                  </div>
                  <p v-html="getHtmlFromEditorJs(consultation?.reject?.description)" class="text-gray-700  text-sm  mt-3  leading-6"></p>
                </div>
              </div>
            </div>
          </div>
           <div v-show="activeStep === 4" :class="activeStep === 4 ? 'slide-in  wizard-tab-content' : ''" class="wizard-tab-4">
            <p class="text-grey-600">جزئیات مشاوره</p>
            <div class="flex  flex-col  lg:flex-row  mt-8">
              <div class="lg:w-1/2">
                <ul>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">وضعیت مشاوره: </span>
                    <span :class="statusColor[consultation.status]">{{ consultation.status | getStatusLabel }}</span>
                  </li>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">تاریخ درخواست مشاوره: </span>
                    <span class="text-gray-800">{{ getDatePersionFormat(consultation?.createdAt) }}</span>
                  </li>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">زمان های پیشنهادی مشاور: </span>
                    <span v-for="(time, index) in consultation?.accept?.recommendedTimes" :key="time.startAt">
                      <span class="text-gray-800  mr-1">{{ getDatePersionFormat(time.startAt) }}</span>
                      <span class="mx-1" v-if="(index + 1) !== consultation?.accept?.recommendedTimes?.length">-</span>
                    </span>
                  </li>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">تاریخ پذیرش مشاوره: </span>
                    <span class="text-gray-800">{{ getDatePersionFormat(consultation?.accept?.acceptedAt) }}</span>
                  </li>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">حوزه مشاوره: </span>
                    <span class="text-gray-800">{{ consultation?.field?.name }}</span>
                  </li>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">نوع مشاوره: </span>
                    <span class="text-gray-800">{{ consultation?.type }}</span>
                  </li>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">قیمت نهایی شده: </span>
                    <span class="text-gray-800">{{ consultation?.consultant?.pricePerHour && consultation?.ReservedTime.length * consultation?.consultant?.pricePerHour }} تومان</span>
                  </li>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">زمان های رزرو شده مشاوره: </span>
                    <span v-for="(time, index) in consultation?.ReservedTime" :key="time.startAt">
                      <span class="text-gray-800  mr-1">{{ getDatePersionFormat(time.startAt) }}</span>
                      <span class="mx-1" v-if="(index + 1) !== consultation?.accept?.recommendedTimes?.length">-</span>
                    </span>
                  </li>
                  <div class="divider  my-6  h-[1px]  bg-slate-300"></div>
                  <li class="block  mb-3">
                    <span class="ml-1  text-gray-600">لینک مشاوره: </span>
                    <div v-if="consultation?.meetLinks?.userLink" class="price-per-hour mt-0 mb-6  px-4 py-3 bg-[#d9edf7] text-sm border-solid border-r-[5px] lg:w-auto w-full border-[#bce8f1]">
                      <a target="_blank" :href="consultation?.meetLinks?.userLink" class="inline-block mr-2 font-bold text-[#31708f]">لینک برگزاری مشاوره</a>
                    </div>
                    <span class="text-sm  text-green-600">لینک برگزاری مشاوره توسط مشاور برای شما ارسال می شود.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      </FormWizard>
    </div>
  </div>
</template>

<script>

import FormWizard from '@/components/FormWizard/Wizard-Section.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
// set array for reserve-1 reserve-2 reserve-3 reserve-4 reserve-5
import { mapActions, mapGetters } from 'vuex'
import LoadingBtn from '../components/LoadingBtn.vue'
import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();



export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Wizards',
  components: {
    FormWizard,
    VueSlickCarousel,
    LoadingBtn
  },
  data() {
    return {
      isActive: false,
      sendConsultationRequestLoading: false,
      reserveConsultationLoading: false,
      activeStep: 1,
      isClickable: true,
      chkRsrvs: [],
      selectedField: '',
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
      consultation: {},
      loadingConsultations: false,
      settings: {
        arrows: false,
        dots: true,
        autoplay: true,
        dotsClass: 'slick-dots-custom',
      },
      editorConfig: {
        tools: {
          header: require('@editorjs/header'),
          paragraph: {
            config: {
              placeholder: 'توضیحات خود را در این مکان بنویسید ...',
            }
          }
        },
        readOnly: false,
      },
      ideaWizardSteps: [
        {
          text: 'حوزه مشاوره',
          icon: 'icon.png',
          done: true,
          error: false,
        },
        {
          text: 'درخواست مشاوره',
          icon: 'icon.png',
          done: false,
          error: false,
        },
        {
          text: 'رزرو مشاوره',
          icon: 'icon.png',
          done: false,
          error: false,
        },
          {
            text: 'جزئیات مشاوره',
            icon: 'icon.png',
            done: false,
            error: false,
          },
      ],
      membersWizardSteps: [
        {
          text: 'اعضای استارتاپ',
          icon: 'icon.png',
          done: true,
          error: false,
        },
      ],
      stepsPageNumber: {
        field: 1,
        request: 2,
        reserve: 3,
        details: 4,
      },
      statusColor: {
        'REQUESTED': 'text-gray-700',  
        'RESERVED': 'text-green-600',
        'ACCEPTED': 'text-blue-600',
        'REJECTED': 'text-red-600',
        'IN_PROGRESS': 'text-green-600',
        'CANCELED': 'text-red-600',
        'FINISHED': 'text-black',
      }
    }
  },
  computed: {
    ...mapGetters(['consultantById']),
  },
  methods: {
    ...mapActions(['getConsultationById', 'reserveConsultation', 'getConsultantById']),

    async saveData(editor) {
      return new Promise((resolve, reject) => {
        if(!this.$refs[editor]) return
        this.$refs[editor].state.editor
          .save()
          .then(outputData => {
            delete outputData.time;
            resolve(outputData);
          })
          .catch(error => {
            reject(error);
            console.log("Saving failed: ", error);
          });
      });
    },
    calculateTotalPrice() {
      return this.consultation.consultant.pricePerHour * this.chkRsrvs.length
    },
    getDateDayName(time) {
      if(!time) return;
      const res = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(new Date(time))
      return res;
    },
    getDatePersionFormat(time) {
      if(!time) return;
      return new Intl.DateTimeFormat('fa-IR', { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'long', weekday: 'long', day: 'numeric' }).format(new Date(time))
    },
    async reserve() {
      try {
        if(!this.isActive) return;
        this.reserveConsultationLoading = true;
        const times = this.consultation.accept.recommendedTimes.filter(t => this.chkRsrvs.includes(t.startAt));
        if(times.length === 0) return;
        await this.reserveConsultation({
          selectedRecommendedTimes: times,
          consultationId: this.consultation.id
        });
        this.reserveConsultationLoading = false;
        this.consultation.status = 'RESERVED';
        this.handleDetailPageChange();
        this.$toast.open({
          message: 'مشاوره با موفقیت رزرو شد بزودی تیم پشتیبانی با شما تماس میگیرد.',
          type: "success",
          position: "bottom-left",
          duration: 5000,
          dismissible: true,
        });
      } catch (err) {
        this.reserveConsultationLoading = false;
        this.sendConsultationRequestLoading = false;
        const errResponse = err?.response?.data;
        if(errResponse) {
          this.$toast.open({
            message: errResponse?.error?.detail,
            type: "error",
            position: "bottom-left",
            duration: 5000,
            dismissible: true,
          });
          return
        }
        console.log(err);
        this.$toast.open({
          message: 'خطایی ناشناخته رخ داد لطفا با تیم پشتیبانی تماس بگیرید',
          type: "error",
          position: "bottom-left",
          duration: 5000,
          dismissible: true,
        });
      }
    },
    getHtmlFromEditorJs(content) {
      if (!content || !content.blocks) return;
      const htmlArr = edjsParser.parse(content);
      let htmlText = htmlArr.join(" ");
      htmlText = htmlText.replace(/&lt;/g, "<");
      htmlText = htmlText.replace(/&gt;/g, ">");
      return htmlText;
    },
    getSocialMediaColor(name) {
      switch (name) {
        case 'فیسبوک':
          return 'bg-[#3763d2]'
        case 'اینستاگرام':
          return 'bg-[#f8468d]'
        case 'توییتر':
          return 'bg-[#1abcff]'
        default:
          break;
      }
    },
    getSocialMediaIcon(name) {
      switch (name) {
        case 'فیسبوک':
          return `<svg class="icon-facebook social-link-icon  fill-white  w-3  h-3  overflow-hidden">
                    <use href="#svg-facebook"></use>
                      <symbol id="svg-facebook" viewBox="0 0 18 18" preserveAspectRatio="xMinYMin meet">
                        <path d="M16.313,18h-4.504v-6.192h3.087V8.671h-3.087V7.135V6.831V6.814l0,0c0.01-0.328,0.277-0.591,0.607-0.591h0.067h1.113h1.62V3.086h-2.733l0,0l-0.009,0.018h-0.092c-2.051,0-3.712,1.661-3.712,3.711v0.911v0.945H6.191v3.137h2.479V18H1.687C0.755,18,0,17.242,0,16.313V1.686C0,0.754,0.755,0,1.687,0h14.626C17.244,0,18,0.754,18,1.686v14.627C18,17.242,17.244,18,16.313,18z"></path>
                      </symbol>
                  </svg>`
        case 'توییتر':
          return `<svg class="icon-facebook social-link-icon  fill-white  w-3  h-3  overflow-hidden">
                    <use href="#svg-twitter">
                      <symbol id="svg-twitter" viewBox="0 0 18 18" preserveAspectRatio="xMinYMin meet">
                        <path d="M18,3.617c-0.675,0.322-1.351,0.43-2.139,0.537c0.788-0.43,1.351-1.076,1.576-1.937c-0.675,0.43-1.463,0.646-2.362,0.861C14.399,2.431,13.388,2,12.375,2c-1.912,0-3.601,1.617-3.601,3.554c0,0.323,0,0.538,0.113,0.754C5.851,6.2,3.038,4.8,1.238,2.646C0.9,3.185,0.788,3.724,0.788,4.478c0,1.184,0.675,2.261,1.688,2.907c-0.563,0-1.125-0.216-1.688-0.431l0,0c0,1.723,1.237,3.122,2.925,3.446c-0.338,0.107-0.675,0.107-1.013,0.107c-0.225,0-0.45,0-0.675-0.107c0.45,1.399,1.8,2.476,3.487,2.476C4.274,13.846,2.7,14.384,0.9,14.384c-0.338,0-0.563,0-0.9,0C1.688,15.354,3.601,16,5.625,16c6.75,0,10.462-5.385,10.462-10.015c0-0.108,0-0.323,0-0.431C16.875,5.016,17.549,4.371,18,3.617z"></path>
                      </symbol>
                    </use>
                  </svg>`
        case 'اینستاگرام': 
          return `<svg class="icon-instagram social-link-icon  fill-white  w-3  h-3  overflow-hidden">
                    <use href="#svg-instagram">
                      <symbol id="svg-instagram" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">
                        <path d="M72.402,0H27.595C12.379,0,0,12.381,0,27.597v44.809C0,87.619,12.379,100,27.595,100h44.807C87.621,100,100,87.619,100,72.406V27.597C100,12.381,87.621,0,72.402,0z M88.691,71.078c0,9.711-7.902,17.613-17.615,17.613H28.923c-9.712,0-17.613-7.902-17.613-17.613V28.926c0-9.715,7.901-17.618,17.613-17.618h42.153c9.713,0,17.615,7.903,17.615,17.618V71.078z M50.001,26.779c-12.804,0-23.22,10.426-23.22,23.22c0,12.804,10.416,23.22,23.22,23.22c12.801,0,23.217-10.416,23.217-23.22C73.219,37.205,62.803,26.779,50.001,26.779z M50.001,63.689c-7.548,0-13.688-6.139-13.688-13.691c0-7.545,6.14-13.684,13.688-13.684c7.545,0,13.686,6.139,13.686,13.684C63.688,57.551,57.547,63.689,50.001,63.689z M75.658,17.864c-1.711,0-4.383,0.724-5.711,2.056c-1.332,1.328-2.098,3.178-2.098,5.065c0,1.882,0.766,3.727,2.098,5.063c1.326,1.325,3.172,2.098,5.051,2.098c1.885,0,3.723-0.772,5.055-2.098c1.332-1.336,2.094-3.184,2.094-5.063c0-1.888-0.762-3.737-2.094-5.065C78.729,18.587,77.373,17.864,75.658,17.864z"></path>
                      </symbol>
                    </use>
                  </svg>`
        default:
          break;
      }
    },
    getDate(time) {
      if(!time) return;
      const res = new Intl.DateTimeFormat('fa-IR', { day: '2-digit', month: 'long' }).format(new Date(time))
      return res;
    },
    getDateHours(startAt, endAt) {
      if(!startAt || !endAt) return;
      const start = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(new Date(startAt))
      const end = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(new Date(endAt))
      return `${start} تا ${end}`;
    },
    async sendConsultationRequest() {
      try {
        this.sendConsultationRequestLoading = true;
        const editorData = await this.saveData('editor')

        const payload = {
          consultantId: this.consultant.id,
          type: 'VOICE_CHAT',
          fieldId: this.selectedField,
          description: editorData,
          // request: {
          //   description: editorData
          // }
        };

        const { data } = await this.$store.dispatch('requestConsultation', payload);
        this.consultation = data.consultation;
        console.log(this.consultation);
        this.sendConsultationRequestLoading = false;
        this.$refs.editor.state.editor.readOnly.toggle();
        this.$router.push({ 
          params: {
            id: this.consultation.id
          }, 
          query: {
            requested: 'true'
          } 
        });
        this.handleReserveTimePageChange();

      } catch (err) {
        this.sendConsultationRequestLoading = false;
        const errResponse = err?.response?.data;
        if(errResponse) {
          this.$toast.open({
            message: errResponse?.error?.detail,
            type: "error",
            position: "bottom-left",
            duration: 5000,
            dismissible: true,
          });
          return
        }
        console.log(err);
        this.$toast.open({
          message: 'خطایی ناشناخته رخ داد لطفا با تیم پشتیبانی تماس بگیرید',
          type: "error",
          position: "bottom-left",
          duration: 5000,
          dismissible: true,
        });
      }
    },
    handleFieldPageChange() {
      this.activeStep = this.stepsPageNumber['field'];
      this.changePageUrlQuery('field');
    },
    changePageUrlQuery(page) {
      this.$router.replace({ query: { ...this.$route.query, page } })
    },
    confirmSelectedField() {
      if(!this.selectedField && !this.consultation?.status) {
        console.log('please select a field');
        return;
      }
      this.handleRequestPageChange();
    },
    handleRequestPageChange() {
      if(!this.selectedField && !this.consultation.status) return;
      this.activeStep = this.stepsPageNumber['request'];
      this.changePageUrlQuery('request');
    },
    handleReserveTimePageChange() {
      if(!this.consultation?.status) return;
      this.activeStep = this.stepsPageNumber['reserve'];
      this.changePageUrlQuery('reserve');
    },
    handleDetailPageChange() {
      if(!['RESERVED', 'FINISHED', 'IN_PROGRESS'].includes(this.consultation?.status)) return;
      this.activeStep = this.stepsPageNumber['details'];
      this.changePageUrlQuery('details');
    },
    goToPage(page) {
      switch (page) {
        case 1:
          this.handleFieldPageChange()
          break;
        case 2:
          this.handleRequestPageChange()
          break;
        case 3:
          this.handleReserveTimePageChange()
          break;
        case 4:
          this.handleDetailPageChange()
          break;
        default:
          break;
      }
    },
    //set method that if all of a-reservation-time input unchecked disable reserve-button
    chkRsrv() {
      this.isActive = this.chkRsrvs.length !== 0;
    },
    changeColor() {
      this.isActive = !this.isActive
      this.isClickable = !this.isClickable
    },

    consultantActive(consultant) {
      if(!consultant || !consultant?.active || consultant?.blocked) {
        return false
      }
      return true
    },
    async getConsultantProfile(consultantId) {
      try {
        // let consultant = this.consultantById(consultantId);
        // if (!consultant) {
          console.log('fetch from server')
          const {data} = await this.$store.dispatch("getConsultantById", {
            consultantId,
          });
          // consultant = data.consultant;
        // }
        console.log("consultant reserve:", data.consultant)
        this.consultant = data.consultant;
      } catch (error) {
        console.log(error);
      }
    },
    async getConsultation(id) {
      try {
        const { data } = await this.getConsultationById(id);
        console.log(data.consultation)
        // if(data?.consultation) {
          this.consultation = data.consultation;
          // this.consultant = data.consultant
        // }
      } catch (error) {
        console.log(error);
      }
    }

    
  },

  mounted() {
    const { id } = this.$route.params;
    const { requested, page = '' } = this.$route.query;
    if(requested === 'true' && id) {
      this.getConsultation(id);
      if(page && Object.keys(this.stepsPageNumber).includes(page)) {
        this.activeStep = this.stepsPageNumber[page];
      }
    } else if(id) {
      this.getConsultantProfile(id);
    } else {
      this.$router.push({ name: "home" });
      return;
    }
  },
}

</script>
<style scoped>
.stepper-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 20px;
  color: #007bff;
}

.stepper-text span {
  color: #ced4da;
  font-size: 16px;
}

/* vertical wizard style */

.vertical-wizard>li {
  position: relative;
  color: #5a646e;
  font-weight: bold;
  padding-right: 25px;
  border-right: 2px dashed #ced4da;
  font-size: 16px;

  /* padding-bottom: 130px; */
  /* min-height: 130px; */
}

.vertical-wizard>li::after {
  display: block;
  content: " ";
  position: absolute;
  width: 20px;
  height: 20px;
  /* border: 8px solid green; */
  background: #ced4da;
  border-radius: 100%;
  top: 10px;
  right: -11px;
  transform: translateY(-50%);
}

ul.nested-steps {
  padding-right: 15px;
  margin-top: 20px;
  color: #adb5bd;
  font-weight: normal;
  font-size: 14px;
}

ul.nested-steps>li {
  position: relative;
  padding-bottom: 30px;
}

ul.nested-steps>li::after {
  display: block;
  content: " ";
  position: absolute;
  width: 10px;
  height: 10px;
  /* border: 4px solid green; */
  background: #ced4da;
  border-radius: 100%;
  top: 8px;
  right: -46px;
  /* transform: translateY(-50%); */
}

/* .vertical-wizard li::before {
  display: block;
  content: " ";
  position: absolute;
  width: 5px;
  height: 100px;
  background: #000;
  border-radius: 5px;
  top: 30px;
  right: 13px;
  transform: translateX(50%);
} */

.scroll-downs {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 34px;
  height: 55px;
}

.mousey {
  width: 3px;
  padding: 4px 8px;
  height: 25px;
  border: 2px solid #5a646e;
  border-radius: 25px;
  opacity: 0.75;
  box-sizing: content-box;
}

.scroller {
  width: 2px;
  height: 6px;
  border-radius: 25%;
  background-color: #5a646e;
  animation-name: scroll;
  animation-duration: 2.2s;
  animation-timing-function: cubic-bezier(.15, .41, .69, .94);
  animation-iteration-count: infinite;
}

@keyframes scroll {
  0% {
    opacity: 0;
  }

  10% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(15px);
    opacity: 0;
  }
}
</style>
