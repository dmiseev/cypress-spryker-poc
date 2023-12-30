import { injectable } from 'inversify';
import 'reflect-metadata';
import { YvesMultiCartRepository } from '../yves-multi-cart-repository';

@injectable()
export class B2bYvesMultiCartRepository implements YvesMultiCartRepository {
  getCreateCartNameInput = (): Cypress.Chainable => {
    return cy.get('#quoteForm_name');
  };

  getCreateCartForm = (): Cypress.Chainable => {
    return cy.get('form[name=quoteForm]');
  };
}