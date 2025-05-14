import { test } from '../pages/fixtures/myFixtures';

import dotenv from 'dotenv';

dotenv.config();

test('Buying', async ({ homePage, productPage, checkOutPage }) => {
    
    const productTitle = 'Combination Pliers';
    const productPrice =  14.15;
   
    await productPage.openProduct(productTitle);
    await productPage.addToCartBtn.click();
    await homePage.header.openCart();
    await checkOutPage.checkProductValue(1);
    await checkOutPage.checkProductName(productTitle);
    await checkOutPage.checkProductPrice(productPrice);
    await checkOutPage.proceedToCheckoutBtn.click();
    await checkOutPage.checkIfLoggedIn()
    await checkOutPage.loginSubmitBtn.click();
    await checkOutPage.proceedToCheckoutBtn2.click();
    await checkOutPage.checkAddressFormToBeFulfilled();
    await checkOutPage.proceedToCheckoutBtn3.click();
    await checkOutPage.payment.selectSortOption('Credit Card');
    await checkOutPage.payment.checkPaymentFormToBeFulfilled();
    await checkOutPage.confirmPaymentBtn.click();
    await checkOutPage.checkAlertNotification('Payment was successful')
    
    



      
});
