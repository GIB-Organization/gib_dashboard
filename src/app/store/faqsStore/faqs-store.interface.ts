import { IFaq } from "../../models";

export interface IFaqsStore{
  faqs: IFaq[],
  faqsCount: number,
  isProcessing?:boolean,
  faq?: IFaq,
  isExporting:boolean
}