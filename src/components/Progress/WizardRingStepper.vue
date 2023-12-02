<template>
  <div class="stepperWrapper" :style="`width: ${radius * 2}px; height: ${radius * 2}px;`">
    <PrgogressRing
    :radius="radius"
    :progress="progress"
    :stroke="stroke"
    svgClass="animateRing"
    :color="animatedRingColor"
    />
    <PrgogressRing
      :radius="radius"
      :progress="100"
      :stroke="stroke"
      svgClass="staticRing"
      :color="staticRingColor"
    />
    <!-- <span class="stepper-text">{{ text }}</span> -->
    <slot></slot>
  </div>
</template>
<script>

import PrgogressRing from './PrgogressRing.vue'

export default {
  props: {
    radius: Number,
    progress: Number,
    stroke: Number,
    animatedRingColor: String,
    staticRingColor: String,
    text: {
      type: String,
      default: '',
    },
  },
  components: {
    PrgogressRing,
  },
  data() {
    return {
    }
  },
}
</script>
<style scoped>
.animateRing {
  position: relative;
  z-index: 2;
}
.staticRing {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}

.stepperWrapper {
  position: relative;
  display: inline-block;
}
</style>
