const { test, expect } = require('@playwright/test')
const faker = require('faker')
const isCreditCard = require('validator/lib/isCreditCard')

const generateCreditCard = () => {
  // generates format 0000-0000-0000-0000 and Luhn may be wrong
  let card = faker.finance.creditCardNumber('mastercard')
  if (!isCreditCard(card)) {
    // cut last digit, leaving 0000-0000-0000-000
    const start = card.substring(0, 18)
    // add digits until Luhn check passes
    for (let i = 0; i < 10; i++) {
      card = start + i
      if (isCreditCard(card)) {
        return card
      }
    }
  }
  return card
}

const number = (from, to) => String(Math.round(Math.random() * (to - from) + from))

const countries = ['US', 'NO', 'GB', 'CA', 'LV']

test('Immediately clicking submit shows errors for all fields', async ({ page }) => {
  await page.goto('http://localhost:3333/checkout')
  await page.locator('button').click()
  await expect(page.locator('text=Please provide your First Name').first()).toBeVisible()
  await expect(page.locator('text=Please provide your Last Name').first()).toBeVisible()
  await expect(page.locator('text=Please provide a valid email').first()).toBeVisible()
  await expect(page.locator('text=Must be 5 digits').first()).toBeVisible()
  await expect(page.locator('text=Please provide a valid phone number').first()).toBeVisible()
  await expect(page.locator('text=Please provide a valid credit card number').first()).toBeVisible()
  await expect(page.locator('text=Must be 3 digits').first()).toBeVisible()
  await expect(page.locator('text=Please provide a valid expiration date').first()).toBeVisible()
})

test('Can submit a valid form', async ({ page }) => {
  await page.goto('http://localhost:3333/checkout')
  await page.fill('#firstName', faker.name.firstName())
  await page.fill('#lastName', faker.name.lastName())
  await page.fill('#email', faker.internet.email())
  await page.selectOption('#country', faker.random.arrayElement(countries))
  await page.fill('#postalCode', number(10000, 99999))
  await page.fill('#phone', faker.phone.phoneNumber())
  await page.fill('#creditCard', generateCreditCard())
  await page.fill('#CVV', faker.finance.creditCardCVV())
  await page.fill('#expDate', number(1, 12).padStart(2, '0') + number(11, 99))

  await page.locator('button').click()

  await expect(page.locator('text=Order successfully placed.').first()).toBeVisible()
})
