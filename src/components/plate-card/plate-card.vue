<template>
  <component :is="as" class="bg-accent p-3 rounded-lg flex items-center gap-3">
    <p
      class="w-6 h-6 aspect-square flex items-center justify-center rounded-sm border border-foreground/70 bg-background"
      :class="{ 'bg-foreground text-background': plateIsActive }"
    >
      {{ index + 1 }}
    </p>
    <SizeInput
      v-model="plate.width"
      :label="t('width')"
      :sublabel="`${plateStore.MIN_WIDTH}-${plateStore.MAX_WIDTH}cm`"
      :min="20"
      :max="300"
      @focus="setFocus(true, 'width')"
      @blur="setFocus(false, 'width')"
      :description="`${convertCmToMm(plate.width)}mm`"
    />
    <XIcon class="min-w-3 min-h-3 pt-3" />
    <SizeInput
      v-model="plate.height"
      :label="t('height')"
      :sublabel="`${plateStore.MIN_HEIGHT}-${plateStore.MAX_HEIGHT}cm`"
      :min="30"
      :max="128"
      @focus="setFocus(true, 'height')"
      @blur="setFocus(false, 'height')"
      :description="`${convertCmToMm(plate.height)}mm`"
    />
    <Button
      @click="plateStore.removePlate(plate.id)"
      :disabled="plateStore.plates.length <= 1"
      size="icon"
      variant="destructive"
      class="w-5 h-5 rounded-full hover:scale-130"
    >
      <MinusIcon class="size-3" />
    </Button>
  </component>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { type PlateSchema } from '@/schemas/plate.schema';
import { usePlateStore } from '@/stores/plate.store';
import { SizeInput } from "@/components/size-input";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon, MinusIcon } from "lucide-vue-next";
import { computed, ref } from 'vue';
import { convertCmToMm } from '@/lib/convertCmToMm';

const { t } = useI18n({
  useScope: 'global'
})

type Props = {
    as?: HTMLElement | string;
    index: number; // Starts at 0
    plate: PlateSchema;
}
const props = withDefaults(defineProps<Props>(), {
    as: 'div'
})

const plateStore = usePlateStore();

const focusMap = ref<{ [key: string]: boolean }>({ width: false, height: false });

const setFocus = (focused: boolean, id: string) => {
    focusMap.value[id] = focused;
};

// If any of the inputs is focused, the plate is active
const plateIsActive = computed(() => Object.values(focusMap.value).some(v => v))
</script>

<i18n lang="json" locale="de">
{
  "Width": "Breite",
  "Height": "Höhe"
}
</i18n>
<i18n lang="json" locale="en">
{
  "Width": "Width",
  "Height": "Height"
}
</i18n>
