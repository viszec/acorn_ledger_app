# Acorn Ledger

A modern banking platform built with Next.js that provides secure financial management capabilities.

## Features

- 🏦 Multiple Bank Account Management
- 💸 Real-time Transaction Tracking
- 📊 Financial Analytics Dashboard
- 🔄 Secure Fund Transfers
- 🔐 Plaid Integration for Bank Connections
- 💳 Bank Card Management
- 📱 Responsive Design

## Tech Stack

- **Framework:** Next.js 14
- **Authentication:** Appwrite
- **Styling:** Tailwind CSS
- **Banking Integration:** Plaid API
- **Payment Processing:** Dwolla
- **Charts:** Chart.js
- **Forms:** React Hook Form + Zod
- **UI Components:** Radix UI
- **Monitoring:** Sentry
- **Type Safety:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm/bun
- Appwrite account
- Plaid developer account
- Dwolla developer account
- Sentry account (optional)

### Environment Variables

Create a `.env` file in the root directory with the following variables:


### Installation

1. Clone the repository:
2. Install dependencies:
3. Run the development server:
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
Acorn Ledger APP/
├── app/                # Next.js app directory
│   ├── (root)/         # Root layout and pages
│   └── globals.css     # Global styles
├── components/         # React components
├── lib/                # Utility functions and API clients
│   ├── actions/        # Server actions
│   ├── utils.ts        # Helper functions
│   └── plaid.ts        # Plaid configuration
├── public/             # Static assets
└── types/              # TypeScript type definitions

## Key Features Implementation

### Bank Account Integration
- Secure connection to bank accounts via Plaid
- Real-time balance updates
- Transaction history synchronization

### Transaction Management
- View detailed transaction history
- Filter transactions by category
- Search functionality
- Pagination support

### Security
- Secure authentication with Appwrite
- Encrypted data transmission
- Session management
- Error tracking with Sentry

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Deployment

The application can be easily deployed on [Vercel](https://vercel.com). For detailed deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
