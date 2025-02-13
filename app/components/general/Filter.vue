<template>
  <div class="flex flex-col items-start">
    <div
      class="hidden md:flex flex-wrap gap-x-4 gap-y-2"
    >
      <component
        :is="components[item.type as keyof typeof components]"
        v-for="(item) in controls"
        :key="item.key"
        :name="item.key"
        :label="item.label"
        :extra="item.extra"
      />
    </div>

    <FilterSelected />

    <FilterMobile
      :is-opened="isMobileMenuOpened"
      @toggle-menu="onToggleMobileMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import { useControls } from '~/composables/controls'
import FilterMobile from '~/components/general/FilterMobile.vue'
import FilterSelected from '~/components/general/FilterSelected.vue'
import Select from '~/components/controls/Select.vue'
import Range from '~/components/controls/Range.vue'
import Boolean from '~/components/controls/Boolean.vue'
import type Hidden from '~/components/controls/Hidden.vue'
import Hr from '~/components/controls/Hr.vue'

const isMobileMenuOpened = ref(false)

const { width } = useWindowSize()

const components = {
  boolean: Boolean,
  select: Select,
  range: Range,
  hr: Hr,
}

const { controls } = await useControls()

const onToggleMobileMenu = (event: MouseEvent) => {
  if (width.value >= 768) {
    return
  }

  event.preventDefault()

  isMobileMenuOpened.value = !isMobileMenuOpened.value
}

watch(width, () => {
  if (width.value >= 768) {
    isMobileMenuOpened.value = false
  }
})
</script>
