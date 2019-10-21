import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StudentComponentsPage, { StudentDeleteDialog } from './student.page-object';
import StudentUpdatePage from './student-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Student e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentUpdatePage: StudentUpdatePage;
  let studentComponentsPage: StudentComponentsPage;
  let studentDeleteDialog: StudentDeleteDialog;

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

  it('should load Students', async () => {
    await navBarPage.getEntityPage('student');
    studentComponentsPage = new StudentComponentsPage();
    expect(await studentComponentsPage.getTitle().getText()).to.match(/Students/);
  });

  it('should load create Student page', async () => {
    await studentComponentsPage.clickOnCreateButton();
    studentUpdatePage = new StudentUpdatePage();
    expect(await studentUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Student/);
    await studentUpdatePage.cancel();
  });

  it('should create and save Students', async () => {
    async function createStudent() {
      await studentComponentsPage.clickOnCreateButton();
      await studentUpdatePage.setFirstNameInput('firstName');
      expect(await studentUpdatePage.getFirstNameInput()).to.match(/firstName/);
      await studentUpdatePage.setLastNameInput('lastName');
      expect(await studentUpdatePage.getLastNameInput()).to.match(/lastName/);
      await studentUpdatePage.passportSelectLastOption();
      // studentUpdatePage.courseSelectLastOption();
      await waitUntilDisplayed(studentUpdatePage.getSaveButton());
      await studentUpdatePage.save();
      await waitUntilHidden(studentUpdatePage.getSaveButton());
      expect(await studentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createStudent();
    await studentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await studentComponentsPage.countDeleteButtons();
    await createStudent();

    await studentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Student', async () => {
    await studentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await studentComponentsPage.countDeleteButtons();
    await studentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    studentDeleteDialog = new StudentDeleteDialog();
    expect(await studentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/s3App.student.delete.question/);
    await studentDeleteDialog.clickOnConfirmButton();

    await studentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
