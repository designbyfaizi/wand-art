import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'de',
    messages: {
        de: {
            "width": "Breite",
            "height": "Höhe",
            "add_back_panel": "Rückwand hinzufügen",
            "dimensions": "Maße.",
            "enter": "Eingeben",
        },
        en: {
            "width": "Width",
            "height": "Height",
            "add_back_panel": "Add back panel",
            "dimensions": "Dimensions",
            "enter": "Enter",
        },
    }
})