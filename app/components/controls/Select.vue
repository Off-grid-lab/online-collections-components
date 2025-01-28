<template>
  <VDropdown
    class="shrink-0"
    :disabled="isDisabled"
    :distance="6"
    placement="bottom-start"
    :aria-id="name"
    @show="isOpen = true"
    @hide="isOpen = false"
  >
    <div
      class="flex transition-all gap-3 py-2 md:py-3 px-3 md:px-4 bg-white serif border-2 cursor-pointer"
      :class="{
        'border-dark': isOpen,
        'border-white': !isOpen,
        'cursor-not-allowed opacity-40': isDisabled,
      }"
    >
      <div class="grow font-serif">
        <span
          v-if="internalModel.length"
          class="font-bold"
        >({{ internalModel.length }})</span> {{ label }}
        <span
          v-if="model.length"
          class="font-sans font-bold"
        >({{ model.length }})</span>
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
        class="bg-white border-2 border-dark flex flex-col gap-3 p-6 serif overflow-y-scroll max-h-[430px] max-w-[340px]"
      >
        <Search v-model="searchString" />

        <div
          v-for="option in sortedOptions"
          :key="option.value"
          class="flex items-center gap-2 cursor-pointer"
          @click="onToggle(option.value)"
        >
          <div
            class="text-primary w-6 h-6 border flex items-center transition-all"
            :class="{ 'bg-primary-light border-primary': internalModel.includes(option.value) }"
          >
            <Icon
              v-if="internalModel.includes(option.value)"
              class="text-primary w-8 h-8"
              name="check"
            />
          </div>
          <div>
            {{ option.label }} <span class="font-sans font-bold">({{ option.count }})</span>
          </div>
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import Search from '~/components/controls/parts/Search.vue'
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  name: string
  label: string
  default?: string[]
}>()

const { model, options } = await useControls()

const internalModel = computed<string[]>({
  get: () => model[props.name] ?? [],
  set: value => (model[props.name] = value),
})

const onToggle = (value: string) => {
  if (internalModel.value.includes(value)) {
    internalModel.value = internalModel.value.filter(v => v !== value)
  }
  else {
    internalModel.value = [...internalModel.value, value]
  }
}

const isOpen = ref(false)
const searchString = ref('')

const isDisabled = computed(() => !sortedOptions.value.length)

const sortedOptions = computed(() => {
  const o = options.value?.[props.name]?.map((l: any) => ({
    label: l.value,
    value: l.value,
    count: l.count,
  }))

  if (!o) {
    return []
  }

  if (!searchString.value) {
    return o
  }

  function removeAccents(string: string): string {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  return o.filter((l: any) => removeAccents(l.label).includes(removeAccents(searchString.value)))
})
</script>
