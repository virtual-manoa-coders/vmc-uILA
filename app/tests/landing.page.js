import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 15 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(15000).expect(this.pageSelector.exists).ok();
  }
}

export const landingPage = new LandingPage();
