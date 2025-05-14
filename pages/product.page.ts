import { expect, Locator, Page } from "@playwright/test";


export class ProductPage{
   readonly page: Page;
   readonly productName: Locator;
   readonly unitPrice: Locator;
   readonly addToCartBtn: Locator;
   readonly addToFavouritesBtn: Locator;
   readonly alert: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productName = this.page.getByTestId("product-name");
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCartBtn = this.page.getByTestId('add-to-cart')
        this.addToFavouritesBtn = this.page.getByTestId('add-to-favorites')
        this.alert = this.page.locator("[id='toast-container']")   
    }

    async openProduct(title: string): Promise<void> {
        await this.page.getByAltText(title).click();
        await this.page.waitForURL(/\/product/);
      }

async checkProductInfo(title: string, price: number, ): Promise<void> {
    await expect(this.productName).toHaveText(title);
    await expect(this.unitPrice).toHaveText(price.toFixed(2));
}

async checkToastNotification(alert:string):Promise<void> {
    await expect (this.alert).toBeVisible();
    await expect (this.alert).toHaveText(alert);
    await expect (this.alert).toBeHidden({ timeout: 8000 })
}


}

  


    
  
       