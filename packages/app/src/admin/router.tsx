import { ReactNode, createContext, useContext, useState } from "react";

export type Route = string[];

export interface RouterService {
  route: Route;
  setRoute: (route: Route) => void;
}

const RouterContext = createContext<RouterService | undefined>(undefined);

export function useRouter() {
  const router = useContext(RouterContext);

  if(router === undefined) {
    throw new Error('Please define a Router.');
  }

  return router;
}

export function Router(props: { initialRoute: Route; children?: ReactNode; }) {
  
  const [route, setRoute] = useState<Route>(props.initialRoute);

  return <RouterContext.Provider value={{ route, setRoute }}>
    {props.children}
  </RouterContext.Provider>;
}

