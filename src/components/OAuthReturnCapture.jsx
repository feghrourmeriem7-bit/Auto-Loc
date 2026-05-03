import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Supabase renvoie parfois vers la Site URL (`/`) avec ?code=… si la redirect
 * exacte n’est pas acceptée, ou selon la config. On réécrit alors vers
 * `/auth/callback` pour que l’échange PKCE s’exécute au bon endroit.
 */
export default function OAuthReturnCapture() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    if (pathname === '/auth/callback') return;

    const params = new URLSearchParams(search);
    const hashParams = new URLSearchParams(hash.replace('#', '?'));
    
    const hasCode = params.has('code');
    const hasOAuthError = params.has('error') || hashParams.has('error');
    const hasImplicitTokens = hash && /access_token|refresh_token/.test(hash);

    if (!hasCode && !hasOAuthError && !hasImplicitTokens) return;

    navigate({ pathname: '/auth/callback', search, hash }, { replace: true });
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}
