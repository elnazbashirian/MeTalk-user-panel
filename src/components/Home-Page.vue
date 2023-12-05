<template>
  <div class="main-wrapper xl:w-[1280px] w-full mx-auto">
    <div
      class="
        search-section
        mt-14
        flex flex-col
        justify-center
        items-center
        content-center
      "
    >
      <h1 class="xl:text-[30px] text-[25px] flex text-title">
        دنبال چه کسی می گردی؟
      </h1>
      <div class="search-section-input relative xl:w-auto w-11/12">
        <input
          @keyup="searchConsultants"
          v-model="searchInput"
          autocomplete="off"
          placeholder="اسم مشاور"
          type="text"
          :class="{ 'z-[9999]': SearchResultWindow }"
          class="
            xl:w-[792px]
            w-full
            relative
            h-[60px]
            xl:h-[80px]
            border border-[#DEDEEA]
            rounded-full
            focus:outline-none focus:border-gray-600
            mt-5
            pr-6
            bg-white
            xl:text-[23px]
            text-[18px] text-[#ADAFCA] text-right
          "
        />
        <div
          @click.self="hideResultWindow"
          :class="{
            hidden: !SearchResultWindow,
            'z-[9998]': SearchResultWindow,
          }"
          class="search-result-backdrop fixed inset-0 bg-black bg-opacity-60"
        ></div>
        <div
          :class="{
            hidden: !SearchResultWindow,
            'z-[9999]': SearchResultWindow,
          }"
          class="
            absolute
            right-[50%]
            translate-x-[50%]
            w-full
            xl:w-11/12
            border border-solid border-[#F7F7FA]
            bg-white
            shadow-2xl
            rounded-xl
            xl:top-[110px]
            top-[90px]
            min-h-[150px]
            max-h-[300px]
            overflow-hidden
          "
        >
          <div
            class="
              w-full
              py-0
              min-h-[150px]
              max-h-[300px]
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
              overflow-y-scroll
            "
          >
            <div
              v-if="searchInputLoading"
              class="a-search-result flex flex-row p-4 w-full"
            >
              <div
                class="
                  skeleton skeleton-loading
                  flex
                  search-result-image
                  w-[80px]
                  h-[80px]
                  rounded-lg
                "
              ></div>
              <div class="search-reslut-info flex flex-col mr-4 mt-[18px]">
                <div
                  class="
                    skeleton skeleton-loading
                    rounded-full
                    search-reslut-name
                    w-[100px]
                    h-[15px]
                  "
                ></div>
                <div
                  class="
                    skeleton skeleton-loading
                    rounded-full
                    search-reslut-field
                    w-[150px]
                    h-[15px]
                    mt-3
                  "
                ></div>
              </div>
            </div>
            <div
              v-else-if="searchInputResults.length !== 0 && !searchInputLoading"
              class="a-search-result flex flex-col w-full"
            >
              <div
                @click="goToConsultantProfile(searchInputResult.id)"
                v-for="(searchInputResult, index) in searchInputResults"
                :key="searchInputResult.id"
                :class="[
                  searchInputResults.length !== index + 1
                    ? 'border-b border-solid border-[#ededed]'
                    : '',
                ]"
                class="flex flex-row cursor-pointer hover:bg-gray-100 p-4"
              >
                <div
                  class="flex search-result-image w-[80px] h-[80px] rounded-lg"
                >
                  <img
                    class="w-full h-full rounded-lg object-cover"
                    :src="searchInputResult.profileImage ? 'http://api.metalk.online/static/' + searchInputResult.profileImage : '/img.png'"
                    alt="profile avatar"
                  />
                </div>
                <div class="search-reslut-info flex flex-col mr-4 mt-[10px]">
                  <div class="text-lg">
                    {{
                      `${searchInputResult.firstname} ${searchInputResult.lastname}`
                    }}
                  </div>
                  <div class="text-sm mt-1 text-gray-600">
                    {{
                      searchInputResult.fields.length !== 0 &&
                      searchInputResult.fields.reduce((acc, item) => {
                        if (!acc) return item.name;
                        return acc + ", " + item.name;
                      }, "")
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-4">نتیجه ای یافت نشد.</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        sidebar-in-mobile
        xl:hidden
        flex flex-row
        w-full
        my-5
        justify-center
        item-center
        content-center
      "
    >
      <button
        v-on:click="addTransformClass"
        class="
          flex flex-row
          w-1/2
          bg-white
          mr-4
          ml-1
          rounded-[15px]
          justify-center
          item-center
          content-center
          p-3
        "
      >
        <svg
          class="flex"
          width="11"
          height="17"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00024 0H1.00024C0.735028 0 0.480674 0.105357 0.293137 0.292893C0.105601 0.48043 0.000244141 0.734784 0.000244141 1V7C0.000244141 7.26522 0.105601 7.51957 0.293137 7.70711C0.480674 7.89464 0.735028 8 1.00024 8H7.00024C7.26546 8 7.51981 7.89464 7.70735 7.70711C7.89489 7.51957 8.00024 7.26522 8.00024 7V1C8.00024 0.734784 7.89489 0.48043 7.70735 0.292893C7.51981 0.105357 7.26546 0 7.00024 0ZM6.00024 6H2.00024V2H6.00024V6ZM17.0002 0H11.0002C10.735 0 10.4807 0.105357 10.2931 0.292893C10.1056 0.48043 10.0002 0.734784 10.0002 1V7C10.0002 7.26522 10.1056 7.51957 10.2931 7.70711C10.4807 7.89464 10.735 8 11.0002 8H17.0002C17.2655 8 17.5198 7.89464 17.7074 7.70711C17.8949 7.51957 18.0002 7.26522 18.0002 7V1C18.0002 0.734784 17.8949 0.48043 17.7074 0.292893C17.5198 0.105357 17.2655 0 17.0002 0ZM16.0002 6H12.0002V2H16.0002V6ZM7.00024 10H1.00024C0.735028 10 0.480674 10.1054 0.293137 10.2929C0.105601 10.4804 0.000244141 10.7348 0.000244141 11V17C0.000244141 17.2652 0.105601 17.5196 0.293137 17.7071C0.480674 17.8946 0.735028 18 1.00024 18H7.00024C7.26546 18 7.51981 17.8946 7.70735 17.7071C7.89489 17.5196 8.00024 17.2652 8.00024 17V11C8.00024 10.7348 7.89489 10.4804 7.70735 10.2929C7.51981 10.1054 7.26546 10 7.00024 10ZM6.00024 16H2.00024V12H6.00024V16ZM14.0002 10C11.7942 10 10.0002 11.794 10.0002 14C10.0002 16.206 11.7942 18 14.0002 18C16.2062 18 18.0002 16.206 18.0002 14C18.0002 11.794 16.2062 10 14.0002 10ZM14.0002 16C12.8972 16 12.0002 15.103 12.0002 14C12.0002 12.897 12.8972 12 14.0002 12C15.1032 12 16.0002 12.897 16.0002 14C16.0002 15.103 15.1032 16 14.0002 16Z"
            fill="#615DFA"
          />
        </svg>
        <p class="flex text-[12px] text-[#615DFA] mr-4">همه تخصص ها</p>
        <svg
          class="flex mr-4 rotate-[270deg]"
          width="7"
          height="18"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.62353 0.782842C9.82067 0.980224 9.9314 1.24778 9.9314 1.52675C9.9314 1.80572 9.82067 2.07328 9.62353 2.27066L3.34944 8.54475L9.62353 14.8188C9.80948 15.0184 9.91071 15.2823 9.9059 15.5551C9.90109 15.8278 9.79061 16.088 9.59773 16.2809C9.40486 16.4737 9.14466 16.5842 8.87193 16.589C8.59921 16.5938 8.33527 16.4926 8.13572 16.3067L1.11772 9.28866C0.920583 9.09128 0.809853 8.82372 0.809853 8.54475C0.809853 8.26579 0.920583 7.99823 1.11772 7.80084L8.13572 0.782842C8.3331 0.585705 8.60066 0.474976 8.87962 0.474976C9.15859 0.474976 9.42615 0.585705 9.62353 0.782842Z"
            fill="#615DFA"
          />
        </svg>
      </button>
      <button
        v-on:click="addTransformClassTosort"
        class="
          flex flex-row
          w-1/2
          bg-white
          ml-4
          mr-1
          rounded-[15px]
          justify-center
          item-center
          content-center
          p-3
        "
      >
        <svg
          class="flex"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Iconly/Light-Outline/Filter">
            <g id="Group 10">
              <path
                id="Fill 1"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0801 18.5928H3.77905C3.36505 18.5928 3.02905 18.2568 3.02905 17.8428C3.02905 17.4288 3.36505 17.0928 3.77905 17.0928H10.0801C10.4941 17.0928 10.8301 17.4288 10.8301 17.8428C10.8301 18.2568 10.4941 18.5928 10.0801 18.5928Z"
                fill="#615DFA"
              />
              <path
                id="Fill 3"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.1909 8.90039H12.8909C12.4769 8.90039 12.1409 8.56439 12.1409 8.15039C12.1409 7.73639 12.4769 7.40039 12.8909 7.40039H19.1909C19.6049 7.40039 19.9409 7.73639 19.9409 8.15039C19.9409 8.56439 19.6049 8.90039 19.1909 8.90039Z"
                fill="#615DFA"
              />
              <g id="Group 7">
                <mask
                  id="mask0_33437_4432"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="3"
                  y="5"
                  width="7"
                  height="7"
                >
                  <path
                    id="Clip 6"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 5.00037H9.2258V11.192H3V5.00037Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_33437_4432)">
                  <path
                    id="Fill 5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.11276 6.5C5.22376 6.5 4.49976 7.216 4.49976 8.097C4.49976 8.977 5.22376 9.692 6.11276 9.692C7.00276 9.692 7.72576 8.977 7.72576 8.097C7.72576 7.216 7.00276 6.5 6.11276 6.5ZM6.11276 11.192C4.39676 11.192 2.99976 9.804 2.99976 8.097C2.99976 6.39 4.39676 5 6.11276 5C7.82976 5 9.22576 6.39 9.22576 8.097C9.22576 9.804 7.82976 11.192 6.11276 11.192Z"
                    fill="#615DFA"
                  />
                </g>
              </g>
              <path
                id="Fill 8"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.3877 16.208C16.4977 16.208 15.7737 16.924 15.7737 17.804C15.7737 18.685 16.4977 19.4 17.3877 19.4C18.2767 19.4 18.9997 18.685 18.9997 17.804C18.9997 16.924 18.2767 16.208 17.3877 16.208ZM17.3877 20.9C15.6707 20.9 14.2737 19.511 14.2737 17.804C14.2737 16.097 15.6707 14.708 17.3877 14.708C19.1037 14.708 20.4997 16.097 20.4997 17.804C20.4997 19.511 19.1037 20.9 17.3877 20.9Z"
                fill="#615DFA"
              />
            </g>
          </g>
        </svg>
        <p class="flex text-[12px] text-[#615DFA] mr-4">فیلتر بر اساس</p>
        <svg
          class="flex mr-7 rotate-[270deg]"
          width="7"
          height="18"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.62353 0.782842C9.82067 0.980224 9.9314 1.24778 9.9314 1.52675C9.9314 1.80572 9.82067 2.07328 9.62353 2.27066L3.34944 8.54475L9.62353 14.8188C9.80948 15.0184 9.91071 15.2823 9.9059 15.5551C9.90109 15.8278 9.79061 16.088 9.59773 16.2809C9.40486 16.4737 9.14466 16.5842 8.87193 16.589C8.59921 16.5938 8.33527 16.4926 8.13572 16.3067L1.11772 9.28866C0.920583 9.09128 0.809853 8.82372 0.809853 8.54475C0.809853 8.26579 0.920583 7.99823 1.11772 7.80084L8.13572 0.782842C8.3331 0.585705 8.60066 0.474976 8.87962 0.474976C9.15859 0.474976 9.42615 0.585705 9.62353 0.782842Z"
            fill="#615DFA"
          />
        </svg>
      </button>
    </div>
    <div
      class="
        two-col-section
        flex flex-row
        justify-between
        w-full
        xl:my-14
        mb-14
        relative
        overflow-hidden
      "
    >
      <div
        class="
          right-sidebar-home
          xl:w-[300px] xl:relative
          absolute
          rounded-[15px]
          flex flex-col
          overflow-hidden
        "
      >
<!--        <button-->
<!--          v-on:click="addTransformClass"-->
<!--          class="-->
<!--            categories-in-sidebar-->
<!--            px-4-->
<!--            justify-start-->
<!--            items-center-->
<!--            w-full-->
<!--            h-[78px]-->
<!--            content-center-->
<!--            xl:flex-->
<!--            hidden-->
<!--            cursor-pointer-->
<!--            flex-row-->
<!--            bg-white-->
<!--            rounded-[15px]-->
<!--          "-->
<!--        >-->
<!--          <svg-->
<!--            class="flex"-->
<!--            width="18"-->
<!--            height="18"-->
<!--            viewBox="0 0 18 18"-->
<!--            fill="none"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--          >-->
<!--            <path-->
<!--              d="M7.00024 0H1.00024C0.735028 0 0.480674 0.105357 0.293137 0.292893C0.105601 0.48043 0.000244141 0.734784 0.000244141 1V7C0.000244141 7.26522 0.105601 7.51957 0.293137 7.70711C0.480674 7.89464 0.735028 8 1.00024 8H7.00024C7.26546 8 7.51981 7.89464 7.70735 7.70711C7.89489 7.51957 8.00024 7.26522 8.00024 7V1C8.00024 0.734784 7.89489 0.48043 7.70735 0.292893C7.51981 0.105357 7.26546 0 7.00024 0ZM6.00024 6H2.00024V2H6.00024V6ZM17.0002 0H11.0002C10.735 0 10.4807 0.105357 10.2931 0.292893C10.1056 0.48043 10.0002 0.734784 10.0002 1V7C10.0002 7.26522 10.1056 7.51957 10.2931 7.70711C10.4807 7.89464 10.735 8 11.0002 8H17.0002C17.2655 8 17.5198 7.89464 17.7074 7.70711C17.8949 7.51957 18.0002 7.26522 18.0002 7V1C18.0002 0.734784 17.8949 0.48043 17.7074 0.292893C17.5198 0.105357 17.2655 0 17.0002 0ZM16.0002 6H12.0002V2H16.0002V6ZM7.00024 10H1.00024C0.735028 10 0.480674 10.1054 0.293137 10.2929C0.105601 10.4804 0.000244141 10.7348 0.000244141 11V17C0.000244141 17.2652 0.105601 17.5196 0.293137 17.7071C0.480674 17.8946 0.735028 18 1.00024 18H7.00024C7.26546 18 7.51981 17.8946 7.70735 17.7071C7.89489 17.5196 8.00024 17.2652 8.00024 17V11C8.00024 10.7348 7.89489 10.4804 7.70735 10.2929C7.51981 10.1054 7.26546 10 7.00024 10ZM6.00024 16H2.00024V12H6.00024V16ZM14.0002 10C11.7942 10 10.0002 11.794 10.0002 14C10.0002 16.206 11.7942 18 14.0002 18C16.2062 18 18.0002 16.206 18.0002 14C18.0002 11.794 16.2062 10 14.0002 10ZM14.0002 16C12.8972 16 12.0002 15.103 12.0002 14C12.0002 12.897 12.8972 12 14.0002 12C15.1032 12 16.0002 12.897 16.0002 14C16.0002 15.103 15.1032 16 14.0002 16Z"-->
<!--              fill="#615DFA"-->
<!--            />-->
<!--          </svg>-->
<!--          <p class="flex text-[18px] text-[#615DFA] mr-4">همه دسته‌بندی‌ها</p>-->
<!--          <svg-->
<!--            class="flex mr-16"-->
<!--            width="10"-->
<!--            height="17"-->
<!--            viewBox="0 0 10 17"-->
<!--            fill="none"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--          >-->
<!--            <path-->
<!--              fill-rule="evenodd"-->
<!--              clip-rule="evenodd"-->
<!--              d="M9.62353 0.782842C9.82067 0.980224 9.9314 1.24778 9.9314 1.52675C9.9314 1.80572 9.82067 2.07328 9.62353 2.27066L3.34944 8.54475L9.62353 14.8188C9.80948 15.0184 9.91071 15.2823 9.9059 15.5551C9.90109 15.8278 9.79061 16.088 9.59773 16.2809C9.40486 16.4737 9.14466 16.5842 8.87193 16.589C8.59921 16.5938 8.33527 16.4926 8.13572 16.3067L1.11772 9.28866C0.920583 9.09128 0.809853 8.82372 0.809853 8.54475C0.809853 8.26579 0.920583 7.99823 1.11772 7.80084L8.13572 0.782842C8.3331 0.585705 8.60066 0.474976 8.87962 0.474976C9.15859 0.474976 9.42615 0.585705 9.62353 0.782842Z"-->
<!--              fill="#615DFA"-->
<!--            />-->
<!--          </svg>-->
<!--        </button>-->
<!--        <div-->
<!--          :class="{ show: isActive }"-->
<!--          class="-->
<!--            categories-list-->
<!--            absolute-->
<!--            h-auto-->
<!--            top-0-->
<!--            z-[999]-->
<!--            flex flex-col-->
<!--            w-[300px]-->
<!--            bg-white-->
<!--            rounded-[15px]-->
<!--            p-4-->
<!--            pb-2-->
<!--          "-->
<!--        >-->
<!--          <button-->
<!--            v-on:click="removeTransformClass"-->
<!--            class="close-button flex w-full pb-3 pr-2"-->
<!--          >-->
<!--            <svg-->
<!--              class="flex rotate-180"-->
<!--              width="10"-->
<!--              height="17"-->
<!--              viewBox="0 0 10 17"-->
<!--              fill="none"-->
<!--              xmlns="http://www.w3.org/2000/svg"-->
<!--            >-->
<!--              <path-->
<!--                fill-rule="evenodd"-->
<!--                clip-rule="evenodd"-->
<!--                d="M9.62353 0.782842C9.82067 0.980224 9.9314 1.24778 9.9314 1.52675C9.9314 1.80572 9.82067 2.07328 9.62353 2.27066L3.34944 8.54475L9.62353 14.8188C9.80948 15.0184 9.91071 15.2823 9.9059 15.5551C9.90109 15.8278 9.79061 16.088 9.59773 16.2809C9.40486 16.4737 9.14466 16.5842 8.87193 16.589C8.59921 16.5938 8.33527 16.4926 8.13572 16.3067L1.11772 9.28866C0.920583 9.09128 0.809853 8.82372 0.809853 8.54475C0.809853 8.26579 0.920583 7.99823 1.11772 7.80084L8.13572 0.782842C8.3331 0.585705 8.60066 0.474976 8.87962 0.474976C9.15859 0.474976 9.42615 0.585705 9.62353 0.782842Z"-->
<!--                fill="#615DFA"-->
<!--              />-->
<!--            </svg>-->
<!--          </button>-->

<!--          <div-->
<!--            class="-->
<!--              flex-->
<!--              items-center-->
<!--              content-center-->
<!--              w-full-->
<!--              flex-row-->
<!--              px-4-->
<!--              py-2-->
<!--              mb-2-->
<!--            "-->
<!--          >-->
<!--            <input-->
<!--              class="flex ml-3"-->
<!--              type="checkbox"-->
<!--              v-model="allSelected"-->
<!--              @change="selectAll"-->
<!--            />-->
<!--            <p class="flex text-[12px]" align="right">انتخاب همه</p>-->
<!--          </div>-->
<!--          <div-->
<!--            class="-->
<!--              category-container-->
<!--              h-[330px]-->
<!--              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100-->
<!--              overflow-y-scroll-->
<!--            "-->
<!--          >-->
<!--            <div-->
<!--              class="-->
<!--                flex-->
<!--                items-center-->
<!--                border border-solid border-[#e9e9e9]-->
<!--                rounded-md-->
<!--                relative-->
<!--                content-center-->
<!--                xl:w-[250px]-->
<!--                w-11/12-->
<!--                flex-row-->
<!--                mb-2-->
<!--              "-->
<!--              v-for="field of fields"-->
<!--              :key="field.id"-->
<!--            >-->
<!--              <input-->
<!--                  :id="field.id"-->
<!--                  class="flex absolute top-[14px] right-[15px]"-->
<!--                  type="checkbox"-->
<!--                  :checked="isSelected(field.id)"-->
<!--                  @change="updateSelected(field.id)"-->
<!--              />-->
<!--              <label-->
<!--                v-bind:for="field.id"-->
<!--                class="flex text-[14px] cursor-pointer pr-10 py-2.5 w-full"-->
<!--                >{{ field.name }}</label-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--          <button-->
<!--            @click="getConsultantsByField"-->
<!--            class="-->
<!--              mx-auto-->
<!--              bg-[#00D9F5]-->
<!--              text-white-->
<!--              px-24-->
<!--              mt-6-->
<!--              mb-2-->
<!--              text-[14px]-->
<!--              py-3-->
<!--              rounded-[15px]-->
<!--            "-->
<!--          >-->
<!--            اعمال فیلتر-->
<!--          </button>-->
<!--        </div>-->
        <div
          :class="{ show: isActiveTwo }"
          class="sort-by-filter flex flex-col bg-white rounded-[15px] p-2 mt-4"
        >
          <button
            v-on:click="removeTransformClassTosort"
            class="close-button flex xl:hidden w-full pt-3 pb-3 pr-2"
          >
            <svg
              class="flex rotate-180"
              width="10"
              height="17"
              viewBox="0 0 10 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.62353 0.782842C9.82067 0.980224 9.9314 1.24778 9.9314 1.52675C9.9314 1.80572 9.82067 2.07328 9.62353 2.27066L3.34944 8.54475L9.62353 14.8188C9.80948 15.0184 9.91071 15.2823 9.9059 15.5551C9.90109 15.8278 9.79061 16.088 9.59773 16.2809C9.40486 16.4737 9.14466 16.5842 8.87193 16.589C8.59921 16.5938 8.33527 16.4926 8.13572 16.3067L1.11772 9.28866C0.920583 9.09128 0.809853 8.82372 0.809853 8.54475C0.809853 8.26579 0.920583 7.99823 1.11772 7.80084L8.13572 0.782842C8.3331 0.585705 8.60066 0.474976 8.87962 0.474976C9.15859 0.474976 9.42615 0.585705 9.62353 0.782842Z"
                fill="#615DFA"
              />
            </svg>
          </button>
          <a class="flex text-[16px] p-3">فیلتر بر اساس</a>
          <div class="a-filter mb-3">
            <label class="select relative" for="slct">
              <p
                class="
                  absolute
                  -top-[14px]
                  right-[12px]
                  text-[13px] text-[#ADAFCA]
                "
              >
                تخصص
              </p>
              <select v-model="selectedField" id="slct" required="required">
                <option value="" disabled="disabled">یک تخصص انتخاب کنید</option>
                <option v-for="field in fields" :key="field.id" :value="field.id">{{ field.name }}</option>
              </select>
<!--              <select id="slct" required="required">-->
<!--                <option value="" disabled="disabled" selected="selected">-->
<!--                  یک تخصص را انتخاب کنید-->
<!--                </option>-->
<!--                <option-->
<!--                  v-for="consultantsFieldname in consultants.fields"-->
<!--                  v-bind:key="consultantsFieldname.id"-->
<!--                  value="#"-->
<!--                >-->
<!--                  {{ consultantsFieldname.name }}-->
<!--                </option>-->
<!--              </select>-->
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
          <button
              @click="applyFilter()"
              class="
              mx-auto
              bg-[#00D9F5]
              text-white
              px-24
              mt-6
              mb-2
              text-[18px]
              py-3
              rounded-[15px]
            "
          >
            اعمال فیلتر
          </button>
        </div>
      </div>
      <div class="flex flex-col xl:w-[960px] w-full">
        <ProfileCard
          :consultants="consultants"
          :loading="loadingConsultants"
          :resPerPage="resultPerPage"
        />
        <div
          v-if="consultants.length !== 0"
          class="
            flex
            xl:mr-[320px]
            mr-0
            relative
            xl:w-[960px]
            z-10
            items-center
            justify-center
            w-full
            py-8
          "
        >
          <pagination
            :loading="loadingConsultants"
            @change="pageChanged"
            :max="10"
            v-model="currentPage"
            :length="totalPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "./Profile-Card";
import Pagination from "../components/PaginationComponent";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    ProfileCard,
    Pagination,

  },
  data: function () {
    return {
      searchInputLoading: false,
      SearchResultWindow: false,
      isActive: false,
      searchInput: "",
      searchInputResults: [],
      isActiveTwo: false,
      consultants: [],
      currentPage: 1,
      resultPerPage: 6,
      totalPage: 0,
      consultantsFieldnames: [],
      loadingConsultants: false,
      selectedField: '',
      fields: [],
      selected: [],
      allSelected: false,
      searchBoxTimeout: "",

    };
  },
  methods: {
    isSelected(id) {
      return this.selected.includes(id);
    },
    updateSelected(id) {
      this.selected = [id];
    },
    showResultWindow() {
      this.SearchResultWindow = true;
    },
    hideResultWindow() {
      this.SearchResultWindow = false;
    },

    searchConsultants() {
      clearTimeout(this.searchBoxTimeout);
      this.searchBoxTimeout = setTimeout(() => {
        this.sendSearchRequestAndSetResult();
      }, 700);
    },

    goToConsultantProfile(id) {
      this.$router.push({ name: "consultant", params: { id } });
    },

    getConsultantsByField() {
      if (this.loadingConsultants || this.selected.length === 0) return;

      const selectedField = this.fields.find((field) => field.id === this.selected[0]);
      if (selectedField) {
        this.currentPage = 1;
        this.getConsultantsProfile({ field: selectedField.id });
      }
    },

    parseSearchInput(input) {
      if (/^(09)\d{9}$/.test(input)) {
        return "phone";
      } else if (
        /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(input)
      ) {
        return "email";
      } else if (
        /^[\s\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC]+$/.test(
          input
        )
      ) {
        return "name";
      }

      return null;
    },

    async sendSearchRequestAndSetResult() {
      // #TODO try catch
      this.showResultWindow();
      const type = this.parseSearchInput(this.searchInput);
      if (!type) return;
      let payload = {};
      if (type === "name") {
        payload = {};
        const arr = this.searchInput.split(" ");
        if (arr.length === 1) {
          payload.firstname = this.searchInput;
        } else {
          payload.firstname = arr.shift();
          payload.lastname = arr.join(" ");
        }
      } else if (type === "email") {
        payload = {};
        payload.email = this.searchInput.trim();
      } else if (type === "phone") {
        payload = {};
        payload.phone = this.searchInput.trim();
      }

      this.searchInputLoading = true;
      const { data } = await this.$store.dispatch(
        "getConsultants",
        Object.assign(
          {
            // page: 1,
            // size: 20,
          },
          payload
        )
      );
      this.searchInputResults = data.consultants;
      this.searchInputLoading = false;
    },

    addTransformClass: function () {
      this.isActive = true;
    },
    removeTransformClass: function () {
      this.isActive = false;
    },
    addTransformClassTosort: function () {
      this.isActiveTwo = true;
    },
    removeTransformClassTosort: function () {
      this.isActiveTwo = false;
    },
    async selectAll() {
      if (this.allSelected) {
        const selected = this.fields.map((u) => u.id);
        this.selected = selected;
      } else {
        this.selected = [];
      }
    },
    pageChanged() {
      this.getConsultantsProfile();
    },
    handleSCroll() {
      let sidebar = document.querySelector(".right-sidebar-home");
      if(!sidebar) return;
      let mainContent = document.querySelector(".main-content-home");
      if (window.scrollY > 320 && !sidebar.className.includes("fixed")) {
        sidebar.classList.add("fixed");
        mainContent.classList.add("xl:mr-[320px]");
      } else if (window.scrollY < 320) {
        sidebar.classList.remove("fixed");
        mainContent.classList.remove("xl:mr-[320px]");
      }
    },
    getAllFields: async function () {
      try {
        const { data } = await this.$store.dispatch("getFields");
        this.fields = data.fields;
      } catch (err) {
        const { error } = err.response.data;
        this.$toast.open({
          message: error.detail,
          type: "error",
          position: "bottom-left",
          duration: 5000,
          dismissible: true,
        });
      }
    },
    getConsultantsProfile: async function (payload = {}) {
      try {
        this.loadingConsultants = true;
        payload = Object.assign(
          {
            size: this.resultPerPage,
            page: this.currentPage,
            field: this.selected,
          },
          // payload
        );
        const { data, headers } = await this.$store.dispatch(
          "getConsultants",
          payload
        );
        // if (this.selected) {
        //   this.consultants = data.consultants.filter(
        //       consultant => {return  consultant.fields.some(field => field.name === this.selected);}
        //   );
        // } else {
        //   this.consultants = data.consultants;
        // }
        this.$store.commit('SET_CONSULTANTS', data.consultants)
        this.totalPage = Math.ceil(
          headers["x-total-count"] / this.resultPerPage
        );
        this.consultants = data.consultants;
        this.loadingConsultants = false;
      } catch (err) {
        const { error } = err.response.data;
        this.$toast.open({
          message: error.detail,
          type: "error",
          position: "bottom-left",
          duration: 5000,
          dismissible: true,
        });
        this.loadingConsultants = false;
      }
    },

    async applyFilter() {
      // Check if a field is selected
      if (this.selectedField) {
        try {
          const payload = {
            field: this.selectedField,
          };
          const { data, headers } = await this.$store.dispatch(
              "getConsultants",
              payload
          );

          this.$store.commit('SET_CONSULTANTS', data.consultants)
          this.totalPage = Math.ceil(
              headers["x-total-count"] / this.resultPerPage
          );
          this.consultants = data.consultants;
          // Show a message indicating the selected field
          this.$swal.fire("", `Consultants filtered by field ID: ${this.selectedField}`, "info");
        } catch (error) {
          console.error(error);
          // Handle the error as needed
        }
      } else {
        // No field selected, you can show a message or handle it based on your requirements
        console.warn('Please select a field before applying the filter.');
      }
    },

  },
  created() {
    window.addEventListener("scroll", this.handleSCroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleSCroll);
  },
  mounted() {
    this.getConsultantsProfile();
    this.getAllFields();
  },
};
</script>
<style scoped>
.search-section-input input {
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.06));
}
</style>