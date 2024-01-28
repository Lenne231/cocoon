
import { Tree } from 'core';
import { Navigation } from './Navigation/Navigation';
import { TreeApi} from './apis';
import { Outlet } from 'react-router';

export interface Props {
  api: TreeApi<Tree>;
  appOrigin: string;
}

export function App({ api, appOrigin }: Props) {

  return <>
      <div className='flex flex-row h-dvh'>
        <div className='p-6 bg-gray-200'>
          <Navigation api={api} />
        </div>
        <div className='p-6 bg-gray-100'>
          <Outlet />
        </div>
        <iframe className='flex-grow' src={appOrigin} />
      </div>
  </>;
}
