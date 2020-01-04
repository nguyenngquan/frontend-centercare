import React from 'react';

const Home = React.lazy(() => import('./modules/Home'))
const Forum = React.lazy(() => import('./modules/Forum'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/forum', exact: true, name: 'Forum', component: Forum },
]

export default routes