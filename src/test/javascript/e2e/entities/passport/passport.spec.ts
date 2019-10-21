import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PassportComponentsPage, { PassportDeleteDialog } from './passport.page-object';
import PassportUpdatePage from './passport-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Passport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let passportUpdatePage: PassportUpdatePage;
  let passportComponentsPage: PassportComponentsPage;
  let passportDeleteDialog: PassportDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Passports', async () => {
    await navBarPage.getEntityPage('passport');
    passportComponentsPage = new PassportComponentsPage();
    expect(await passportComponentsPage.getTitle().getText()).to.match(/Passports/);
  });

  it('should load create Passport page', async () => {
    await passportComponentsPage.clickOnCreateButton();
    passportUpdatePage = new PassportUpdatePage();
    expect(await passportUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Passport/);
    await passportUpdatePage.cancel();
  });

  it('should create and save Passports', async () => {
    async function createPassport() {
      await passportComponentsPage.clickOnCreateButton();
      await passportUpdatePage.setNumberInput('number');
      expect(await passportUpdatePage.getNumberInput()).to.match(/number/);
      await waitUntilDisplayed(passportUpdatePage.getSaveButton());
      await passportUpdatePage.save();
      await waitUntilHidden(passportUpdatePage.getSaveButton());
      expect(await passportUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createPassport();
    await passportComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await passportComponentsPage.countDeleteButtons();
    await createPassport();

    await passportComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await passportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Passport', async () => {
    await passportComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await passportComponentsPage.countDeleteButtons();
    await passportComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    passportDeleteDialog = new PassportDeleteDialog();
    expect(await passportDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/s3App.passport.delete.question/);
    await passportDeleteDialog.clickOnConfirmButton();

    await passportComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await passportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
