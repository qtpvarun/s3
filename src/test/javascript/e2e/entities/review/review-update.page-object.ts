import { element, by, ElementFinder } from 'protractor';

export default class ReviewUpdatePage {
  pageTitle: ElementFinder = element(by.id('s3App.review.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  ratingInput: ElementFinder = element(by.css('input#review-rating'));
  subjectInput: ElementFinder = element(by.css('input#review-subject'));
  descriptionInput: ElementFinder = element(by.css('input#review-description'));
  courseSelect: ElementFinder = element(by.css('select#review-course'));
  studentSelect: ElementFinder = element(by.css('select#review-student'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRatingInput(rating) {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput() {
    return this.ratingInput.getAttribute('value');
  }

  async setSubjectInput(subject) {
    await this.subjectInput.sendKeys(subject);
  }

  async getSubjectInput() {
    return this.subjectInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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

  async studentSelectLastOption() {
    await this.studentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async studentSelectOption(option) {
    await this.studentSelect.sendKeys(option);
  }

  getStudentSelect() {
    return this.studentSelect;
  }

  async getStudentSelectedOption() {
    return this.studentSelect.element(by.css('option:checked')).getText();
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
