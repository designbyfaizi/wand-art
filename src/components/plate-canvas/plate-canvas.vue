<template>
  <canvas ref="plateCanvas"> </canvas>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { usePlateStore } from "@/stores/plate.store";

const plateCanvas = ref<HTMLCanvasElement | null>(null);
const plateStore = usePlateStore();
const motif = new Image();
motif.src = "/sample-image.webp";

onMounted(() => {
  motif.onload = () => renderCanvas();
});

function renderCanvas() {
  if (!plateCanvas.value) {
    return;
  }

  const ctx = plateCanvas.value.getContext("2d");

  if (!ctx) {
    return;
  }

  const totalWidth = plateStore.plates.reduce((sum, p) => sum + p.width, 0);
  const maxHeight = Math.max(...plateStore.plates.map((p) => p.height));

  plateCanvas.value.width = totalWidth;
  plateCanvas.value.height = maxHeight;

  // Drawing plates
  let offsetX = 0;
  for (const plate of plateStore.plates) {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX, 0, plate.width, plate.height);

    // Drawing motif portion. I need to add mirroring and scaling later
    ctx.drawImage(
      motif,
      offsetX,
      0,
      plate.width,
      plate.height, // portion from motif
      offsetX,
      0,
      plate.width,
      plate.height // destination
    );

    offsetX += plate.width
  }
}
</script>

<style></style>
