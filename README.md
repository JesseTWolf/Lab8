# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? 
   - (1)

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   - No, I would not use a unit test for this feature due to the fact that in order to test it properly you would need more then one "user" passing messages between each other. This would require way too many moving parts and so unit tests really shouldn't be used for this. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   - Yes, this is a great case to use a unit test since it would be a very specific function that is called and tested. For example you can easily try to put 81 characters as a test within the message and know that it should throw the error.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   - I expect that if "headless" was set to true it would not show us the browser that it is interacting with. Instead it would do so without any visual cues other then those in the command line. It having "headless" set to false is what allows us to watch the Puppeteer interacting with the site.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case? 
   - Could either put the below code after the beforeAll callback to run before each test or even embed it within the current beforeAll callback would work too.
```js
beforeEach(async () => {
    await page.goto('http://127.0.0.1:5500');  
    await page.click('header > img[alt="settings"]');  
    await page.waitForTimeout(500);  
  });
```
