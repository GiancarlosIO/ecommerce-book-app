// clean values of user in localStorage
export const resetSession = () => {
  window.localStorage.removeItem('session');
};

// Setters

export const setSession = (user, session) => {
  const sessionData = {
    ...user,
    ...session
  };
  window.localStorage.setItem('session', JSON.stringify(sessionData));
};

// Getters

export const getHeadersForRequest = () => {
  const session = JSON.parse(window.localStorage.getItem('session'));
  return { 'access-token': session.token };
};

export const getSession = () => (JSON.parse(window.localStorage.getItem('session')));

// validate Session

export const verifyToken = () => new Date(getSession().expires_at) > new Date();
