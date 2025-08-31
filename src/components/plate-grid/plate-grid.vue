<template>
  <div class="w-full p-4">
    <div class="canvas-container h-full w-full overflow-hidden">
      <canvas ref="canvasRef" class="plate-canvas block w-full h-full"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { usePlateStore } from '@/stores/plate.store';

const plateStore = usePlateStore();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const gapSize = 8;
const motifImage = ref<HTMLImageElement | null>(null);
const imageLoaded = ref(false);

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d');
    updateCanvasSize();
  }
  
  const img = new Image();
  img.onload = () => {
    motifImage.value = img;
    imageLoaded.value = true;
    renderPlates();
  };
  img.src = '/sample-image.webp';
  
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const totalWidthWithGaps = computed(() => {
  const totalPlatesWidth = plateStore.plates.reduce((sum, plate) => sum + plate.width, 0);
  const totalGapsWidth = gapSize * (plateStore.plates.length - 1);
  return totalPlatesWidth + totalGapsWidth;
});

const totalPlatesWidth = computed(() => {
  return plateStore.plates.reduce((sum, plate) => sum + plate.width, 0);
});

const needsMirroring = computed(() => {
  return totalPlatesWidth.value > 300;
});

const maxHeight = computed(() => {
  return Math.max(...plateStore.plates.map(plate => plate.height), 30);
});

function updateCanvasSize() {
  if (!canvasRef.value) return;
  
  const container = canvasRef.value.parentElement;
  if (!container) return;
  
  canvasRef.value.width = container.clientWidth;
  canvasRef.value.height = container.clientHeight;
}

function handleResize() {
  updateCanvasSize();
  renderPlates();
}

watch(() => plateStore.plates, () => {
  renderPlates();
}, { deep: true });

function renderPlates() {
  if (!ctx.value || !canvasRef.value || !imageLoaded.value) return;
  
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  
  const scale = calculateScale();
  
  const scaledGap = gapSize * scale;
  
  const startX = (canvasRef.value.width - totalWidthWithGaps.value * scale) / 2;
  
  const startY = canvasRef.value.height - maxHeight.value * scale;
  
  ctx.value.save();
  createPlateClippingPath(startX, startY, scale, scaledGap);
  
  drawBackgroundImage(startX, startY, scale);
  
  ctx.value.restore();
  
}

function calculateScale() {
  if (!canvasRef.value) return 1;
  
  const containerWidth = canvasRef.value.width;
  const containerHeight = canvasRef.value.height;
  
  const widthScale = containerWidth / totalWidthWithGaps.value;
  const heightScale = containerHeight / maxHeight.value;
  
  return Math.min(widthScale, heightScale, 1);
}

function createPlateClippingPath(startX: number, startY: number, scale: number, scaledGap: number) {
  if (!ctx.value) return;
  
  let xOffset = startX;
  
  ctx.value.beginPath();
  
  for (let i = 0; i < plateStore.plates.length; i++) {
    const plate = plateStore.plates[i];
    const width = plate.width * scale;
    const height = plate.height * scale;
    
    const plateY = startY + (maxHeight.value * scale - height);
    
    ctx.value.rect(xOffset, plateY, width, height);
    
    xOffset += width + scaledGap;
  }
  
  ctx.value.clip();
}

function drawBackgroundImage(startX: number, startY: number, scale: number) {
  if (!ctx.value || !motifImage.value) return;
  
  const totalWidth = totalWidthWithGaps.value * scale;
  const totalHeight = maxHeight.value * scale;
  
  if (needsMirroring.value) {
    // Mirroring logic for when total width > 300cm
    const mirrorCycleWidth = 300 * scale; // Mirror after 300cm (scaled)
    const cycles = Math.ceil(totalWidth / mirrorCycleWidth);
    
    let xOffset = 0;
    
    for (let i = 0; i < cycles; i++) {
      const cycleWidth = Math.min(mirrorCycleWidth, totalWidth - xOffset);
      
      if (i % 2 === 0) {
        ctx.value.drawImage(
          motifImage.value,
          0, 0, motifImage.value.width, motifImage.value.height,
          startX + xOffset, startY, cycleWidth, totalHeight
        );
      } else {
        // Mirrored image
        ctx.value.save();
        ctx.value.translate(startX + xOffset + cycleWidth, startY);
        ctx.value.scale(-1, 1);
        ctx.value.drawImage(
          motifImage.value,
          0, 0, motifImage.value.width, motifImage.value.height,
          0, 0, cycleWidth, totalHeight
        );
        ctx.value.restore();
      }
      
      xOffset += cycleWidth;
    }
  } else {
    ctx.value.drawImage(
      motifImage.value,
      0, 0, motifImage.value.width, motifImage.value.height,
      startX, startY, totalWidth, totalHeight
    );
  }
}
</script>