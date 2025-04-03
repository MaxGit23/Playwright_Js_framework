class HomePage {
    constructor(page) {
        this.departureInput = page.locator("#outboundSearchQuery");
        this.destinationInput = page.locator("#inbou3ndSearchQuery");
    }
}
    module.exports = HomePage;