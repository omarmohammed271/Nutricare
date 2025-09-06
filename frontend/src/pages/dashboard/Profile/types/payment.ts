export interface CardData {
  cardNumber: string;
  expiration: string;
  cvc: string;
  country: string;
}

export interface BankAccountData {
  accountHolderName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  country: string;
}

export interface PaymentData {
  card: CardData;
  bank: BankAccountData;
}

export type PaymentMethod = 'card' | 'bank' | 'google';