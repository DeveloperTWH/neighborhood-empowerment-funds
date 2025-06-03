import { Suspense } from 'react';
import SignInPage from './SignInPage';

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
}
