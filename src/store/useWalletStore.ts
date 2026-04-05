import { create } from 'zustand';
import { Transaction, Ticket } from '../types/models';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_001',
    type: 'topup',
    amount: 5000,
    currency: 'SAR',
    description: 'Wallet top-up via Visa',
    date: '2026-04-04T14:30:00Z',
    category: 'top-up',
    merchantLogo: 'https://img.icons8.com/color/48/visa.png',
  },
  {
    id: 'txn_002',
    type: 'payment',
    amount: -350,
    currency: 'SAR',
    description: 'Al Baik Restaurant',
    date: '2026-04-04T19:15:00Z',
    category: 'dining',
    merchantLogo: 'https://img.icons8.com/color/48/restaurant.png',
  },
  {
    id: 'txn_003',
    type: 'payment',
    amount: -220,
    currency: 'SAR',
    description: 'Boulevard Riyadh City Tickets',
    date: '2026-04-03T10:00:00Z',
    category: 'entertainment',
    merchantLogo: 'https://img.icons8.com/color/48/ticket.png',
  },
  {
    id: 'txn_004',
    type: 'exchange',
    amount: -1500,
    currency: 'SAR',
    description: 'Currency Exchange — 400 USD',
    date: '2026-04-02T11:45:00Z',
    category: 'exchange',
    merchantLogo: 'https://img.icons8.com/color/48/exchange.png',
  },
  {
    id: 'txn_005',
    type: 'payment',
    amount: -180,
    currency: 'SAR',
    description: 'Uber Rides',
    date: '2026-04-01T08:20:00Z',
    category: 'transport',
    merchantLogo: 'https://img.icons8.com/color/48/uber.png',
  },
  {
    id: 'txn_006',
    type: 'refund',
    amount: 75,
    currency: 'SAR',
    description: 'Refund — Museum ticket cancellation',
    date: '2026-03-31T16:00:00Z',
    category: 'refund',
    merchantLogo: 'https://img.icons8.com/color/48/refund.png',
  },
];

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'tkt_001',
    eventName: 'Boulevard Riyadh City',
    venue: 'Boulevard Riyadh City',
    date: '2026-04-10T18:00:00Z',
    ticketType: 'VIP',
    qrCode: 'BRC-2026-VIP-0042',
    status: 'active',
  },
  {
    id: 'tkt_002',
    eventName: 'Diriyah E-Prix',
    venue: 'Diriyah Circuit',
    date: '2026-03-28T15:00:00Z',
    ticketType: 'Grandstand',
    qrCode: 'DEP-2026-GS-1178',
    status: 'used',
  },
];

interface WalletState {
  balance: number;
  currency: string;
  transactions: Transaction[];
  tickets: Ticket[];
  addTransaction: (transaction: Transaction) => void;
  deductBalance: (amount: number) => void;
  addTicket: (ticket: Ticket) => void;
  getRecentTransactions: (count?: number) => Transaction[];
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 5000,
  currency: 'SAR',
  transactions: INITIAL_TRANSACTIONS,
  tickets: INITIAL_TICKETS,

  addTransaction: (transaction: Transaction) => {
    set((state) => ({
      transactions: [transaction, ...state.transactions],
      balance: state.balance + transaction.amount,
    }));
  },

  deductBalance: (amount: number) => {
    set((state) => ({
      balance: state.balance - amount,
    }));
  },

  addTicket: (ticket: Ticket) => {
    set((state) => ({
      tickets: [ticket, ...state.tickets],
    }));
  },

  getRecentTransactions: (count: number = 5) => {
    const { transactions } = get();
    return transactions
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  },
}));
