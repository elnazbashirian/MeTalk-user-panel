<template>
  <div v-if="length > 1" class="flex  bg-gray-800  shadow-md  rounded-md">
    <button class="text-white  text-sm  px-3  h-10  flex  items-center  justify-center" :disabled="value === 1" :class="[{'opacity-40': value === 1}, {'cursor-not-allowed': value === 1}]" @click="goPrev">
      قبلی
    </button>
    <button :class="[item === value ? 'bg-[#615DFA]   shadow' : '']" class="text-white  w-10  h-10  flex  items-center  justify-center" v-for="(item, index) in pages" @click="goto(item)" :key="index">
      {{ (typeof item === 'string') ? '...' : item }}
    </button>
    <button class="text-white  text-sm  px-3  h-10  flex  items-center  justify-center" :disabled="value === length" :class="[{'opacity-40': value === length}, {'cursor-not-allowed': value === length}]" @click="goNext">بعدی</button>
  </div>
</template>
<script>
export default {
  props: {
    length: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    },
    dottedNumber: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      pages: [],
      value: 1
    }
  },
  watch: {
    page () {
      this.value = this.page
    },
    value () {
      this.getPages()
      this.$emit('input', this.value)
      this.$emit('change', this.value)
    },
    length () {
      this.getPages()
    },
    max () {
      this.getPages()
    }
  },
  methods: {
    goto (page) {
      if (this.loading) return
      if (page === '...>' || page === '<...') {
        let newVal = (this.value === this.length ? false : page === '...>') ? this.value += this.dottedNumber : this.value -= this.dottedNumber
        if (newVal > this.length) {
          newVal = this.length
        } else if (newVal < 1) {
          newVal = 1
        }
        this.value = newVal
      } else {
        this.value = page
      }
    },
    getPages () {
      const length = Number(this.length)
      const max = window.mobileAndTabletCheck ? 5 : this.max
      const even = max % 2 === 0 ? 1 : 0
      const prevRange = Math.floor(max / 2)
      const nextRange = length - prevRange + 1 + even

      if (this.value >= prevRange && this.value <= nextRange) {
        const start = this.value - prevRange + 2 + even
        const end = this.value + prevRange - 2 - even

        this.pages = [1, '<...', ...this.getButtons(start, end), '...>', this.length]
      } else if (this.length > 6) {
        this.pages = [
          ...this.getButtons(1, prevRange),
          '...>',
          ...this.getButtons(nextRange, length)
        ]
      } else if (this.length <= 6) {
        this.pages = [
          ...this.getButtons(1, this.length === 0 ? 1 : this.length)
        ]
      }

      return []
    },
    getButtons (start = 1, end = 6) {
      const buttons = []
      for (start > 0 ? start : 1; start <= end; start++) {
        buttons.push(start)
      }
      return buttons
    },
    goNext () {
      if (this.loading) return
      if (this.value < this.length) {
        this.value = this.value += 1
      }
    },
    goPrev () {
      if (this.loading) return
      if (this.value > 1) {
        this.value -= 1
      }
    }
  },
  mounted () {
    this.value = this.page
    this.getPages()
  }
}
</script>
