import { FaqItem, NotificationItem, TransactionItem } from '../types'

export const trustIndicators = [
  'Secure transactions',
  'Buyer protection',
  'Seller protection',
  'Dispute resolution',
]

export const faqItems: FaqItem[] = [
  { question: 'What is SafeTra?', answer: 'SafeTra is designed to help buyers and sellers agree on transaction terms, follow payment and delivery milestones, and use a structured dispute workflow. This frontend is a mock prototype and does not process transactions.' },
  { question: 'How does escrow work?', answer: 'The intended production workflow records payment verification, escrow state, delivery and settlement separately. The backend and payment provider are authoritative; this prototype does not hold funds.' },
  { question: 'When does the seller receive money?', answer: 'Buyer confirmation can trigger a settlement workflow according to platform rules. A completed trade does not itself prove a payout succeeded; settlement status is tracked separately.' },
  { question: 'What happens if the item isn’t delivered?', answer: 'Eligible users can open a dispute. Normal release actions are interrupted while the case follows its review workflow. A refund is not automatic or guaranteed.' },
  { question: 'What happens if the item is different from what was agreed?', answer: 'This is a common dispute scenario. The affected party can submit evidence and SafeTra will mediate a fair outcome.' },
  { question: 'Can I cancel a transaction?', answer: 'Cancellation availability depends on the current transaction state and backend rules. The prototype only exposes transitions defined by the backend state machine.' },
  { question: 'How long does a transaction take?', answer: 'The buyer and seller can agree an inspection period. The backend default is 24 hours and supports a configurable period up to 720 hours.' },
  { question: 'How are disputes handled?', answer: 'Disputes are reviewed by SafeTra support teams, with evidence and transaction history used to make a neutral decision.' },
  { question: 'What are the fees?', answer: 'The backend defaults are 0.5% for the buyer and 0.5% for the seller. Fees are configured server-side and may vary by deployment; prototype fee figures are examples only.' },
  { question: 'Do I need an account?', answer: 'The current backend transaction and payment routes require authentication. Invitation access and any guest flow must be confirmed with product owners before integration.' },
  { question: 'Is SafeTra available in Ghana?', answer: 'The backend uses GHS amounts and validates Ghana Mobile Money payout details. This prototype uses mock data only.' },
  { question: 'How do I become a verified seller?', answer: 'Verified sellers complete identity checks, profile verification, and transaction history review before eligibility is granted.' },
]

export const recentTransactions: TransactionItem[] = [
  { id: 'SD-83921', product: 'iPhone 15 Pro', amount: 12000, role: 'Buyer', status: 'Funds Secured', counterparty: 'Kwame Asante', date: 'Today' },
  { id: 'SD-77290', product: 'MacBook Air M3', amount: 9500, role: 'Seller', status: 'Delivered', counterparty: 'Ama Boateng', date: 'Yesterday' },
  { id: 'SD-66831', product: 'Sony A7 IV Camera', amount: 18000, role: 'Buyer', status: 'Disputed', counterparty: 'Michael Owusu', date: '2 days ago' },
  { id: 'SD-55211', product: 'Samsung S24 Ultra', amount: 11500, role: 'Seller', status: 'Completed', counterparty: 'Akosua Mensima', date: '4 days ago' },
]

export const dashboardStats = [
  { label: 'Active Transactions', value: '12', change: '+3 this week' },
  { label: 'Completed', value: '48', change: '+12 this month' },
  { label: 'Pending', value: '7', change: '2 due today' },
  { label: 'Disputed', value: '2', change: '1 awaiting review' },
]

export const notifications: NotificationItem[] = [
  { title: 'Buyer has secured payment for iPhone 15.', detail: 'Payment protection is active and waiting for delivery.', time: '2 min ago' },
  { title: 'Seller marked your item as shipped.', detail: 'Tracking details are now visible in your transaction.', time: '1 hour ago' },
  { title: 'Your transaction is ready for confirmation.', detail: 'Please review the delivery and confirm completion.', time: '3 hours ago' },
  { title: 'Dispute opened on transaction #SD-92831.', detail: 'SafeTra support has started a review.', time: '1 day ago' },
]

export const adminMetrics = [
  { label: 'Total Transaction Volume', value: 'GH₵ 46.8M' },
  { label: 'Active Escrow', value: 'GH₵ 8.4M' },
  { label: 'Completed Transactions', value: '12,349' },
  { label: 'Disputed Transactions', value: '214' },
  { label: 'Platform Revenue', value: 'GH₵ 2.3M' },
]

export const disputeReasons = [
  'Item not received',
  'Wrong item',
  'Damaged item',
  'Item significantly different',
  'Seller didn’t ship',
  'Other',
]
