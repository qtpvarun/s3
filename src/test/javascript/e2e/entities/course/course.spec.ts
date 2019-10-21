import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CourseComponentsPage, { CourseDeleteDialog } from './course.page-object';
import CourseUpdatePage from './course-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Course e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let courseUpdatePage: CourseUpdatePage;
  let courseComponentsPage: CourseComponentsPage;
  let courseDeleteDialog: CourseDeleteDialog;

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

  it('should load Courses', async () => {
    await navBarPage.getEntityPage('course');
    courseComponentsPage = new CourseComponentsPage();
    expect(await courseComponentsPage.getTitle().getText()).to.match(/Courses/);
  });

  it('should load create Course page', async () => {
    await courseComponentsPage.clickOnCreateButton();
    courseUpdatePage = new CourseUpdatePage();
    expect(await courseUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Course/);
    await courseUpdatePage.cancel();
  });

  it('should create and save Courses', async () => {
    async function createCourse() {
      await courseComponentsPage.clickOnCreateButton();
      await courseUpdatePage.setNameInput('name');
      expect(await courseUpdatePage.getNameInput()).to.match(/name/);
      await courseUpdatePage.setDescriptionInput('description');
      expect(await courseUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(courseUpdatePage.getSaveButton());
      await courseUpdatePage.save();
      await waitUntilHidden(courseUpdatePage.getSaveButton());
      expect(await courseUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCourse();
    await courseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await courseComponentsPage.countDeleteButtons();
    await createCourse();

    await courseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await courseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Course', async () => {
    await courseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await courseComponentsPage.countDeleteButtons();
    await courseComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    courseDeleteDialog = new CourseDeleteDialog();
    expect(await courseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/s3App.course.delete.question/);
    await courseDeleteDialog.clickOnConfirmButton();

    await courseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await courseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
