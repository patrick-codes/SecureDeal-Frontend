export type TransactionStatus =
  | 'Funds Secured'
  | 'Delivered'
  | 'Disputed'
  | 'Pending'
  | 'Completed'
  | 'Under Review'
  | 'Active'
  | 'Cancelled'

export type UserRole = 'Buyer' | 'Seller'

export interface TransactionItem {
  id: string
  product: string
  amount: number
  role: UserRole
  status: TransactionStatus
  counterparty: string
  date: string
  category?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface AlertItem {
  title: string
  detail: string
  time: string
}

export interface NotificationItem {
  title: string
  detail: string
  time: string
}
