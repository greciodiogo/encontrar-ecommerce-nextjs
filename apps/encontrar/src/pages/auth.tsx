import React from 'react';

import { Auth } from 'components/Auth/SignIn';
// import RecouverPassword from 'components/Auth/RecouverPassword';
// import { VerifyEmail } from 'components/Auth/VerifyEmail';
const handleCloseBtn = () => {
  return false;
};

const AuthPage = () => {
  return (
    <div>
      <Auth showAuthPainel={true} closeAuth={handleCloseBtn} />
    </div>
  );
};

export default AuthPage;
