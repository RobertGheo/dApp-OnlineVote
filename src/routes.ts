import { dAppName } from 'config';
import VoteDone from 'pages/AlreadyVote';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import RegisterInfo from './pages/RegisterID';
import Transaction from './pages/Transaction';
import UnlockRoute from './pages/UnlockPage';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  registerId: '/registerid',
  votedSuccessful: '/voted-successful'
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.unlock,
    title: 'UnlockRoute',
    component: UnlockRoute
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  },
  {
    path: routeNames.registerId,
    title: 'RegisterID',
    component: RegisterInfo
  },
  {
    path: routeNames.votedSuccessful,
    title: 'Voted Successful',
    component: VoteDone
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
