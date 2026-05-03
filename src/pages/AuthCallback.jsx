import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

async function fetchProfileRole(userId) {
  if (!userId) return 'user';
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();
  if (error) return 'user';
  return data?.role === 'admin' ? 'admin' : 'user';
}

function decodeOAuthErrorDescription(raw) {
  if (!raw) return '';
  try {
    return decodeURIComponent(raw.replace(/\+/g, ' '));
  } catch {
    return raw;
  }
}

/**
 * OAuth (Google) : échange explicite du ?code= PKCE, puis redirection.
 * Évite la course avec useAuth (getSession() peut finir avant l’échange).
 * Si Supabase t’a renvoyé sur `/` avec le même `code`, OAuthReturnCapture
 * t’amène ici avant ce flux.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const params = new URLSearchParams(location.search);
      const oauthErr = params.get('error');
      const oauthDesc = params.get('error_description');

      if (oauthErr) {
        if (!cancelled) {
          navigate('/login', {
            replace: true,
            state: { oauthError: decodeOAuthErrorDescription(oauthDesc) || oauthErr },
          });
        }
        return;
      }

      const code = params.get('code');

      try {
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            const { data: { session: retrySession } } = await supabase.auth.getSession();
            if (!retrySession?.user) {
              if (!cancelled) {
                navigate('/login', {
                  replace: true,
                  state: { oauthError: exchangeError.message },
                });
              }
              return;
            }
          }
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (cancelled) return;

        if (sessionError || !session?.user) {
          navigate('/login', {
            replace: true,
            state: {
              oauthError:
                'Session introuvable après Google. Dans Supabase → Redirect URLs, ajoute exactement : ' +
                `${window.location.origin}/auth/callback`,
            },
          });
          return;
        }

        const role = await fetchProfileRole(session.user.id);
        if (cancelled) return;

        navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
      } catch (e) {
        if (!cancelled) {
          navigate('/login', {
            replace: true,
            state: { oauthError: e?.message || 'Erreur OAuth' },
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
