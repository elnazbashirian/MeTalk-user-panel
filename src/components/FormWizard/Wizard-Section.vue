<template>
    <div dir="rtl" class="form-wizard  rounded-2xl  w-full  h-full  relative pt-24">
        <div class="header   bg-[#FAF9F8]  absolute  top-0  inset-x-0  h-24">
          <div class="header-wrapper  h-full  flex  flex-col  justify-center">
            <div :class="[steps.length === 1 ? '' :   'd-none  d-lg-block']" class="line-stepper">
              <div :class="[steps.length === 1 ? 'px-4  lg:px-8' :   'flex  text-center  justify-around  text-sm']" class="header-texts">
                <div class="text-grey-900  text-lg  font-bold" v-if="steps.length === 1">
                  {{ steps[0].text }}
                </div>
                <div
                  v-else
                  v-for="step, index in steps"
                  :key="step.title"
                  @click="goToPage(index + 1)"
                  :class="activeStep === index + 1 ? 'text-grey-900  font-bold' : 'text-grey-700'"
                  :style="`width: ${ 100 / steps.length }%`">
                  {{ step.text }}
                </div>
              </div>
              <div v-if="steps.length !== 1" class="header-icons">
                <div
                  :style="`width: ${ steps.length === 1 ? 20 : 100 / steps.length }%`"
                  class="header-icon"
                  v-for="(step, index) in steps" :key="step.title"
                  :class="getClassNames(index + 1)">
                  <div></div>
                </div>
              </div>
            </div>
            <div v-if="steps.length !== 1" class="ring-steps  d-lg-none">
              <div class="wizard-ring">
                <WizardRingStepper
                  :radius="40"
                  :stroke="5"
                  :progress="getRingProgress"
                  animatedRingColor="#007bff"
                  staticRingColor="#ced4da"
                >
                  <span class="stepper-text">
                    {{ activeStep }}<span>
                      <span class="steps-seperator">/</span>{{ steps.length }}</span>
                  </span>
                </WizardRingStepper>
              </div>
              <div class="ring-steps__texts">
                <div v-if="activeStep === steps.length" class="ring-prev-step">
                  <span>قبلی: </span>
                  <span>{{ steps[activeStep - 1].text }}</span>
                </div>
                <div class="ring-steps__current-step">
                  <span>فعلی: </span>
                  <span>{{ steps[activeStep - 1].text }}</span>
                </div>
                <div v-if="steps[activeStep]" class="ring-steps__next-step">
                  <span>بعدی: </span>
                  <span>{{ steps[activeStep].text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <slot v-bind="slotProps">
        </slot>
        <!-- <div class="fixed  inset-0  lg"></div> -->
    </div>
</template>
<script>
import WizardRingStepper from '@/components/Progress/WizardRingStepper.vue'

export default {
  props: ['steps', 'activeStep'],
  components: {
    WizardRingStepper,
  },
  data() {
    return {
      isAddMemberModalOpen: false,
      similarStartup: {
        name: '',
        address: '',
      },
      similarStartups: [],
      progress: 0,
      lazy: false,
    }
  },
  computed: {
    slotProps() {
      return {
        lazy: this.lazy,
        openAddMemberModal: () => { this.isAddMemberModalOpen = true },
      }
    },
    getRingProgress() {
      return this.activeStep * (100 / this.steps.length)
    },
  },
  methods: {
    goToPage(page) {
      this.$emit('changePage', page);
    },
    getClassNames(step) {
      const classes = []
      const currentStep = this.steps[step - 1]
      if (step < this.activeStep) {
        classes.push('passed')
      } else if (step === this.activeStep) {
        classes.push('active')
      } else if (currentStep.done) {
        classes.push('done')
      }

      if (step === this.activeStep && currentStep.error) {
        classes.push('error')
      }
      return classes.join(' ')
    },
  },
}
</script>
<style scoped>

.header-icons {
  display: flex;
  margin-top: 15px;
}
.header-icon {
  display: flex;
  justify-content: center;
  position: relative;
}
.header-icon div {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: #ced4da;
}

.ring-steps,
.wizard-ring {
  display: flex;
  align-items: center;
}

.ring-steps__texts {
  margin-right: 10px;
  text-align: right;
}

.ring-steps__current-step {
  font-size: 20px;
}

.ring-prev-step {
  color: #ced4da;
  margin-bottom: 8px;
}

.ring-steps__next-step {
  color: #ced4da;
  margin-top: 8px;
}

.header-icon::after {
  content: " ";
  position: absolute;
  display: block;
  width: 0px;
  /* position: relative; */
  /* left: 5%; */
  background-color: #00cc6d;
  border-radius: 10px;
  height: 3px;
  top: 50%;
  transform: translateY(-50%) translateX(calc(-50% - 16px));
  transition: width 0.3s ease-in-out;
}

/* .header-icon.done::after {
  width: calc(100% - 32px);
} */
.header-icon.passed::after {
  width: calc(100% - 32px);
}
.header-icon.error::after {
  width: calc(50% - 16px);
  background-color: red;
}
.header-icon.passed div,
.header-icon.done div {
  background-color: #00cc6d;
}
.header-icon.active div {
  background-color: #007bff;
}
.header-icon.error div {
  background-color: red;
}

.header-icon::before {
  content: " ";
  position: absolute;
  display: block;
  width: calc(100% - 32px);
  /* position: relative; */
  /* left: 5%; */
  background-color: #ced4da;
  border-radius: 10px;
  height: 3px;
  top: 50%;
  transform: translateY(-50%) translateX(calc(-50% - 16px));
}

.header-icon:last-child::after,
.header-icon:last-child::before {
  display: none;
}

.steps-seperator {
  margin-right: 4px;
  margin-left: 4px;
  display: inline-block;
}

.stepper-text {
  direction: ltr;
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

.d-none {
  display: none;
}

@media only screen and (min-width: 996px) {
  .d-lg-none {
    display: none;
  }
  .d-lg-block {
    display: block;
  }
}

#slider,
.wizard-tab-content {
  transform: translateX(-20%);
  -webkit-transform: translateX(-20%);
}

.slide-in {
    animation: slide-in 0.5s forwards;
    -webkit-animation: slide-in 0.5s forwards;
}

.slide-out {
    animation: slide-out 0.5s forwards;
    -webkit-animation: slide-out 0.5s forwards;
}

@keyframes slide-in {
    100% { transform: translateX(0%); }
}

@-webkit-keyframes slide-in {
    100% { -webkit-transform: translateX(0%); }
}

@keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-20%); }
}

@-webkit-keyframes slide-out {
  0% { -webkit-transform: translateX(0%); }
  100% { -webkit-transform: translateX(-20%); }
}

.upload-file-box {
  background-image: linear-gradient(90deg, #007bff 50%, transparent 50%), linear-gradient(90deg, #007bff 50%, transparent 50%), linear-gradient(0deg, #007bff 50%, transparent 50%), linear-gradient(0deg, #007bff 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: left top, right bottom, left bottom, right   top;
}

.upload-file-box:hover {
  animation: border-dance 0.5s infinite linear;

}

@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right   top;
  }
  100% {
    background-position: left 15px top, right 15px bottom , left bottom 15px , right   top 15px;
  }
}

</style>
