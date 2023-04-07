const roots = {
  authRoot: '/auth',
  postRoot: '/posts',
  userRoot: '/users',
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
    incrementClaps: 'increment/:id',
  },
  user: {
    root: roots.userRoot,
    create: '',
    findById: '/:id',
    list: '',
  },
};
