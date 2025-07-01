# Test Automation with JavaScript - Final Task 

## Overview
This project automates login functionality testing on [SauceDemo](https://www.saucedemo.com/) using **WebDriverIO v9** and JavaScript. It covers core login scenarios and follows modern test automation practices using the Page Object Model.

---

## Test Scenarios

### UC-1: Login with Empty Credentials
- **Objective**: Validate error message when both fields are empty
- **Steps**:
  1. Go to [SauceDemo](https://www.saucedemo.com/)
  2. Enter credentials and clear them
  3. Click Login
  4. Expect error: `"Username is required"`

### UC-2: Login with Username Only
- **Objective**: Validate error when password is missing
- **Steps**:
  1. Enter valid username
  2. Clear the password
  3. Click Login
  4. Expect error: `"Password is required"`

### UC-3: Login with Valid Credentials
- **Objective**: Ensure login succeeds with correct credentials
- **Steps**:
  1. Enter valid username from the accepted list
  2. Enter `"secret_sauce"` as password
  3. Click Login
  4. Expect dashboard title: `"Swag Labs"`

---

## Technical Implementation

- **Framework**: WebDriverIO v9
- **Language**: JavaScript (CommonJS)
- **Test Pattern**: Page Object Model (POM)
- **Browser Support**: Chrome and Edge
- **Assertions**: WebDriverIO’s built-in `expect`
- **Logging**: WDIO built-in logger with custom logger utility
- **Data**: External test data via a simple Data Provider pattern

---

## Project Structure
```plaintext
├── src/
│ ├── config/
│ │ └── wdio.conf.js
│ ├── pages/
│ │ ├── basePage.js
│ │ ├── loginPage.js
│ │ └── dashboardPage.js
│ ├── data/
│ │ └── testData.js
│ ├── test/
│ │ └── login.test.js
│ └── utils/
│ └── logger.js
├── package.json
└── README.md


---

## How to Run Tests

### Prerequisites
- Node.js v16+  
- Chrome browser installed and in PATH

### NPM Scripts

```json
"scripts": {
  "wdio": "wdio run src/config/wdio.conf.js"
}
```

### Install Dependencies
```bash
npm install
```

### Run all tests (default config)
```bash
npm run wdio
```


## Test Credentials

**Valid usernames:**

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

**Password:** `secret_sauce`

---

## Logging & Reporting

- Test logs via WebDriverIO and custom logger
- Screenshots captured on failure (if implemented)
- Console output (default)
- HTML and JSON reports can be added later for CI/CD

---

## Best Practices Used

- Page Object Pattern for maintainability  
- Clear separation of test logic and selectors  
- Data-driven testing using external data files  
- DRY principles for reusability  
- Clean, modular structure for scalability

---

## Troubleshooting Tips

| Issue                    | Solution                                              |
|--------------------------|-------------------------------------------------------|
| Browser won't launch     | Ensure Chrome and Edge are installed and matches the driver    |
| Element not found        | Verify CSS selectors and element wait conditions     |
| Test too slow or fails   | Increase timeout values in `wdio.conf.js`            |
| Edge not supported       | Add Selenium Standalone and Edge capabilities        |

---


