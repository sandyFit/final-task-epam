const { pages } = require("../po/pages");

describe("Login Page", () => {
    beforeEach(async () => {
        await pages("login").open();
    });  

    /**
     * @test Perform login with empty credentials (UC-1)
     * Requirements: Enter credentials first, then clear them, then test empty login
     */
    it("UC-1: Login with Empty Credentials", async () => {
        // Step 1: Enter any credentials (as required)
        await pages("login").enterUsername("any_username");
        await pages("login").enterPassword("any_password");

        // Step 2: Verify BOTH inputs have values (as required)
        expect(await pages("login").getUsernameValue()).toBe("any_username");
        expect(await pages("login").getPasswordValue()).toBe("any_password");

        // Step 3: Clear BOTH inputs 
        await pages("login").clearUsername();
        await pages("login").clearPassword();

        // Step 4: Verify BOTH inputs are now empty
        expect(await pages("login").isUsernameInputEmpty()).toBe(true);
        expect(await pages("login").isPasswordInputEmpty()).toBe(true);

        // Step 5: Attempt login with empty credentials
        await pages("login").clickLoginButton();

        // Step 6: Verify error message is displayed
        await expect($(pages("login").selectors.errorMessage)).toBeDisplayed();

        // Step 7: Verify the correct error message
        const errorMessage = await pages("login").getErrorMessage();
        expect(errorMessage).toContain("Username is required");
    });


    /**
     * @test Perform login with username only (UC-2)
     */
    it("UC-2 Test Login form with credentials by passing Username", async () => {
        // Step 1: Enter any credentials (as required)
        await pages("login").enterUsername("any_username");
        await pages("login").enterPassword("any_password");

        // Step 2: Verify fields have values (as required)
        expect(await pages("login").getUsernameValue()).toBe("any_username");
        expect(await pages("login").getPasswordValue()).toBe("any_password");

        // Step 3: Clear the password input
        await pages("login").clearPassword();

        // Step 4: Verify the password input is now empty
        expect(await pages("login").isPasswordInputEmpty()).toBe(true);

        // Step 5: Attempt login with only username
        await pages("login").clickLoginButton();

        // Step 6: Verify error message is displayed
        const isErrorDisplayed = await pages("login").isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);

        // Step 7: Verify error contains the expected message
        const errorContainsMessage = await pages("login").errorContainsExpectedMessage("Password is required");
        expect(errorContainsMessage).toBe(true);
    });

    /**
     * @test Perform complete login with valid credentials (UC-3).
     */
    it.only("UC-3: Login with all accepted usernames and validate result", async () => {
        // Step 1: Get the accepted usernames
        const usernames = await pages("login").getAcceptedUsernames();

        for (const username of usernames) {
            await pages("login").open(); 
            console.log(`\n Testing login for user: ${username}`);

            await pages("login").login(username, "secret_sauce");

            const errorDisplayed = await pages("login").isErrorMessageDisplayed();

            if (errorDisplayed) {
                const message = await pages("login").getErrorMessage();
                console.log(`"${username}" was rejected: ${message}`);
                expect(message.length).toBeGreaterThan(0);
            } else {
                const title = await pages("dashboard").getCurrentPageTitle();
                console.log(`"${username}" successfully logged in with title: ${title}`);
                expect(title).toBe("Swag Labs");

                // Reset state 
                await browser.reloadSession();
            }
        }
      });



});
