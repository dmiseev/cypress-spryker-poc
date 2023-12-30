import { injectable } from 'inversify';
import { autoProvide } from '../../../../utils/inversify/auto-provide';
import 'reflect-metadata';

@injectable()
@autoProvide
export class BackofficeSalesDetailRepository {
  getTriggerOmsDivSelector = (): string => {
    return '.col-md-12 > .row > .col-lg-12 > .ibox > .ibox-content';
  };

  getOmsButtonSelector = (action: string): string => {
    return `button:contains("${action}")`;
  };

  getReturnButton = (): Cypress.Chainable => {
    return cy.get('.title-action').find('a:contains("Return")');
  };
}