<template>
  <div v-if="allQuestions" class="container mx-auto mt-10">
    <h3 class="text-2xl mb-3 font-medium">{{ allQuestions.name }}</h3>
    <div v-for="(question, i) in allQuestions.quests" :key="question.id" class="">
      <RadioTest @choosen-option="addResponse" :test="question" :test_number="i" v-if="question.type == '1'" />
      <CheckboxTest @choosen-options="addResponse" :test="question" :test_number="i" v-if="question.type == '3'" />
      <InputTest @typed-answer="addResponse" :test="question" :test_number="i" v-if="question.type == '2'" />
    </div>

    <div class="text-right">
      <div v-if="result" class="text-xl font-bold"> 
        Ваш результат
        {{ result.score }}/{{answers.length}}
      </div>
      <button v-if="!result" @click.prevent="checkTest()" :disabled="answers.length < allQuestions.quests.length"
        class="rounded-md text-white font-medium text-lg py-2 px-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300">
        Проверить ответ
      </button>
    </div>
  </div>
</template>

<script>
import InputTest from "@/components/InputTest.vue";
import CheckboxTest from "@/components/CheckboxTest.vue";
import RadioTest from "@/components/RadioTest.vue";
export default {
  components: {
    RadioTest,
    CheckboxTest,
    InputTest,
  },
  data() {
    return {
      answers: [],
    };
  },
  created() {
    this.$store.dispatch("test/getTest", this.$route.params.id);
  },
  methods: {
    addResponse(data, i) {
      this.answers[i] = data;
    },

    checkTest() {
      console.log({
        testId: parseInt(this.$route.params.id),
        results: this.answers,
      });
      this.$store.dispatch("test/checkTest", {
        testId: this.$route.params.id,
        results: this.answers,
      });
    },
  },

  computed: {
    allQuestions() {
      return this.$store.getters["test/currentTest"];
    },
    result() {
      return this.$store.getters["test/result"];
    },
  },
};
</script>
