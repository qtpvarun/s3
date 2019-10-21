import { element, by, ElementFinder } from 'protractor';

export default class StudentUpdatePage {
  pageTitle: ElementFinder = element(by.id('s3App.student.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#student-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#student-lastName'));
  passportSelect: ElementFinder = element(by.css('select#student-passport'));
  courseSelect: ElementFinder = element(by.css('select#student-course'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async passportSelectLastOption() {
    await this.passportSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async passportSelectOption(option) {
    await this.passportSelect.sendKeys(option);
  }

  getPassportSelect() {
    return this.passportSelect;
  }

  async getPassportSelectedOption() {
    return this.passportSelect.element(by.css('option:checked')).getText();
  }

  async courseSelectLastOption() {
    await this.courseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courseSelectOption(option) {
    await this.courseSelect.sendKeys(option);
  }

  getCourseSelect() {
    return this.courseSelect;
  }

  async getCourseSelectedOption() {
    return this.courseSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
