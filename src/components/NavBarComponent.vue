<template>
  <nav id="navbar" class="w-full bg-slate-300">
    <div class="flex justify-between items-center py-5 container mx-auto">
      <div class="links space-x-10 font-medium text-lg">
        <router-link
          :to="{ name: 'home' }"
          class="text-primary hover:opacity-100 opacity-70"
          >Студенты</router-link
        >
        <router-link
          :to="{ name: 'tests' }"
          class="text-primary hover:opacity-100 opacity-70"
          >Тесты</router-link
        >
      </div>

      <button @click.prevent="Logout" class="text-primary font-medium text-lg">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    Logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
