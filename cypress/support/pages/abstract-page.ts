import 'reflect-metadata';
import { Faker, faker } from '@faker-js/faker';
import { injectable } from 'inversify';

@injectable()
export class AbstractPage {
  PAGE_URL = '';
  protected faker: Faker;

  constructor() {
    this.faker = faker;
  }

  assertPageLocation = (): void => {
    cy.url().should('include', this.PAGE_URL);
  };
}
