import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReviewComponentsPage, { ReviewDeleteDialog } from './review.page-object';
import ReviewUpdatePage from './review-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Review e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reviewUpdatePage: ReviewUpdatePage;
  let reviewComponentsPage: ReviewComponentsPage;
  let reviewDeleteDialog: ReviewDeleteDialog;

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

  it('should load Reviews', async () => {
    await navBarPage.getEntityPage('review');
    reviewComponentsPage = new ReviewComponentsPage();
    expect(await reviewComponentsPage.getTitle().getText()).to.match(/Reviews/);
  });

  it('should load create Review page', async () => {
    await reviewComponentsPage.clickOnCreateButton();
    reviewUpdatePage = new ReviewUpdatePage();
    expect(await reviewUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Review/);
    await reviewUpdatePage.cancel();
  });

  it('should create and save Reviews', async () => {
    async function createReview() {
      await reviewComponentsPage.clickOnCreateButton();
      await reviewUpdatePage.setRatingInput('5');
      expect(await reviewUpdatePage.getRatingInput()).to.eq('5');
      await reviewUpdatePage.setSubjectInput('subject');
      expect(await reviewUpdatePage.getSubjectInput()).to.match(/subject/);
      await reviewUpdatePage.setDescriptionInput('description');
      expect(await reviewUpdatePage.getDescriptionInput()).to.match(/description/);
      await reviewUpdatePage.courseSelectLastOption();
      await reviewUpdatePage.studentSelectLastOption();
      await waitUntilDisplayed(reviewUpdatePage.getSaveButton());
      await reviewUpdatePage.save();
      await waitUntilHidden(reviewUpdatePage.getSaveButton());
      expect(await reviewUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createReview();
    await reviewComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await reviewComponentsPage.countDeleteButtons();
    await createReview();

    await reviewComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await reviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Review', async () => {
    await reviewComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await reviewComponentsPage.countDeleteButtons();
    await reviewComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    reviewDeleteDialog = new ReviewDeleteDialog();
    expect(await reviewDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/s3App.review.delete.question/);
    await reviewDeleteDialog.clickOnConfirmButton();

    await reviewComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await reviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
