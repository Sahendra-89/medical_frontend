export const metadata = {
  title: 'My Account | Paridhi Pharma',
  description: 'Manage your Paridhi Pharma account — view orders, prescriptions, wishlist, and delivery addresses. Fast and secure customer dashboard.',
  keywords: 'my account, order history, prescriptions, Paridhi Pharma dashboard',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'My Account | Paridhi Pharma',
    description: 'Manage your orders, prescriptions, and account details at Paridhi Pharma.',
    url: 'https://paridhipharma.com/dashboard',
    type: 'website',
  },
};

export default function DashboardLayout({ children }) {
  return children;
}
