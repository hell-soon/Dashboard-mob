<script setup lang="ts">
import type { ThemeKey } from 'src/features/theming/types'
import { useTheme } from 'src/features/theming/composables/useTheme'

const {
  activeThemeKey,
  isDarkMode,
  setActiveTheme,
  toggleDarkMode,
  availableThemes,
} = useTheme()

const selectedThemeKey = ref<ThemeKey>(activeThemeKey.value)

const isDark = computed<boolean>(() => isDarkMode.value)

const themeOptions = computed(() => availableThemes.value)

watch(selectedThemeKey, (newKey) => {
  if (newKey !== activeThemeKey.value) {
    setActiveTheme(newKey)
  }
})

watch(activeThemeKey, (newGlobalKey) => {
  if (selectedThemeKey.value !== newGlobalKey) {
    selectedThemeKey.value = newGlobalKey
  }
})

function onToggleDarkMode() {
  toggleDarkMode()
}
</script>

<template>
  <div class="q-pa-sm row items-center q-gutter-md theme-switcher-controls">
    <q-select
      v-model="selectedThemeKey"
      :options="themeOptions"
      label="Theme"
      dense
      options-dense
      emit-value
      map-options
      style="min-width: 150px"
      class="col-auto"
      bg-color="white"
      standout
      aria-label="Select Theme"
    />
    <q-toggle
      :model-value="isDark"
      checked-icon="dark_mode"
      unchecked-icon="light_mode"
      size="lg"
      :color="isDark ? 'blue-grey-5' : 'amber'"
      label="Dark Mode"
      left-label
      aria-label="Toggle Dark Mode"
      @update:model-value="onToggleDarkMode"
    />
  </div>
</template>

<style lang="scss" scoped>
.theme-switcher-controls {
  // Можно добавить стили, чтобы селект и тоггл всегда были читаемы
  // Например, если фон хедера может стать очень темным или очень светлым
  :deep(.q-field__native),
  :deep(.q-field__label),
  :deep(.q-select__dropdown-icon) {
    color: var(--q-header-text, $dark) !important; // Используем переменную или фоллбэк
  }
  :deep(.q-field--standout .q-field__control) {
     background: rgba(255,255,255,0.1) !important; // Пример для standout на темном фоне
  }
}
</style>
