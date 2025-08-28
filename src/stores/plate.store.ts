import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { plateSchema, type PlateSchema } from '@/schemas/plate.schema'
import { generateRandomId } from '@/lib/generateRandomId'

const INITIAL_PLATE = {
    id: generateRandomId(),
    width: 30,
    height: 30,
}
const MAX_PLATES = 10;

const MIN_WIDTH = plateSchema.shape.width.minValue ?? 20;
const MAX_WIDTH = plateSchema.shape.width.maxValue ?? 300;

const MIN_HEIGHT = plateSchema.shape.height.minValue ?? 30;
const MAX_HEIGHT = plateSchema.shape.height.maxValue ?? 128;

const STORAGE_KEY = "plate-store";

export const usePlateStore = defineStore("plate", () => {
    const plates = ref<PlateSchema[]>(loadFromStorage());

    function loadFromStorage(): PlateSchema[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored)
                const result = plateSchema.array().safeParse(data);
                if (result.success) {
                    return result.data;
                }
                return [{ ...INITIAL_PLATE }]
            } catch {
                return [{ ...INITIAL_PLATE }]
            }
        }
        return [{ ...INITIAL_PLATE }]
    }

    const saveToStorage = (): void => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plates.value));
    }

    const addPlate = () => {
        if (plates.value.length < MAX_PLATES) {
            plates.value.push({ ...INITIAL_PLATE, id: generateRandomId() });
        }
    }

    const removePlate = (id: string) => {
        if (plates.value.length > 1) {
            plates.value = plates.value.filter(plate => plate.id !== id);
        }
    }

    watch(plates, () => {
        saveToStorage();
    }, { deep: true });

    return { plates, addPlate, removePlate, saveToStorage, loadFromStorage, MAX_PLATES, MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT, INITIAL_PLATE }
})