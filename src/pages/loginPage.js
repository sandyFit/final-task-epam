const BasePage = require("./basePage");

class LoginPage extends BasePage {
    constructor() {
        super("https://www.saucedemo.com/");
        this.selectors = {
            usernameInput: "#user-name",
            passwordInput: "#password",
            loginButton: "#login-button",
            errorMessage: "[data-test='error']",
            credentialsContainer: "#login_credentials",
            passwordContainer: ".login_password"
        };
    }

    /**
     * Enter username in the username input
     * @param {*} username 
     */
    enterUsername(username) {
        console.log(`Username: ${username}`);
        $(this.selectors.usernameInput).setValue(username);
    };

    /**
     * Enter password in the password input
     * @param {*} password 
     */
    enterPassword(password) {
        console.log(`Password: ${password}`);
        $(this.selectors.passwordInput).setValue(password);
    }

    /**
     * Click the login button
     */
    clickLogin() {
        $(this.selectors.loginButton).click();
    }

    /**
     * Clear the username input
     */
    clearUsername() {
        $(this.selectors.usernameInput).clearValue();
    }

    /**
     * Clear the password input
     */
    clearPassword() {
        $(this.selectors.passwordInput).clearValue();
    }

    /**
     * Clear all inputs
     */
    clearAllInputs() {
        this.clearUsername();
        this.clearPassword();
    }

    /**
     * Get the current error message text
     * @returns {string} Error message shown below the form
     */
    getErrorMessage() {
        const errorMessage = $(this.selectors.errorMessage).getText();
        console.log(`Error message: "${errorMessage}"`);
        return errorMessage;
    };

    /**
     * Check if error message is displayed
     * @returns {boolean} - True if error message is displayed
     */
    isErrorMessageDisplayed() {
        const isDisplayed = $(this.selectors.errorMessage).isDisplayed();
        console.log(`Error message displayed: ${isDisplayed}`)
        return isDisplayed
    }

    /**
     * Get available usernames from the page (for reference)
     * @returns {string[]} - Array of accepted usernames
     */
    getAcceptedUsernames() {
        try {
            const credentialsText = $(this.selectors.credentialsContainer).getText();
            console.log('Available usernames retrieved from page')
            return credentialsText.split('\n').filter(line => line && !line.includes('Accepted'))
        } catch (error) {
            console.log('⚠️ Could not retrieve usernames from page, using default list')
            return ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user']
        }
    }

    /**
     * Perform complete login action
     * @param {string|null} username - Username to use for login
     * @param {string|null} password - Password to use for login
     */
    login(username, password) {
        if (username !== null) this.enterUsername(username);
        if (password !== null) this.enterPassword(password);
        this.clickLogin();
    }
}

module.exports = new LoginPage();
