<template>
  <div layout class="flex flex-col w-full">
    <label class="text-sm flex items-baseline justify-between gap-2">
      <span>{{ label }}</span>
      <span v-show="sublabel" class="text-xs hidden sm:inline">{{ sublabel }}</span>
    </label>
    <div class="flex w-full relative">
      <TooltipProvider :disabled="!error">
        <Tooltip :open="!!error" disableClosingTrigger type="error">
          <TooltipTrigger as-child
            ><Input
              type="number"
              v-model.number="localValue"
              @blur="onBlur"
              @focus="onFocus"
              :class="
                !!error &&
                'text-destructive-foreground outline focus-visible:ring-destructive/50'
              "
            />
          </TooltipTrigger>
          <TooltipContent type="error">
            <p>{{ error }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span
        class="absolute right-[0.75px] inset-y-0.25 p-1 px-2 rounded-md text-muted-foreground bg-background/60 backdrop-blur-lg pointer-events-none"
        >cm</span
      >
    </div>
    <span class="text-xs text-center text-muted-foreground mt-1">{{ description }} </span>
  </div>
</template>

<script lang="ts" setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ref, watch } from "vue";
import { z } from "zod";

type Props = {
  modelValue?: number;
  label: string;
  sublabel?: string;
  min: number;
  max: number;
  description?: string;
};

type Emit = {
  (e: "update:modelValue", value: typeof props.modelValue): void;
  (e: "focus"): void;
  (e: "blur"): void;
};
const emit = defineEmits<Emit>();
const props = defineProps<Props>();

const schema = z
  .number()
  .min(props.min, `Must be at least ${props.min}cm`)
  .max(props.max, `Must be at most ${props.max}cm`);

const localValue = ref(props.modelValue);
const error = ref<string | null>(null);

let lastValidValue = props.modelValue;

watch(localValue, (value) => {
  const result = schema.safeParse(value);
  console.log({ result });
  if (!result.success) {
    const _error = JSON.parse(result.error as any);
    return (error.value = _error[0].message);
  }
  error.value = null;
  lastValidValue = value;
  emit("update:modelValue", value);
});

const onBlur = () => {
  emit("blur");
  const result = schema.safeParse(localValue.value);
  if (!result.success) {
    localValue.value = lastValidValue;
    error.value = null;
  }
};

const onFocus = () => {
  emit("focus");
};
</script>

<style></style>
