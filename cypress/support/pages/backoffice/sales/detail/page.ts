import { Repository } from './repository';
import { AbstractPage } from '../../../abstract-page';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { autoProvide } from '../../../../utils/auto-provide';

@injectable()
@autoProvide
export class Page extends AbstractPage {
  PAGE_URL = '/sales/detail';
  repository: Repository;

  constructor(@inject(Repository) repository: Repository) {
    super();
    this.repository = repository;
  }

  triggerOms = (state: string) => {
    cy.url().then((url) => {
      cy.reloadUntilFound(
        url,
        this.repository.getOmsButtonSelector(state),
        this.repository.getTriggerOmsDivSelector(),
        30,
        2000
      );

      cy.get(this.repository.getTriggerOmsDivSelector())
        .find(this.repository.getOmsButtonSelector(state))
        .click();
    });
  };

  createReturn = () => {
    this.repository.getReturnButton().click();
  };
}
