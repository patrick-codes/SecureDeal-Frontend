import { FaqItem, NotificationItem, TransactionItem } from '../types'

export const trustIndicators = [
  'Secure transactions',
  'Buyer protection',
  'Seller protection',
  'Dispute resolution',
]

export const faqItems: FaqItem[] = [
  { question: 'What is SafeTra?', answer: 'SafeTra is a trust-first escrow platform that protects both buyers and sellers by holding funds until the agreed delivery is complete.' },
  { question: 'How does escrow work?', answer: 'The buyer pays into a protected wallet managed by SafeTra. The seller delivers the item and the buyer confirms. Only then are funds released.' },
  { question: 'When does the seller receive money?', answer: 'The seller receives the money only after the buyer confirms successful delivery or the dispute is resolved in their favour.' },
  { question: 'What happens if the item isn’t delivered?', answer: 'The buyer can open a dispute and SafeTra reviews the transaction, documents, and delivery status before deciding on a resolution.' },
  { question: 'What happens if the item is different from what was agreed?', answer: 'This is a common dispute scenario. The affected party can submit evidence and SafeTra will mediate a fair outcome.' },
  { question: 'Can I cancel a transaction?', answer: 'Yes, if the transaction has not been secured or if both parties agree. Once funds are protected, cancellation requires review.' },
  { question: 'How long does a transaction take?', answer: 'Most transactions move quickly, but the inspection period can range from 12 to 72 hours depending on the chosen review window.' },
  { question: 'How are disputes handled?', answer: 'Disputes are reviewed by SafeTra support teams, with evidence and transaction history used to make a neutral decision.' },
  { question: 'What are the fees?', answer: 'Fees vary by transaction size and plan. Typical examples are 0.5% buyer / 0.5% seller for basic transactions.' },
  { question: 'Do I need an account?', answer: 'A buyer can review a deal and pay securely without a full account, but an account helps manage tracking and dispute communication.' },
  { question: 'Is SafeTra available in Ghana?', answer: 'Yes. SafeTra is designed for Ghanaian transactions and supports country-relevant payment rails and local business patterns.' },
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
