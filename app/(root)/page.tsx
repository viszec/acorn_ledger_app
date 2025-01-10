import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export const runtime = 'edge';
export const preferredRegion = 'auto';

const Home = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;
  const currentPage = Number(params?.page as string) || 1;
  const appwriteItemId = (params?.id as string);

  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id
  });

  if (!accounts?.data?.length) return null;

  const accountsData = accounts.data;
  const selectedId = appwriteItemId || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId: selectedId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions as Transaction[]}
          appwriteItemId={selectedId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions as Transaction[]}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home
