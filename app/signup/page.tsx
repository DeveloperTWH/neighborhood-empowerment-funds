import { Suspense } from 'react';
import SignUpPage from './SignUpPage';

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPage />
    </Suspense>
  );
}
