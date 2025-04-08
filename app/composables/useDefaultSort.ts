import { ref } from 'vue'

export const defaultSortBy = ref<string>('updated_at')
export const defaultSortDirection = ref<'asc' | 'desc'>('desc')

export const useDefaultSort = () => {
  return {
    defaultSortBy,
    defaultSortDirection,
  }
} 