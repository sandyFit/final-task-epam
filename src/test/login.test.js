describe("Login Page", () => {
    beforeEach(async () => {
        await browser.url("https://www.saucedemo.com/");
    });

    /**
     * @test Attempts login with empty username and password inputs.
     */
    it("UC-1: Login with Empty Credentials", async () => {
        // Wait for elements to be displayed
        await $("#user-name").waitForDisplayed();
        await $("#password").waitForDisplayed();
        await $("#login-button").waitForDisplayed();

        // Click button with empty fields
        await $("#login-button").click();

        // Verify error message appears
        const errorMessage = await $("[data-test='error']");

        // Verify error message is displayed
        await expect(errorMessage).toBeDisplayed();

        // Verify it contains the expected message
        const errorText = await errorMessage.getText();
        console.log("Actual error message:", errorText);
        expect(errorText).toContain("Username is required");
    });

    /**
     * @test Attempts login with empty password input.
     */
    it("UC-2: Login with Username Only", async () => {
        await $("#user-name").waitForDisplayed();
        await $("#password").waitForDisplayed();
        await $("#login-button").waitForDisplayed();

        await $("#user-name").setValue("standard_user");
        await $("#login-button").click();

        const errorMessage = await $("[data-test='error']");

        await expect(errorMessage).toBeDisplayed();

        const errorText = await errorMessage.getText();
        console.log("Actual error message:", errorText);
        expect(errorText).toContain("Password is required");
    });

    /**
     * @test Attempts login with valid credentials.
     */
    it("UC-3: Login with Valid Credentials", async () => {
        await $("#user-name").waitForDisplayed();
        await $("#password").waitForDisplayed();
        await $("#login-button").waitForDisplayed();

        await $("#user-name").setValue("standard_user");
        await $("#password").setValue("secret_sauce");
        await $("#login-button").click();

        await expect(browser).toHaveTitle("Swag Labs");
    });

});
