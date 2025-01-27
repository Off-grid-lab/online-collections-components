<template>
  <VDropdown
    :distance="6"
    :disabled="isDisabled"
    placement="bottom-start"
    :aria-id="name"
    @show="isOpen = true"
    @hide="isOpen = false"
  >
    <div
      class="flex transition-all gap-3 py-2 md:py-3 px-3 md:px-4 bg-white serif border-2 cursor-pointer"
      :class="{ 'border-dark': isOpen, 'border-white': !isOpen, 'cursor-not-allowed opacity-40': isDisabled }"
    >
      <div class="grow font-serif">
        {{ label }}
      </div>
      <div
        :class="{ 'rotate-180 text-primary': isOpen }"
        class="transition-all duration-300 ease-out flex"
      >
        <Icon
          name="arrow"
          class="w-3"
        />
      </div>
    </div>
    <template #popper>
      <div
        class="bg-white border-2 border-dark flex flex-col gap-3 p-6 serif overflow-y-scroll max-h-[430px] min-w-[340px]"
      >
        <Slider
          v-model="sliderModel"
          v-bind="{ ...sliderOptions }"
        />
        <div
          v-if="model"
          class="flex"
        >
          <input
            v-model="sliderModel[0]"
            type="text"
            inputmode="numeric"
            pattern="-?\d*"
          >
          <input
            v-model="sliderModel[1]"
            class="text-right"
            type="text"
            inputmode="numeric"
            pattern="-?\d*"
          >
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import Slider from '@vueform/slider'

import '@vueform/slider/themes/default.css'
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  name: string
  label: string
  default?: string[]
  extra: {
    rangeKeys: { min: string, max: string }
  }
}>()

const { model, options } = await useControls()
const keyMin = props.extra.rangeKeys.min
const keyMax = props.extra.rangeKeys.max

// const isDirty = ref(!!routeDefaultMin || !!routeDefaultMax)
const isDisabled = computed(() => !options.value?.[keyMin] && !options.value?.[keyMax])

const sliderModel = computed({
  get: () => [
    model[props.name].min ?? options.value?.[keyMin],
    model[props.name].max ?? options.value?.[keyMax],
  ],
  set: (value) => {
    model[props.name] = {
      min: value[0]!,
      max: value[1]!,
    }
  },
})

const sliderOptions = computed(() => ({
  lazy: true,
  min: options.value?.[keyMin],
  max: options.value?.[keyMax],
  tooltips: false,
}))

const isOpen = ref(false)

// watch(options, () => {
//   if (!isDirty.value) {
//     model.value = {
//       min: options.value?.[keyMin],
//       max: options.value?.[keyMax],
//     }
//   }
// })

// watch(
//   [model, isDirty],
//   () => {
//     if (isDirty.value) {
//       routeParams[keyMin] = String(model.value.min)
//       routeParams[keyMax] = String(model.value.max)
//
//       filters[filterKeyMin] = model.value.min
//       filters[filterKeyMax] = model.value.max
//     }
//     else {
//       delete routeParams[keyMin]
//       delete routeParams[keyMax]
//       delete filters[filterKeyMin]
//       delete filters[filterKeyMax]
//     }
//   },
//   {
//     deep: true,
//   },
// )
</script>
