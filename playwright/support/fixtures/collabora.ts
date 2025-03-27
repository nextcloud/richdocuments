import type { Page, FrameLocator, Locator } from '@playwright/test'
import { test as base } from '@playwright/test'

class Collabora {
    public readonly iframe: FrameLocator
    public readonly content: Locator

    constructor(public readonly page: Page) {
        this.iframe = page.frameLocator('iframe')
        this.content = this.iframe.locator('body')
    }
}

export const test = base.extend<{ collabora: Collabora }>({
    collabora: async ({ page }, use) => {
        const collabora = new Collabora(page)
        await use(collabora)
    },
})