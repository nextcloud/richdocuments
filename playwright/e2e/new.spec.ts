import { expect, mergeTests } from '@playwright/test'
import { test as userTest } from '../support/fixtures/randomUser'
import { test as collaboraTest } from '../support/fixtures/collabora'

const test = mergeTests(userTest, collaboraTest)

const newFileTypes = [
    { type: 'document', ext: 'odt' },
    { type: 'presentation', ext: 'odp'},
    { type: 'spreadsheet', ext: 'ods' },
    { type: 'diagram', ext: 'odg' },
]

newFileTypes.forEach(({ type, ext }) => {
    test(`new ${type}`, async ({ page, collabora }) => {
        await page.goto('apps/files')

        await page.getByRole('button', { name: 'New' }).click()
        await page.getByRole('menuitem', { name: `New ${type}`}).click()

        // Simulate how the user will start typing once the
        // new node dialog appears as the text is already highlight
        await page.getByLabel('Filename').pressSequentially(`my new ${type}`)

        await page.getByRole('button', { name: 'Create' }).click()

        const viewer = page.getByRole('dialog', { name: `my new ${type}.${ext}` })
        await expect(viewer).toBeVisible()

        await collabora.content.waitFor({ state: 'visible' })
    })
})

