import { element, by, ElementFinder } from 'protractor';

export default class PassportUpdatePage {
  pageTitle: ElementFinder = element(by.id('s3App.passport.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  numberInput: ElementFinder = element(by.css('input#passport-number'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNumberInput(number) {
    await this.numberInput.sendKeys(number);
  }

  async getNumberInput() {
    return this.numberInput.getAttribute('value');
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
