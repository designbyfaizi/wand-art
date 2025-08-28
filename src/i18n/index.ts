import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages: {
        de: {
            message: {
                hello: 'hallo Welt'
            }
        },
        en: {
            message: {
                hello: 'hello world'
            }
        },
    }
})