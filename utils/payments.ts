import {OrderPayment} from '../types/graphql';

export function paymentName(payment: OrderPayment): string {
  switch (payment) {
    case 'CASH':
      return 'Bar';
    case 'KULT_CARD':
      return 'KultCard';
    case 'VOUCHER':
      return 'Gutschein';
    case 'FREE_CREW':
      return 'Crew';
    case 'BON':
      return 'Bon';
    case 'SUM_UP':
      return 'SumUp';
    default:
      return payment as string;
  }
}

export function isRevenue(payment: OrderPayment): boolean {
  switch (payment) {
    case 'VOUCHER':
    case 'FREE_CREW':
    case 'FREE_BAND':
      return false;
    default:
      return true;
  }
}
