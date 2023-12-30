import { container } from '../../support/utils/inversify/inversify.config';
import { MpLoginPage } from '../../support/pages/mp/login/mp-login-page';
import { MpAgentLoginPage } from '../../support/pages/mp/agent-login/mp-agent-login-page';
import { MpDashboardPage } from '../../support/pages/mp/dashboard/mp-dashboard-page';
import { MpAgentDashboardPage } from '../../support/pages/mp/agent-dashboard/mp-agent-dashboard-page';
import { BackofficeLoginPage } from '../../support/pages/backoffice/login/backoffice-login-page';
import { BackofficeIndexPage } from '../../support/pages/backoffice/index/backoffice-index-page';
import { YvesAgentLoginPage } from '../../support/pages/yves/agent-login/yves-agent-login-page';
import { YvesLoginPage } from '../../support/pages/yves/login/yves-login-page';

describe('merchant portal agent login', (): void => {
  let fixtures: MerchantPortalAgentLoginFixtures;

  let mpLoginPage: MpLoginPage;
  let mpDashboardPage: MpDashboardPage;
  let mpAgentLoginPage: MpAgentLoginPage;
  let mpAgentDashboardPage: MpAgentDashboardPage;
  let backofficeLoginPage: BackofficeLoginPage;
  let backofficeIndexPage: BackofficeIndexPage;
  let yvesAgentLoginPage: YvesAgentLoginPage;
  let yvesLoginPage: YvesLoginPage;

  before((): void => {
    fixtures = Cypress.env('fixtures');

    mpLoginPage = container.get(MpLoginPage);
    mpDashboardPage = container.get(MpDashboardPage);
    mpAgentLoginPage = container.get(MpAgentLoginPage);
    mpAgentDashboardPage = container.get(MpAgentDashboardPage);
    backofficeLoginPage = container.get(BackofficeLoginPage);
    backofficeIndexPage = container.get(BackofficeIndexPage);
    yvesAgentLoginPage = container.get(YvesAgentLoginPage);
    yvesLoginPage = container.get(YvesLoginPage);
  });

  it('agent (customer) should not be able to login to MP dashboard [@merchant-agent-assist]', (): void => {
    cy.resetMerchantPortalCookies();
    cy.visitMerchantPortal(mpLoginPage.PAGE_URL);

    mpLoginPage.login(fixtures.customerAgentUser);
    mpLoginPage.assertFailedAuthentication();
  });

  it('agent (merchant user) should not be able to login to MP dashboard [@merchant-agent-assist]', (): void => {
    cy.resetMerchantPortalCookies();
    cy.visitMerchantPortal(mpLoginPage.PAGE_URL);

    mpLoginPage.login(fixtures.merchantAgentUser);
    mpLoginPage.assertFailedAuthentication();
  });

  it('merchant user should not be able to login to MP dashboard [@merchant-agent-assist]', (): void => {
    cy.resetMerchantPortalCookies();
    cy.visitMerchantPortal(mpLoginPage.PAGE_URL);

    mpLoginPage.login(fixtures.merchantUser);

    mpLoginPage.assertSuccessfulAuthentication();
    mpDashboardPage.assertPageLocation();
  });

  it('agent (customer) should not be able to login to MP agent dashboard [@merchant-agent-assist]', (): void => {
    cy.resetMerchantPortalCookies();
    cy.visitMerchantPortal(mpAgentLoginPage.PAGE_URL);

    mpAgentLoginPage.login(fixtures.customerAgentUser);
    mpAgentLoginPage.assertFailedAuthentication();
  });

  it('merchant user should not be able to login to MP agent dashboard [@merchant-agent-assist]', (): void => {
    cy.resetMerchantPortalCookies();
    cy.visitMerchantPortal(mpAgentLoginPage.PAGE_URL);

    mpAgentLoginPage.login(fixtures.merchantUser);
    mpAgentLoginPage.assertFailedAuthentication();
  });

  it('agent (merchant user) should be able to login to MP agent dashboard [@merchant-agent-assist]', (): void => {
    cy.resetMerchantPortalCookies();
    cy.visitMerchantPortal(mpAgentLoginPage.PAGE_URL);

    mpAgentLoginPage.login(fixtures.merchantAgentUser);
    mpAgentDashboardPage.assertPageLocation();
  });

  it('agent (merchant user) should be able to login to MP agent dashboard [@merchant-agent-assist]', (): void => {
    cy.resetMerchantPortalCookies();
    cy.visitMerchantPortal(mpAgentLoginPage.PAGE_URL);

    cy.contains('Agent Assist Login');
    cy.get('body').contains('Forgot password').should('not.exist');
    mpAgentLoginPage.login(fixtures.merchantAgentUser);

    mpAgentDashboardPage.assertPageLocation();
  });

  it('agent (customer) should be able to login to backoffice [@merchant-agent-assist]', (): void => {
    cy.resetBackofficeCookies();
    cy.visitBackoffice(backofficeLoginPage.PAGE_URL);

    backofficeLoginPage.login(fixtures.customerAgentUser);
    backofficeIndexPage.assertPageLocation();
  });

  it('agent (merchant user) should be able to login to backoffice [@merchant-agent-assist]', (): void => {
    cy.resetBackofficeCookies();
    cy.visitBackoffice(backofficeLoginPage.PAGE_URL);

    backofficeLoginPage.login(fixtures.merchantAgentUser);

    backofficeIndexPage.assertPageLocation();
  });

  it('agent (merchant user) should not be able to login to storefront agent dashboard [@merchant-agent-assist]', (): void => {
    cy.resetYvesCookies();
    cy.visit(yvesAgentLoginPage.PAGE_URL);

    yvesAgentLoginPage.login(fixtures.merchantAgentUser);
    yvesAgentLoginPage.assertFailedAuthentication();
  });

  it('merchant user should not be able to login to storefront agent dashboard [@merchant-agent-assist]', (): void => {
    cy.resetYvesCookies();
    cy.visit(yvesAgentLoginPage.PAGE_URL);

    yvesAgentLoginPage.login(fixtures.merchantUser);
    yvesAgentLoginPage.assertFailedAuthentication();
  });

  it('agent (merchant user) should not be able to login to storefront [@merchant-agent-assist]', (): void => {
    cy.resetYvesCookies();
    cy.visit(yvesLoginPage.PAGE_URL);

    const customer: Customer = {
      email: fixtures.merchantAgentUser.username,
      password: fixtures.merchantAgentUser.password,
    };

    yvesLoginPage.login(customer);
    yvesLoginPage.assertFailedAuthentication();
  });

  it('agent (customer) should not be able to login to storefront [@merchant-agent-assist]', (): void => {
    cy.resetYvesCookies();
    cy.visit(yvesLoginPage.PAGE_URL);

    const customer: Customer = {
      email: fixtures.customerAgentUser.username,
      password: fixtures.customerAgentUser.password,
    };

    yvesLoginPage.login(customer);
    yvesLoginPage.assertFailedAuthentication();
  });

  it('merchant user should not be able to login to storefront [@merchant-agent-assist]', (): void => {
    cy.resetYvesCookies();
    cy.visit(yvesLoginPage.PAGE_URL);

    const customer: Customer = {
      email: fixtures.merchantUser.username,
      password: fixtures.merchantUser.password,
    };

    yvesLoginPage.login(customer);
    yvesLoginPage.assertFailedAuthentication();
  });
});