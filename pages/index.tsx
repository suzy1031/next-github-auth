import { signIn, signOut, useSession } from 'next-auth/client';
import Image from 'next/image';

const Page = () => {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          {loading ? (
            <>Loading ...</>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </>
      )}
      {session && (
        <>
          Signed in as{' '}
          <Image
            alt='image'
            src={session?.user?.image ?? ''}
            width={50}
            height={50}
          />
          　{session?.user?.name} <br />
          AccessToken : {session.accessToken} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
};

export default Page;
