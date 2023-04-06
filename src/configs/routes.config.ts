const roots = {
  authRoot: '/auth',
  postRoot: '/tasks',
};

export default {
  root: '/',
  swagger: 'docs',
  auth: {
    root: roots.authRoot,
    signUp: 'sign-up',
    login: 'login',
    refreshToken: 'refresh-token',
    me: 'me',
  },
  post: {
    root: roots.postRoot,
    create: '',
    findById: '/:id',
    updateById: '/:id',
    list: '',
    deleteById: '/:id',
  },
};
