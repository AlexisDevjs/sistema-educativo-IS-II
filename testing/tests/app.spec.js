const { test, expect } = require('@playwright/test')

test.describe('IS app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await page.goto('/')
  })

  test.describe('Register', () => {
    test('register with credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'Registrarse' }).click()

      await expect(page.getByText('Registro')).toBeVisible()

      await page.fill('input[name="name"]', 'user test')
      await page.fill('input[name="email"]', 'test@utn.edu.ec')
      await page.fill('input[name="ci"]', '1234567890')
      await page.fill('input[name="password"]', '123')
      await page.click('input[type="checkbox"]')
      await page.click('button[type="submit"]')

      await expect(page.getByText('Registro')).not.toBeVisible()
    })
  })
})
