import { expect, Locator, Page } from "@playwright/test";
import { PaymentsFragment } from '../pageFragments/payment';
import { fillIfEmpty } from "../utils/checkout";
import dotenv from 'dotenv';

dotenv.config();

export class CheckOutPage{
   readonly page: Page;
   readonly productQuantity: Locator;
   readonly productTitle: Locator;
   readonly productPrice: Locator;
   readonly proceedToCheckoutBtn: Locator;
   readonly proceedToCheckoutBtn2: Locator;
   readonly proceedToCheckoutBtn3: Locator;
   readonly loginSubmitBtn: Locator;
   readonly email: Locator;
   readonly password: Locator;
   readonly street: Locator;
   readonly state: Locator;
   readonly city: Locator;
   readonly country: Locator;
   readonly postalCode: Locator;
   readonly payment: PaymentsFragment;
   readonly confirmPaymentBtn: Locator;
   readonly alert: Locator;

   constructor(page: Page) {
    this.page = page;
    this.productQuantity = this.page.getByTestId("product-quantity")
    this.productTitle = this.page.getByTestId("product-title")
    this.productPrice = this.page.getByTestId("product-price")
    this.proceedToCheckoutBtn = this.page.getByTestId("proceed-1")
    this.proceedToCheckoutBtn2 = this.page.getByTestId("proceed-2")
    this.proceedToCheckoutBtn3 = this.page.getByTestId("proceed-3")
    this.loginSubmitBtn=this.page.getByTestId("login-submit")
    this.street=this.page.getByTestId("street")
    this.state=this.page.getByTestId("state")
    this.city=this.page.getByTestId("city")
    this.country=this.page.getByTestId("country")
    this.postalCode=this.page.getByTestId("postal_code")
    this.email = this.page.getByTestId("email");
    this.password = this.page.getByTestId('password');
    this.payment = new PaymentsFragment(page)
    this.confirmPaymentBtn = this.page.getByTestId("finish")
    this.alert = this.page.getByTestId("payment-success-message")
   }

async checkProductValue(value:number):Promise<void> {
    await expect (this.productQuantity).toHaveValue(value.toString())
}

async checkProductPrice(price:number):Promise<void> {
    await expect (this.productPrice).toHaveText(`$${price.toFixed(2)}`)
}

async checkProductName(title: string):Promise<void> {
    await expect (this.productTitle).toHaveText(title)
}

async checkProceedBtn():Promise<void> {
    await expect (this.proceedToCheckoutBtn).toBeVisible()
}

async checkProceedBtn2():Promise<void> {
    await expect (this.proceedToCheckoutBtn2).toBeVisible()
}

   async checkIfLoggedIn(): Promise<void> {

    async function fillIfEmpty(field: Locator, value: string): Promise<void> {
        const currentValue = await field.inputValue();

        if (!currentValue.trim()) {
          await field.fill(value);
        }
        await expect(field).toHaveValue(value);
      }

    const fields = [
        { locator: this.email, value: process.env.USER_EMAIL! },
        { locator: this.password, value: process.env.USER_PASSWORD! }
    ]

    for (const { locator, value } of fields) {
        await fillIfEmpty(locator, value);
      }
    }
    async checkAddressFormToBeFulfilled(): Promise<void> {
        const fields = [
          { locator: this.street, value: process.env.STREET! },
          { locator: this.city, value: process.env.CITY! },
          { locator: this.postalCode, value: process.env.POSTAL_CODE! },
          { locator: this.state, value: process.env.STATE! },
          { locator: this.country, value: process.env.COUNTRY! },
        ]
        for (const { locator, value } of fields) {
            await fillIfEmpty(locator, value);
          }
        }

        async checkAlertNotification(alert:string):Promise<void> {
          await expect (this.alert).toBeVisible();
          await expect (this.alert).toHaveText(alert);
        
      }
      
}
