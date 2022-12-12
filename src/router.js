import {
  createRouter,
  createWebHistory
} from 'vue-router'
import store from './store'
import apiRequest from './utils/apiRequest'

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    meta: {
      title: "Home",
      requiredAuth: true,
    },
  },
  {
    path: '/test/:id/',
    name: 'test',
    component: () => import('./views/TestView.vue'),
    meta: {
      title: "Test",
      requiredAuth: true,
    },
  },
  {
    path: '/tests',
    name: 'tests',
    component: () => import('./views/AllTestsView.vue'),
    meta: {
      title: "Test",
      requiredAuth: true,
    },
  },
  {
    path: '/editTest/:id/',
    name: 'editTest',
    component: () => import('./views/AddTestView.vue'),
    meta: {
      title: "Добавить тест",
      requiredAuth: true,
    },
  },
  {
    path: '/addStudent',
    name: 'addStudent',
    component: () => import('./views/AddStudentView.vue'),
    meta: {
      title: "Добавить студента",
      requiredAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ './views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  store
    .dispatch("auth/refresh")
    .then(() => {
      const isAuthorized = store.getters["auth/isAuthorized"];

      if (to.meta.requiredAuth && !isAuthorized) {
        next({
          name: "login"
        });
      } else {
        document.title = `${to.meta.title} - Test`;
        next();
      }
    })
    .catch(() => {
      if (to.meta.requiredAuth) {
        next({
          name: "login"
        });
      } else {
        document.title = `${to.meta.title} - Test`;
        next();
      }
    });
});


apiRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status) {
            if (error.response.status === 401) {
                store.dispatch("auth/refreshToken");
            }
            return Promise.reject(error.response.data);
        }
    }
);

export default router