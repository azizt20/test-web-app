<template>
  <div class="bg-white rounded-lg shadow-lg p-4 mb-3">
    <h4 class="border-b pb-2 flex text-lg relative">
      <span class="mr-2 font-medium">{{ test_number + 1 }}.</span>
      {{ test.question }}

      <button @click="$emit('editTest',test.id)" title="Редактировть" v-if="disabled" class="absolute right-0 rounded-lg px-3 text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </h4>

    <ul class="mt-2 text-md">
      <input
        class="bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        placeholder="Введите ответ..."
        :disabled="disabled"
        v-model="response"
        type="text"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    test: {
      type: Object,
    },
    test_number: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      defoult: false,
    },
  },
  data() {
    return {
      response: [],
    };
  },
  watch: {
    response() {
      this.$emit("typedAnswer", this.response, this.test_number);
    },
  },
};
</script>
