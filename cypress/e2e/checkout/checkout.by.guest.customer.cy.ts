import {CartPage} from "../../support/pages/cart/cart.page";
import {CustomerPage} from "../../support/pages/checkout/customer/customer.page";
import {AddressPage} from "../../support/pages/checkout/address/address.page";
import {ShipmentPage} from "../../support/pages/checkout/shipment/shipment.page";
import {PaymentPage} from "../../support/pages/checkout/payment/payment.page";
import {SummaryPage} from "../../support/pages/checkout/summary/summary.page";

describe('Checkout By Guest Customer', () => {
    const cartPage = new CartPage();
    const customerStepPage = new CustomerPage();
    const addressStepPage = new AddressPage();
    const shipmentStepPage = new ShipmentPage();
    const paymentStepPage = new PaymentPage();
    const summaryStepPage = new SummaryPage();

    beforeEach(() => {
        cy.resetCookies();
    });

    it('should place order with one concrete product', () => {
        cy.visit(cartPage.getPageLocation());
        cartPage.quickAddToCart('169_25880805');

        cartPage.startCheckout();
        customerStepPage.checkoutAsGuest();
        addressStepPage.fillShippingAddress();
        shipmentStepPage.setStandardShippingMethod();
        paymentStepPage.setDummyPaymentMethod();
        summaryStepPage.placeOrder();

        cy.contains('Your order has been placed successfully!');
    });

    it('should place order with two concrete products to single shipment', () => {
        cy.visit(cartPage.getPageLocation());
        cartPage.quickAddToCart('169_25880805', 2);
        cartPage.quickAddToCart('156_32018944', 2);

        cartPage.startCheckout();
        customerStepPage.checkoutAsGuest();
        addressStepPage.fillShippingAddress();
        shipmentStepPage.setStandardShippingMethod();
        paymentStepPage.setDummyPaymentMethod();
        summaryStepPage.placeOrder();

        cy.contains('Your order has been placed successfully!');
    });

    it('should place order to multi shipment address', () => {
        cy.visit(cartPage.getPageLocation());
        cartPage.quickAddToCart('169_25880805', 2);
        cartPage.quickAddToCart('156_32018944', 2);

        cartPage.startCheckout();
        customerStepPage.checkoutAsGuest();
        addressStepPage.fillMultiShippingAddress();
        shipmentStepPage.setStandardShippingMethod();
        paymentStepPage.setDummyPaymentMethod();
        summaryStepPage.placeOrder();

        cy.contains('Your order has been placed successfully!');
    });
});
