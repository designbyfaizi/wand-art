<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="ms-auto" variant="secondary">
        {{ locale }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        v-for="_locale in availableLocales"
        @click="locale = _locale"
        class="cursor-pointer"
      >
        {{ _locale }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
