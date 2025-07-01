describe("Page Title", () => {
    beforeEach(async () => {
        browser.url("https://www.saucedemo.com/")
    })
    /**
    * @test Validates the page title of the inal Test .
    */
    it("Check page title", async () => {
        const title = await browser.getTitle();
        console.log(`Page title in the browser: ${title}`)
        await expect(browser).toHaveTitle("Swag Labs");
    });

    it("Test Login form with empty username input", async () => {
        await $("#user-name").waitForDisplayed();
    })
})
