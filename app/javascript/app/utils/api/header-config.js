// clean values of user in localStorage
export const resetSession = () => {
  localStorage.removeItem('session');
};

// Setters

export const setSession = (user, session) => {
  const sessionData = {
    ...user,
    ...session
  };
  localStorage.setItem('session', JSON.stringify(sessionData));
}

// Getters

export const getHeadersForRequest = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  return { "access-token": session.token };
}

export const getSession = () => (JSON.parse(localStorage.getItem('session')));

// validate Session

export const verifyToken = () => {
  return new Date(getSession().expires_at) > new Date();
}