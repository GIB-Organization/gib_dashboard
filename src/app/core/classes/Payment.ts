import { EPaymentsTypes } from "../enums";

export class Payments{
    logoUrls = {
        [EPaymentsTypes.mada] : 'payment/mada.png',
        [EPaymentsTypes.master] : 'payment/mastercard.svg',
        [EPaymentsTypes.visa] : 'payment/visa.svg',
    }
    getLogoUrl(paymentMethod: EPaymentsTypes): string {
        return this.logoUrls[paymentMethod];
    }
}