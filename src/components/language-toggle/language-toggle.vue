<template>
  <div class="flex flex-col">
    <label for="locale" class="sr-only">Lang</label>
    <select v-model="locale" class="p-4 rounded-md cursor-pointer hover:bg-accent">
      <option v-for="_locale in availableLocales" :key="_locale">{{ _locale }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale, availableLocales } = useI18n({
  useScope: "global",
  inheritLocale: true,
  messages: {
    de: {
      hello: "Hallo",
    },
    en: {
      hello: "Hello",
    },
  },
});

const fetchLocaleFromStorage = () => {
  const storedLocale = localStorage.getItem("plate-locale");
  if (storedLocale && availableLocales.includes(storedLocale as any)) {
    return locale.value = storedLocale as any;
  }
  return locale.value = "de";
}

watch(locale, (newLocale) => {
  localStorage.setItem("plate-locale", newLocale);
});

onMounted(() => {
  fetchLocaleFromStorage();
});
</script>
