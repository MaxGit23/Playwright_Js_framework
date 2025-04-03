const { chromium } = require('playwright'); // Import Playwright
//const LoginPage = require("../pageObjects/Dashboard/LoginPage.js"); // Import LoginPage

class GlobalFunctions {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    // Initialize browser and page
    async initialize() {
        this.browser = await chromium.launch({ headless: false }); // Launch browser (headless: false for visible browser)
        this.page = await this.browser.newPage(); // Open a new page
    }

    // Navigate to a URL
    async getURL() {
        await this.page.goto("https://ae-beta.wegostaging.com/en", { waitUntil: 'networkidle' }); // Navigate to URL and wait for network to be idle
        await this.page.waitForTimeout(15000); // Wait for 15 seconds (equivalent to browser.sleep)
    }

    // Generic wait function
    async wait(milliseconds) {
        await this.page.waitForTimeout(milliseconds); // Wait for specified milliseconds
    }

    // Wait for 200 seconds (specific function)
    async waitForFiveSec() {
        await this.page.waitForTimeout(200000); // Wait for 200 seconds
    }

}

module.exports = new GlobalFunctions(); // Export an instance of GlobalFunctions