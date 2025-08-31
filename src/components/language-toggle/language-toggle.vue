<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="ms-auto" variant="secondary">
        <component :is="currentLocale?.icon" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        v-for="_locale in _locales"
        @click="locale = (_locale.locale as any)"
        class="cursor-pointer"
      >
        <component :is="_locale.icon" />
        <span>{{ _locale.name }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { UnitedKingdom, Germany } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { computed, onMounted, watch } from "vue";
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

const _locales = [
  {
    locale: "de",
    name: "Deutsch",
    icon: Germany,
  },
  {
    locale: "en",
    name: "English",
    icon: UnitedKingdom,
  },
];

const currentLocale = computed(() => {
  return _locales.find((l) => l.locale === locale.value);
})

const fetchLocaleFromStorage = () => {
  const storedLocale = localStorage.getItem("plate-locale");
  if (storedLocale && availableLocales.includes(storedLocale as any)) {
    return (locale.value = storedLocale as any);
  }
  return (locale.value = "de");
};

watch(locale, (newLocale) => {
  localStorage.setItem("plate-locale", newLocale);
});

onMounted(() => {
  fetchLocaleFromStorage();
});
</script>
