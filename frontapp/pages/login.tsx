import { GetServerSideProps } from "next";

import { signIn, getSession } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <div>you are not signed in</div>

      <button onClick={() => signIn()}>Entrar</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
