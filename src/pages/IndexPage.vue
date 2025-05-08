<script setup lang="ts">
import { useTheme } from 'src/features/theming/composables/useTheme'
import { themeDefinitions } from 'src/features/theming/config'

const { activeThemeKey, isDarkMode } = useTheme()

const currentThemeKeyDisplay = computed(() => activeThemeKey.value)
const isDarkModeDisplay = computed(() => isDarkMode.value)

const currentThemeNameDisplay = computed(() => {
  return themeDefinitions[activeThemeKey.value]?.name || 'Unknown Theme'
})
</script>

<template>
  <div class="q-pa-md">
    <p>
      Current theme key: <strong>{{ currentThemeKeyDisplay }}</strong> ({{ currentThemeNameDisplay }})
    </p>
    <p>
      Dark mode: <strong>{{ isDarkModeDisplay }}</strong>
    </p>
    <q-btn color="primary" label="Primary" class="q-mr-sm" />
    <q-btn color="secondary" label="Secondary" class="q-mr-sm" />
    <q-btn color="accent" label="Accent" />

    <q-card class="q-mt-md" :flat="isDarkModeDisplay">
      <q-card-section>
        <div class="text-h6">
          Themed Card
        </div>
      </q-card-section>
      <q-card-section>
        This card uses Quasar's default theming capabilities, which
        respect CSS variables like <code>--q-card-bg</code> and text colors.
        The <code>flat</code> property changes based on dark mode for demo.
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Action 1" color="primary" />
      </q-card-actions>
    </q-card>

    <div class="q-mt-md q-pa-md custom-styled-box">
      This box uses custom CSS variables: --my-custom-header-bg (for border)
      and --my-custom-header-text (for text).
    </div>
  </div>
</template>

<style lang="scss">
.custom-styled-box {
  border: 2px solid var(--my-custom-header-bg, var(--q-primary));
  color: var(--my-custom-header-text, var(--q-text-color, #000));
  padding: 16px;
  margin-top: 16px;
  border-radius: 4px;
}
</style>
