<template>
    <DefaultLayout>
        <main class="w-full p-4 flex flex-col items-center lg:flex-row lg:items-start gap-8 max-w-screen-2xl mx-auto">
            <section
                class="canvas aspect-square grow w-full h-fit max-h-[calc(100dvh-32px-var(--header-height))] max-w-screen-md lg:sticky top-4 col-span-12 lg:col-span-7 bg-gradient-to-t from-neutral-200 to-background rounded-xl ring ring-neutral-200">
                {{ plateStore.INITIAL_PLATE }}
                {{ plateStore.plates.length }}
                {{ plateStore.plates }}
            </section>
            <section class="control grow w-full flex flex-col gap-4">
                <h1 class="text-xl"><span class="font-bold">Maße.</span> Eingeben</h1>
                <motion.ol layout class="flex flex-col gap-4">
                    <AnimatePresence>
                        <Motion v-for="(plate, index) in plateStore.plates" :key="plate.id"
                            :initial="{ opacity: 0, y: -20, height: 0 }" :animate="{ opacity: 1, y: 0, height: 'auto' }"
                            :exit="{ opacity: 0, y: 20, height: 0 }"
                            :transition="{ type: 'spring', stiffness: 300, damping: 25 }" layout
                            class="overflow-hidden">
                            <PlateCard as="li" :index="index" :plate="plate" />
                        </Motion>
                    </AnimatePresence>
                </motion.ol>
                <div
                    class="button-container p-4 lg:p-0 fixed bottom-0 inset-x-0 lg:relative lg:ms-auto bg-background/70 backdrop-blur-lg border-t border-t-border/70 lg:border-t-transparent">
                    <Button @click="plateStore.addPlate" variant="outline" class="w-full"
                        :disabled="plateStore.plates.length >= plateStore.MAX_PLATES">
                        <span> Rückwand hinzufügen </span>
                        <PlusIcon class="w-4 h-4" />
                    </Button>
                </div>
            </section>
        </main>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion, Motion } from "motion-v";
import { Button } from "@/components/ui/button";
import { PlateCard } from "@/components/plate-card";
import { PlusIcon } from "lucide-vue-next";
import { usePlateStore } from "@/stores/plate.store";
import { DefaultLayout } from "@/layouts";

const plateStore = usePlateStore();
</script>

<style></style>
