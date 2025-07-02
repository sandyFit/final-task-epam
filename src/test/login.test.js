const { pages } = require("../po/pages");

describe("Login Page", () => {
    beforeEach(async () => {
        await pages("login").open();
    });
    

    /**
     * @test Perform login with empty credentials (UC-1)
     */
    it.only("UC-1: Login with Empty Credentials", async () => {
        // Clear inputs
        await pages("login").clearAllInputs();

        // Verify the inputs are empty
        const isUsernameEmpty = await pages("login").isUsernameInputEmpty();
        const isPasswordEmpty = await pages("login").isPasswordInputEmpty();

        expect(isUsernameEmpty).toBe(true);
        expect(isPasswordEmpty).toBe(true);

        // Attempt login
        await pages("login").clickLoginButton();

        // Verify error message is displayed
        const isErrorDisplayed = await pages("login").isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);

        // Verify error contains the expected message
        const errorContainsMessage = await pages("login").errorContainsExpectedMessage("Username is required");
        expect(errorContainsMessage).toBe(true);
    });

    /**
     * @test Perform login with username only (UC-2)
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
     * @test Perform complete login with valid credentials (UC-3).
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
