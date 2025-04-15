import { test, expect } from '@playwright/test';

test('1', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login')
await page.locator("//input[@id='email']").fill('customer@practicesoftwaretesting.com')
await page.locator("//input[@id='password']").fill('welcome01')
await page.click("//input[@class='btnSubmit']")
await expect(page).toHaveURL('https://practicesoftwaretesting.com/account')
await expect(await page.locator('[data-test="page-title"]')).toContainText('My account')
await expect(await page.locator(".navbar-nav")).toContainText('Jane Doe')
});


test('2', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com')
    await expect(await page.locator("a.card:nth-child(1)")).toBeVisible()
    await page.click("a.card:nth-child(1)")
    await expect(page.url()).toContain('https://practicesoftwaretesting.com/product')
    await expect(await page.locator('[data-test = "product-name"]')).toHaveText('Combination Pliers')
    await expect(await page.locator('[data-test="unit-price"]')).toHaveText('14.15')
    await expect(await page.locator('[id="btn-add-to-cart"]')).toBeVisible()
    await expect(await page.locator('[id="btn-add-to-favorites"]')).toBeVisible()
})



test('3', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com')
    await page.click("a.card:nth-child(5)")
    await expect(page.url()).toContain('https://practicesoftwaretesting.com/product')
    await expect(await page.locator('[data-test = "product-name"]')).toHaveText('Slip Joint Pliers')
    await expect(await page.locator('[data-test="unit-price"]')).toHaveText('9.17')
    await page.click('[id="btn-add-to-cart"]')
    await expect(await page.locator('[id="toast-container"]')).toBeVisible()
    await expect(await page.locator('[id="toast-container"]')).toHaveText(' Product added to shopping cart.')
    await page.waitForTimeout(8000)
    await expect(await page.locator('[id="toast-container"]')).toBeHidden()
    await expect(await page.locator('[data-test="cart-quantity"]')).toHaveText('1')
    await page.click('[data-icon="cart-shopping"]')
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout')
    await expect(await page.locator('[data-test="product-quantity"]')).toHaveValue('1')
    await expect(await page.locator('[data-test="product-title"]')).toHaveText('Slip Joint Pliers')
    await expect(await page.locator('[data-test="proceed-1"]')).toBeVisible()
})
