<template>
  <div class="border-b-2 border-black">
    <Dropdown
      v-model="model"
      :options="sortOptions"
      @update:model-value="onUpdate"
    >
      <template #label="{ label }">
        {{ t('item.sortBy') }} {{ label }}
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from '~/components/general/Dropdown.vue'
import { useControls } from '~/composables/controls'
import { defaultSortBy, defaultSortDirection } from '~/composables/useDefaultSort'

const props = defineProps<{
  defaultSortBy?: (typeof sortOptions)[number]['value']
}>()

const { sortBy, sortDirection } = await useControls()
const { t } = useI18n()

const sortOptions = [
  { label: t('item.sortOptions.updatedAt'), value: 'updated_at', direction: 'desc' },
  { label: t('item.sortOptions.createdAt'), value: 'created_at', direction: 'asc' },
  { label: t('item.sortOptions.title'), value: 'title', direction: 'asc' },
  { label: t('item.sortOptions.dateEarliest'), value: 'date_earliest', direction: 'asc' },
  { label: t('item.sortOptions.viewCount'), value: 'view_count', direction: 'desc' },
  { label: t('item.sortOptions.random'), value: 'random', direction: 'asc' },
] as const

if (props.defaultSortBy) {
  const option = sortOptions.find(opt => opt.value === props.defaultSortBy)
  if (option) {
    defaultSortBy.value = option.value
    defaultSortDirection.value = option.direction
  }
}

const model = ref<string>(
  sortOptions.find(option => option.value === sortBy.value)?.value ?? defaultSortBy.value,
)

const onUpdate = (value: string) => {
  const option = sortOptions.find(option => option.value === value)

  if (option) {
    sortBy.value = option.value
    sortDirection.value = option.direction
  }
}
</script>
