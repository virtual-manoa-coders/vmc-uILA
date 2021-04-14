import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.typeText('#signup-form-confirmPassword', password);

    const carMakeSelector = Selector('#signup-form-carMake');
    // I have no idea why this works, praise the omnissiah
    const carMakeOption = carMakeSelector.child().child();
    const carYearSelector = Selector('#signup-form-carYear');
    const carYearOption = carYearSelector.child().child();

    await testController.click(carMakeSelector);
    await testController.click(carMakeOption.nth(45));
    await testController.click(carYearSelector);
    await testController.click(carYearOption.nth(12));

    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new SignupPage();
