import { expect, Locator } from "@playwright/test";

export async function fillIfEmpty(field: Locator, value: string): Promise<void> {
    const currentValue = await field.inputValue();
    if (!currentValue.trim()) {
      await field.fill(value);
    }
    await expect(field).toHaveValue(value);
  }