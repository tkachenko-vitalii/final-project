import { expect } from '@playwright/test';
import { test } from '../pages/fixtures/myFixtures';
import { PowerTools } from '../tools';
import { sortPrices, sortNames } from "../utils/sorting";
import dotenv from 'dotenv';

dotenv.config();


test.describe('Sorting by name', () => {
    const sortOptions = [
      { label: 'Name (A - Z)', ascending: true },
      { label: 'Name (Z - A)', ascending: false },
    ];
  
    for (const { label, ascending } of sortOptions) {
      
      test(`Verify sorting by ${label}`, async ({ homePage }) => {
        
        await homePage.filters.selectSortOption(label);

        const productNames = await homePage.getProductNames();
  
        const sortedNames = sortNames(productNames,ascending)
  
        expect(productNames).toEqual(sortedNames);
      });
    }
  });
  
  test.describe('Verify sorting by price', () => {

      const sortingOptions = [
        { label: 'Price (Low - High)', ascending: true },
        { label: 'Price (High - Low)', ascending: false },
      ];
    
      for (const { label, ascending } of sortingOptions) {
        test(`Sorting by ${label}`, async ({ homePage }) => {
          
          await homePage.filters.selectSortOption(label);
    
          const prices = await homePage.getProductPrices();

          const sorted = sortPrices(prices, ascending);
    
          expect(sorted).toEqual([...prices].sort((a, b) => ascending ? a - b : b - a));
        });
      }
    });
  
    test('Filter products by category', async ({ homePage }) => {
      

      await homePage.filters.filterByCategory(PowerTools.Sander);
    
      const productNames = await homePage.getProductNames();
    
      for (const name of productNames) {
        expect(name).toContain('Sander');
      }
    });
    