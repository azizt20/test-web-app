<template>
  <div class="container mx-auto mt-10">
    <h2 class="text-3xl font-medium mb-2">Добавить новый тест</h2>


    <form
    @submit.prevent="addTest()"
    class="bg-white rounded-lg shadow-lg p-4 mb-10"
  >
    <div class="flex">
      <input
        v-model="newTest"
        class="bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        placeholder="Введите название теста"
        type="text"
      />
      <button
        type="submit"
        @submit.prevent="addTest()"
        :disabled="!newTest"
        class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg disabled:bg-blue-300 disabled:cursor-no-drop ml-5"
      >
        Добавить
      </button>
    </div>
  </form>
    <h2 class="text-3xl font-medium mb-2">Все тесты</h2>
    <ul class="space-y-3 text-lg font-medium">
      <li
        v-for="test in allTests"
        :key="test.id"
        class="rounded-lg shadow-lg bg-white flex justify-between items-center px-4"
      >
        <div class="py-4">
          {{ test.name }} - {{ test.quests.length }} вопростов
        </div>
        <div class="text-white space-x-3 hidden onHover text-sm">
          <button
            @click="deleteTest(test.id)"
            class="rounded-lg bg-red-500 hover:bg-red-400 py-2 px-3"
          >
            Удалить
          </button>
          <router-link
            :to="{ name: 'test', params: { id: test.id } }"
            class="rounded-lg bg-green-500 hover:bg-green-400 py-2 px-3"
            >Решить</router-link
          >
          <router-link
            :to="{ name: 'editTest', params: { id: test.id } }"
            class="rounded-lg bg-yellow-500 hover:bg-yellow-400 py-2 px-3"
            >Редактировать</router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      newTest: "",
      answers: [],
    };
  },
  created() {
    this.$store.dispatch("test/getTests");
  },
  methods: {
    deleteTest(id) {
      if (confirm("Вы уверены что хотите удалить этот тест?")) {
        this.$store.dispatch("test/deleteTest", id);
      }
    },
    async addTest() {
      await this.$store.dispatch("test/addTest", { name: this.newTest });
      this.newTest = "";
    },  
  },

  computed: {
    allTests() {
      return this.$store.getters["test/allTests"];
    },
  },
};
</script>

<style lang="scss" scoped>
ul > li:hover {
  .onHover {
    display: block;
  }
}
</style>
