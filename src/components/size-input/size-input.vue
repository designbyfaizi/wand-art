<template>
    <div layout class="flex flex-col w-full">
        <label class="text-sm flex items-baseline justify-between gap-2">
            <span>{{ label }}</span>
            <span v-show="sublabel" class="text-xs">{{ sublabel }}</span>
        </label>
        <div class="flex w-full relative">
            <Input type="number" v-model.number="localValue" @blur="onBlur" @focus="onFocus" />
            <span
                class="absolute right-[0.75px] inset-y-0.25 p-1 px-2 rounded-md text-muted-foreground bg-background/60 backdrop-blur-lg">cm</span>
        </div>
        <span class="text-xs text-center text-muted-foreground mt-1">{{ description }}
        </span>
    </div>
</template>

<script lang="ts" setup>
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
    if (!result.success) {
        return (error.value = result.error.message);
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
