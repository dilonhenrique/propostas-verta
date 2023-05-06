import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import authService from "./authService";

export default function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      
      const newCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        }
      }
      return funcao(newCtx);
    } catch (erro) {
      return {
        redirect: {
          permanent: false,
          destination: '/login?error=401'
        }
      }
    }
  }
}

export function useSession() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    authService.getSession()
      .then(session => {
        setSession(session)
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    data: { session }, error, loading,
  }
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const session = useSession();

    if (!session.loading && session.error) {
      router.push('/login?error=401')
    }

    const newProps = {
      ...props,
      session: session.data.session
    }

    return (
      <>
        {!session.loading && !session.error &&
          <Component {...newProps} />
        }
      </>
    )
  }
}