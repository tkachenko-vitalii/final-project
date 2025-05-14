import { expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';
import { HomePage } from '../pages/home.page';
import { test } from '../pages/fixtures/myFixtures';

dotenv.config();


test('Authorization', async ({ loggedInPage }) => {

  const loginPage = new LoginPage(loggedInPage);
  const homePage = new HomePage(loggedInPage);

await homePage.header.checkUrl('/account')

await loginPage.checkTitle('My account')

await homePage.header.checkAccName()

});


test('ProductInfo', async ({ homePage, productPage }) => {

  const productTitle = 'Combination Pliers';
  const productPrice =  14.15;
 
  await productPage.openProduct(productTitle);
    
  await productPage.checkProductInfo(productTitle, productPrice);
})



test('AddToCart', async ({ homePage, productPage, checkOutPage }) => {

  const productTitle = 'Slip Joint Pliers';
  const productPrice = 9.17;

  await productPage.openProduct(productTitle)

  await productPage.checkProductInfo(productTitle, productPrice)

  await expect (productPage.addToCartBtn).toBeVisible();

  await expect (productPage.addToFavouritesBtn).toBeVisible();

  await productPage.addToCartBtn.click()

  await productPage.checkToastNotification('Product added to shopping cart.')

  await homePage.header.checkQty('1');
  
  await homePage.header.openCart();

  await homePage.header.checkUrl('/checkout')

  await checkOutPage.checkProductValue(1)

  await checkOutPage.checkProductName(productTitle)
  
  await checkOutPage.checkProceedBtn()
})

