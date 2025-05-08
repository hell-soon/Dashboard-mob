import { boot } from 'quasar/wrappers'
// Импортируем initialThemeSetup ИЛИ сам composable useTheme.
// Сам факт импорта модуля useTheme.ts уже запустит код инициализации на уровне модуля.
// Вызов initialThemeSetup() здесь для явности и если есть специфичная логика для boot-файла.
import { initialThemeSetup } from 'src/features/theming/composables/useTheme'

export default boot((/* { app, router, store, ssrContext } */) => {
  // Выполняем начальную настройку темы.
  // Основная логика (чтение из localStorage, применение Dark.set и CSS)
  // уже произошла при импорте модуля useTheme.ts.
  // Эта функция может служить для дополнительной подстраховки или логирования.
  initialThemeSetup()
})
