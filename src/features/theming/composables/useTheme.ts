import type { DeepReadonly, Ref } from 'vue'
import type { ThemeColorVariables, ThemeKey } from '../types'
import { Dark, LocalStorage } from 'quasar' // Используем Quasar LocalStorage для удобства
import { computed, ref, watch } from 'vue'
import {
  DEFAULT_THEME_KEY,
  LOCAL_STORAGE_DARK_MODE_KEY,
  LOCAL_STORAGE_THEME_KEY,
  themeDefinitions,
} from '../config'

// --- Глобальное реактивное состояние темы (создается один раз при импорте модуля) ---
const _activeThemeKey: Ref<ThemeKey> = ref(
  LocalStorage.getItem<ThemeKey>(LOCAL_STORAGE_THEME_KEY) || DEFAULT_THEME_KEY,
)

const _isDarkMode: Ref<boolean> = ref(
  LocalStorage.getItem<boolean>(LOCAL_STORAGE_DARK_MODE_KEY) || Dark.mode === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches : Dark.mode === true,
)

// --- Приватная функция для применения CSS переменных ---
function _applyCssVariables(themeKey: ThemeKey, isDark: boolean): void {
  const theme = themeDefinitions[themeKey]
  if (!theme) {
    console.warn(`[ThemeService] Theme "${themeKey}" not found. Applying default.`)
    if (themeKey !== DEFAULT_THEME_KEY) { // Избегаем рекурсии
      _applyCssVariables(DEFAULT_THEME_KEY, isDark)
    }
    return
  }

  const colorsToApply: ThemeColorVariables = isDark ? theme.colors.dark : theme.colors.light
  const root = document.documentElement

  const allPossibleVarsInTheme = new Set<string>([
    ...Object.keys(theme.colors.light),
    ...Object.keys(theme.colors.dark),
  ])

  // Очистка (простой вариант - удаляем только те, что есть в allPossibleVarsInTheme, но не в colorsToApply)
  for (const cssVar of Array.from(allPossibleVarsInTheme)) {
    if (!(cssVar in colorsToApply) || colorsToApply[cssVar as keyof ThemeColorVariables] === undefined) {
      root.style.removeProperty(cssVar)
    }
  }

  for (const [key, value] of Object.entries(colorsToApply)) {
    if (value !== undefined && value !== null) {
      root.style.setProperty(key, value)
    }
    else {
      // Если значение не определено, удаляем свойство, чтобы не наследовалось от предыдущей темы
      root.style.removeProperty(key)
    }
  }
}

// --- Инициализация и синхронизация при загрузке модуля ---
// Этот код выполнится один раз, когда модуль useTheme.ts будет впервые импортирован.
if (Dark.isActive !== _isDarkMode.value) {
  Dark.set(_isDarkMode.value)
}
_applyCssVariables(_activeThemeKey.value, _isDarkMode.value)

// --- Composable ---
export function useTheme() {
  const availableThemes = computed(() => {
    return Object.keys(themeDefinitions).map(key => ({
      value: key as ThemeKey,
      label: themeDefinitions[key]!.name,
    }))
  })

  const setActiveTheme = (themeKey: ThemeKey): void => {
    if (themeDefinitions[themeKey]) {
      _activeThemeKey.value = themeKey
      LocalStorage.set(LOCAL_STORAGE_THEME_KEY, themeKey)
      _applyCssVariables(themeKey, _isDarkMode.value)
    }
    else {
      console.warn(`[ThemeService] Attempted to set unknown theme: ${themeKey}`)
    }
  }

  const setDarkMode = (isDark: boolean): void => {
    _isDarkMode.value = isDark
    LocalStorage.set(LOCAL_STORAGE_DARK_MODE_KEY, isDark)
    Dark.set(isDark) // Синхронизируем с Quasar
    _applyCssVariables(_activeThemeKey.value, isDark)
  }

  const toggleDarkMode = (): void => {
    setDarkMode(!_isDarkMode.value)
  }

  // Следим за изменениями _activeThemeKey и _isDarkMode (если они изменятся извне этого composable)
  // Это больше для синхронизации с localStorage, если он изменится в другой вкладке (через storage event)
  // или если Dark.isActive изменится внешне (например, DevTools)
  watch(_activeThemeKey, (newThemeKey) => {
    _applyCssVariables(newThemeKey, _isDarkMode.value)
  })

  watch(_isDarkMode, (newDarkValue) => {
    if (Dark.isActive !== newDarkValue) {
      Dark.set(newDarkValue)
    }
    _applyCssVariables(_activeThemeKey.value, newDarkValue)
  })

  // Синхронизация с Quasar Dark.isActive, если он изменился извне
  // (например, через DevTools или системные настройки, если Dark.mode = 'auto')
  if (typeof window !== 'undefined') { // Только в браузере
    watch(() => Dark.isActive, (quasarDarkState) => {
      if (_isDarkMode.value !== quasarDarkState) {
        // Обновляем наше состояние, но не вызываем Dark.set() снова, чтобы избежать цикла
        _isDarkMode.value = quasarDarkState
        LocalStorage.set(LOCAL_STORAGE_DARK_MODE_KEY, quasarDarkState)
        _applyCssVariables(_activeThemeKey.value, quasarDarkState)
      }
    })

    // Слушаем событие изменения системной темы, если Dark.mode === 'auto'
    // Это более продвинутый сценарий, но полезный.
    // Quasar <q-dark-mode-toggle> делает это автоматически.
    // Если мы управляем Dark.mode сами, то нужно слушать.
    // Но так как мы используем Dark.set(true/false), это не так актуально,
    // Quasar сам перестает слушать prefers-color-scheme.
    // Если же Dark.mode изначально 'auto', то первое значение _isDarkMode будет верным.
  }

  // `onMounted` не требуется для инициализации, так как она происходит на уровне модуля.

  return {
    activeThemeKey: computed(() => _activeThemeKey.value) as DeepReadonly<Ref<ThemeKey>>,
    isDarkMode: computed(() => _isDarkMode.value) as DeepReadonly<Ref<boolean>>,
    setActiveTheme,
    setDarkMode, // Добавим для большей гибкости
    toggleDarkMode,
    availableThemes,
  }
}

// --- Функция для boot-файла (опционально, т.к. инициализация уже в модуле) ---
export function initialThemeSetup(): void {
  // Убедимся, что Quasar Dark и наши CSS переменные синхронизированы.
  // Это может быть полезно, если boot-файл выполняется до того, как Vue приложение
  // полностью смонтировано и composable был импортирован где-то еще.
  // В нашей реализации с импортом на уровне модуля, это скорее перестраховка.
  if (Dark.isActive !== _isDarkMode.value) {
    Dark.set(_isDarkMode.value)
  }
  _applyCssVariables(_activeThemeKey.value, _isDarkMode.value)
}
