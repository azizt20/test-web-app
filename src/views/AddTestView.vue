<template>
  <div class="container mx-auto mt-10">
    <h2 v-if="currentTest" class="text-3xl font-medium mb-4">
      {{ currentTest.name }}
    </h2>
    <div class="bg-white rounded-lg shadow-lg p-4 mb-5">
      <div class="flex w-full justify-between items-center mb-3">
        <h2 class="text-xl font-medium">Добавить вопрос к тесту</h2>

        <select
          class="bg-white w-[150px] border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
          name="type" @change.prevent="options = [{ option: '', isAnswer: false }]" v-model="type" id="type">
          <option disabled selected value="">Выберите тип</option>
          <option value="1">радио</option>
          <option value="3">checkkbox</option>
          <option value="2">текст</option>
        </select>
      </div>
      <input
        class="bg-white disabled:bg-slate-200 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        placeholder="Введите текст вопроса" v-model="question" type="text" :disabled="!type" />

      <div v-if="question" class="">
        <div v-if="type == 1" class="mt-4">
          <ul class="answers space-y-1 mt-2 mb-3 text-md">
            <li v-for="(option, i) in options" :key="option" class="text-gray-700">
              <div class="flex items-center">
                <input class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-300" type="radio"
                  :value="i" v-model="answer" />
                <input v-model="option['option']"
                  class="bg-white disabled:bg-slate-200 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                  type="text" />
                <button v-if="options.length > 1" @click.prevent="deleteOption()"
                  class="ml-3 py-2 px-3 bg-red-500 hover:bg-red-400 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    class="w-6 h-6 stroke-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>

          <div class="flex justify-between items-center">
            <button @click.prevent="addOption()" v-if="options.length < 5"
              class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg">
              Добавить вариант
            </button>

            <button @click="addQuestion()" :disabled="!answer && hasEmptyOption()"
              class="py-2 px-3 bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg disabled:cursor-not-allowed disabled:bg-green-300">
              Сохранить
            </button>
          </div>
        </div>

        <div v-if="type == 3" class="mt-4">
          <ul class="answers space-y-1 mt-2 mb-3 text-md">
            <li v-for="option in options" :key="option" class="text-gray-700">
              <div class="flex items-center">
                <input class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-300"
                  type="checkbox" v-model="option['isAnswer']" />
                <input v-model="option['option']"
                  class="bg-white disabled:bg-slate-200 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                  type="text" />
                <button v-if="options.length > 1" @click.prevent="deleteOption()"
                  class="ml-3 py-2 px-3 bg-red-500 hover:bg-red-400 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    class="w-6 h-6 stroke-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>

          <div class="flex justify-between items-center">
            <button @click="addOption()" v-if="options.length < 5"
              class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg">
              Добавить вариант
            </button>

            <button @click="addQuestion()" :disabled="!hasAnswer() || hasEmptyOption()"
              class="py-2 px-3 bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg disabled:cursor-not-allowed disabled:bg-green-300">
              Сохранить
            </button>
          </div>
        </div>

        <div v-if="type == 2" class="mt-4">
          <input
            class="bg-white disabled:bg-slate-200 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 mb-3"
            placeholder="Введите правельный ответ" v-model="text" type="text" />

          <button @click="addQuestion()" :disabled="!text"
            class="py-2 px-3 bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg disabled:bg-green-300 disabled:cursor-not-allowed">
            Сохранить
          </button>
        </div>
      </div>
    </div>

    <div v-if="currentTest?.quests.length" class="mt-10">
      <h3 class="text-2xl font-medium mb-4">Тесты</h3>
      <div v-for="(question, i) in currentTest.quests" :key="question.id" class="">
        <RadioTest @edit-test="testEdit = true; id = question.id" :test="question" :test_number="i" :disabled="true"
          v-if="question.type == '1'" />
        <CheckboxTest @edit-test="testEdit = true; id = question.id" :test="question" :test_number="i" :disabled="true"
          v-if="question.type == '3'" />
        <InputTest @edit-test="testEdit = true; id = question.id" :test="question" :test_number="i" :disabled="true"
          v-if="question.type == '2'" />
      </div>
    </div>
    <TestEditModal @close-modal="testEdit = false" v-if="testEdit" :id="id" />
  </div>
</template>
<script>
import InputTest from "@/components/InputTest.vue";
import CheckboxTest from "@/components/CheckboxTest.vue";
import RadioTest from "@/components/RadioTest.vue";
import TestEditModal from "@/components/TestEditModal.vue";
export default {
  components: {
    RadioTest,
    CheckboxTest,
    InputTest,
    TestEditModal
  },
  data() {
    return {
      question: "",
      type: "",
      options: [{ option: "", isAnswer: false }],
      answer: 0,
      text: "",
      testEdit: false,
      id: ""
    };
  },
  methods: {
    addOption() {
      if (!this.hasEmptyOption()) {
        this.options.push({ option: "", isAnswer: false });
      } else alert("Заполните пустые поля");
    },
    deleteOption(id) {
      this.options.splice(id, 1);
    },
    hasEmptyOption() {
      let isEmpty = false;
      this.options.forEach((o) => {
        if (o.option.trim() == "") {
          isEmpty = true;
          return true;
        }
      });
      return isEmpty;
    },
    hasAnswer() {
      let answer = false;
      this.options.forEach((o) => {
        if (o.isAnswer == true) {
          answer = true;
          return true;
        }
      });
      return answer;
    },
    finalOptions() {
      if (this.type == 2) {
        return this.text;
      }
      if (this.type == 3) {
        return this.options;
      }
      if (this.type == 1) {
        this.options[this.answer].isAnswer = true;
        return this.options;
      }
    },
    async addQuestion() {
      await this.$store.dispatch("test/addQuestion", {
        question: {
          test: this.$route.params.id,
          type: this.type,
          question: this.question,
        },
        options: this.finalOptions(),
      });
      this.question = "";
      this.type = "";
      this.options = [{ option: "", isAnswer: false }];
      this.answer = 0;
      this.text = "";
    },
  },
  created() {
    this.$store.dispatch("test/getTest", this.$route.params.id);
    this.$store.dispatch("test/getTests");
  },
  computed: {
    allTests() {
      return this.$store.getters["test/allTests"];
    },

    currentTest() {
      return this.$store.getters["test/currentTest"];
    },
  },
};
</script>
