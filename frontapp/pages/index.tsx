import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, signOut, useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface HomePageProps {
  users: User[];
}

function Home({ users }: HomePageProps) {
  const { data: session } = useSession();

  return (
    <div>
      <h3>{session?.user?.name}</h3>
      <h3>{session?.user?.email}</h3>

      <h4>List Users</h4>

      <ul>
        {users.length > 0 &&
          users?.map((user) => (
            <div key={user.id}>
              <li>{user.id}</li>
              <li>{user.name}</li>
              <li>{user.email}</li>

              <div>------------------</div>
            </div>
          ))}
      </ul>

      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { accessToken } = session;

  try {
    const response = await axios.post(
      `${process.env.API_URL}`,
      {
        query: `query {
        users {
          id
          name
          email
        }
      }`,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const {
      data: { users },
    } = response.data;

    return {
      props: {
        users,
      },
    };
  } catch (err) {
    return {
      props: {
        users: [],
      },
    };
  }
};
