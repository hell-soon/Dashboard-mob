import type { themeDefinitions } from '../config/definitions'

export interface ThemeColorVariables {
  '--q-primary'?: string
  '--q-secondary'?: string
  '--q-accent'?: string
  '--q-dark'?: string
  '--q-positive'?: string
  '--q-negative'?: string
  '--q-info'?: string
  '--q-warning'?: string

  // Quasar стандартные переменные для фона/текста
  '--q-page-bg'?: string // Фон страницы (светлая тема)
  '--q-text-color'?: string // Цвет текста (светлая тема)
  '--q-dark-page'?: string // Фон страницы (темная тема, используется Quasar)
  '--q-body-text'?: string // Цвет текста (темная тема, используется Quasar)
  '--q-card-bg'?: string // Фон карточек
  '--q-header-bg'?: string
  '--q-header-text'?: string
  '--q-drawer-bg'?: string
  '--q-drawer-text'?: string

  // Ваши кастомные CSS переменные
  // Позволяет добавлять любые CSS переменные, начинающиеся с '--'
  [key: `--${string}`]: string | undefined
}

export interface ThemeModeColors {
  light: ThemeColorVariables
  dark: ThemeColorVariables
}

export interface ThemeDefinition {
  name: string // Человекочитаемое имя темы
  colors: ThemeModeColors
}

// Коллекция всех тем, ключом является идентификатор темы
export interface ThemeCollection {
  [themeKey: string]: ThemeDefinition
}

// Допустимые идентификаторы тем (для type safety)
// Можно расширить через объединение: 'default' | 'ocean' | 'forest' | 'anotherTheme'
// или использовать string для полной гибкости, если темы добавляются динамически
export type ThemeKey = keyof typeof themeDefinitions
