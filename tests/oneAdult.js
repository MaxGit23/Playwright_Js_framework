const { test, expect } = require('@playwright/test');

// FIXME: Verify these paths match your actual folder structure. Are they consistent?
const SearchPage = require('../pagesObjects/Search.js');
const FlightsResultsPage = require('../pages/FlightsResults.js'); // Should this also be in pagesObjects?

test.describe('Flight Search Functionality', () => {
  // Use camelCase for variable names, distinct from Class names
  let searchPage;
  let flightsResultsPage;
//hdhhd
  test.beforeEach(async ({ page }) => {
    // Instantiate classes using the correct Class names
    // Assign instances to the camelCase variables
    searchPage = new SearchPage(page);
    flightsResultsPage = new FlightsResultsPage(page);

    // FIXME: Ensure searchPage.goto() method exists where expected OR change this line
    // Example: await page.goto('/'); // If using baseURL and no complex navigation needed
    await searchPage.goto();
  });

  test('should search for round-trip flights', async () => {
    // FIXME: Replace hardcoded past dates with dynamic future dates!
    const departureDate = '2024-03-01'; // CRITICAL: NEEDS FIXING
    const returnDate = '2024-03-10';   // CRITICAL: NEEDS FIXING

    await searchPage.searchFlights(
      'Dubai',
      'London',
      departureDate,
      returnDate
    );

    await flightsResultsPage.waitForResults();
    const resultsCount = await flightsResultsPage.getResultsCount();

    expect(resultsCount).toBeGreaterThan(0);
  });

  test('should filter flights by stops', async () => {
    // FIXME: Replace hardcoded past dates with dynamic future dates!
    const departureDate = '2024-03-15'; // CRITICAL: NEEDS FIXING
    const returnDate = '2024-03-25';   // CRITICAL: NEEDS FIXING

    await searchPage.searchFlights(
      'Dubai',
      'New York',
      departureDate,
      returnDate
    );

    // Use the correct variable name: flightsResultsPage
    await flightsResultsPage.waitForResults();
    await flightsResultsPage.filterByStops(1);

    // Wait for results to update using the correct variable name
    await expect(async () => {
      // Use the correct variable name: flightsResultsPage
      const count = await flightsResultsPage.getResultsCount();
      expect(count).toBeGreaterThan(0);
    }).toPass();
  });
});