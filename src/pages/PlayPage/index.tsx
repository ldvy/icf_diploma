import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../components/Play/Header';
import Login from '../../components/Play/Login';
import Registration from '../../components/Play/Registration';
import Main from '../../components/Play/Main';

import Message from '../../components/Play/Message';
import Loading from '../../components/Play/Loading';

import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const PlayPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const isNewUser = useSelector((state: RootState) => state.user.isNewUser);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isNewMessage = useSelector(
    (state: RootState) => state.user.isNewMessage
  );

  return (
    <>
      <Helmet>
        <title>Play</title>
      </Helmet>
      <Login show={!isLoggedIn} />

      <Registration show={isNewUser && isLoggedIn} />
      {isLoggedIn && !isNewUser && (
        <>
          <Header />
          <Main />
        </>
      )}
      {isLoading && <Loading />}
      {isNewMessage && <Message />}
    </>
  );
};

export default PlayPage;
