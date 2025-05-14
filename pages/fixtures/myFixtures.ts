import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../login.page'
import dotenv from 'dotenv';
import { HomePage } from '../home.page';
import { ProductPage } from '../product.page';
import { CheckOutPage } from '../checkout.page';

dotenv.config();

type MyFixtures = {
  loggedInPage: Page,
  homePage: HomePage
  productPage: ProductPage
  checkOutPage: CheckOutPage 
};

export const test = base.extend<MyFixtures>({
    loggedInPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);
  
        await page.goto('/auth/login')
      
        await loginPage.login(process.env.USER_EMAIL!,process.env.USER_PASSWORD!)

        await use(page); 
    },
    homePage: async ({ loggedInPage }, use) => {
      const homePage = new HomePage(loggedInPage);
      await homePage.open();
      await use(homePage);
    },
  
    productPage: async ({ loggedInPage }, use) => {
      const productPage = new ProductPage(loggedInPage);
      await use(productPage);
    },
    checkOutPage: async ({ loggedInPage }, use) => {
      const checkOutPage = new CheckOutPage(loggedInPage);
      await use(checkOutPage);
  }
})
  