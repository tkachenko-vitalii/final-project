import { Locator, Page } from "@playwright/test";
import { fillIfEmpty } from "../utils/checkout";

export class PaymentsFragment {
  sortDropdown: Locator;
  creditCardNumber: Locator;
  expDate: Locator;
  cVV: Locator;
  cardHolderName: Locator;

  constructor(readonly page: Page) {
    this.sortDropdown = page.getByTestId('payment-method');
    this.creditCardNumber = page.getByTestId('credit_card_number');
    this.expDate = page.getByTestId('expiration_date');
    this.cVV = page.getByTestId('cvv');
    this.cardHolderName = page.getByTestId('card_holder_name');
  }

  
  async selectSortOption(optionText: string):Promise<void> {
    await this.sortDropdown.selectOption({ label: optionText });
  }

  async checkPaymentFormToBeFulfilled(): Promise<void> {
    const now = new Date();
    const threeMonthsLater = new Date(now);
    threeMonthsLater.setMonth(now.getMonth() + 3);
    const month = (threeMonthsLater.getMonth() + 1).toString().padStart(2, '0');
    const year = threeMonthsLater.getFullYear();
    const formatted = `${month}/${year}`

    const fields = [
      { locator: this.creditCardNumber, value: process.env.CREDIT_CARD_NUMBER! },
      { locator: this.expDate, value: formatted},
      { locator: this.cVV, value: process.env.CVV! },
      { locator: this.cardHolderName, value: process.env.CARD_HOLDER_NAME! },
    ]
    for (const { locator, value } of fields) {
        await fillIfEmpty(locator, value);
      }
    }
}