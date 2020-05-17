// 统一声明默认State
export default {
  auth: {
    isFetching: false,
    isAuthenticated: !localStorage ? false : (localStorage.getItem('auth_token') ? true : false)
  },
  user: {
    isFetching: false,
    name: null,
    email: null
  },
  users: {
    isFetching: false,
    meta: {
      total: 0,
      perPage: 10,
      page: 1
    },
    data: []
  },
  lectures: {
    isFetching: false,
    list: []
  }
};
