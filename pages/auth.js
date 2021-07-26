import AuthForm from '../components/auth/auth-form';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const router = useRouter();

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/');
      } else {
        setisLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}
