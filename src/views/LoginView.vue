<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Войдите в свой аккаунт
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="Login">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Номер телефона</label
            >
            <div class="mt-1">
              <input
                v-model="username"
                id="username"
                name="username"
                type="number"
                autocomplete="tel"
                required=""
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Пароль</label
            >
            <div class="mt-1">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                required=""
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              @submit.prevent="Login"
              class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "LoginView",
  data() {
    return {
      username: 998990000000,
      password: "root",
    };
  },
  methods: {
    Login() {
      this.$store.dispatch("auth/login", {
        username: this.username,
        password: this.password,
      });

      //   this.username = null;
      //   this.password = null;
    },
  },
};
</script>
