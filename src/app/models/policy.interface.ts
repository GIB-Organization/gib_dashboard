import { EPaymentStatus, EPaymentsTypes } from "../core/enums";

export interface IPolicy{
    id: string,
    policyNumber: string,
    companyNameAr: string,
    companyNameEn: string,
    insuranceType: string,
    ownerName: string,
    policyValue: string,
    paymentStatus: EPaymentStatus,
    paymentMethod: EPaymentsTypes,
    policyStartDate: string
  }