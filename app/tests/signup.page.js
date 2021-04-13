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
    const carMakeOption = carMakeSelector.find('menu transition');
    const carYearSelector = Selector('#signup-form-carYear');
    const carYearOption = carYearSelector.find('2012');

    await testController.click(carMakeSelector);
    await testController.click(carMakeOption.withText('Toyota'));
    await testController.click(carYearSelector);
    await testController.click(carYearOption);

    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new SignupPage();
