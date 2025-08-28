import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'de',
    messages: {
        de: {
            "width": "Breite",
            "height": "Höhe",
            "add_back_panel": "Rückwand hinzufügen"
        },
        en: {
            "width": "Width",
            "height": "Height",
            "add_back_panel": "Add back panel"
        },
    }
})