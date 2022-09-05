import { Route, Routes } from 'react-router-dom';
import { RouteMap } from './route-map';
import { SignInPage } from './sign-in';

const Main: React.FC<any> = () => {
  return (
    <Routes>
      <Route path={RouteMap.signIn.path} element={<SignInPage />} />
    </Routes>
  );
};

export default Main;
