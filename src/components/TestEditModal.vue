<template>
    <div
        class="w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-sm absolute left-0 top-0">
        <form @submit.prevent="addStudent()" class="rounded-xl shadow-xl bg-white w-1/2 min-h-1/2 p-4 border">
            <div class="flex items-center justify-between">
                <h3 class="text-2xl font-medium">Внести изменеия </h3>
                <button @click="$emit('closeModal')"
                    class="hover:text-red-400 px-3 py-2 text-xl text-red-500 font-bold">
                    &times;
                </button>
            </div>


            <input type="text" v-model="question"
                class="bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500">

            <div v-if="type == 1" class="mt-4">
                <ul class="answers space-y-1 mt-2 mb-3 text-md">
                    <li v-for="option in options" :key="option" class="text-gray-700">
                        <div class="flex items-center">
                            <input class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-300"
                                type="radio" :value="option.id" v-model="answer" />
                            <input v-model="option['option']"
                                class="bg-white disabled:bg-slate-200 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="text" />
                            <!-- <button v-if="options.length > 1" @click.prevent="deleteOption()"
                                class="ml-3 py-2 px-3 bg-red-500 hover:bg-red-400 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" class="w-6 h-6 stroke-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button> -->
                        </div>
                    </li>
                </ul>

                <div class="flex justify-between items-center">
                    <!-- <button @click.prevent="addOption()" v-if="options.length < 5"
                        class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg">
                        Добавить вариант
                    </button> -->
                    <div class="space-x-4">
                        <button @click="deleteQuestion()"
                            class="py-2 px-3 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg disabled:cursor-not-allowed ">
                            Удалить
                        </button>
                        <button @click="editQuestion()" :disabled="!answer && hasEmptyOption()"
                            class="py-2 px-3 bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg disabled:cursor-not-allowed disabled:bg-green-300">
                            Сохранить изменеия
                        </button>
                    </div>

                    <button @click="$emit('closeModal')"
                        class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg disabled:cursor-not-allowed ">
                        Назад
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
                            <!-- <button v-if="options.length > 1" @click.prevent="deleteOption()"
                                class="ml-3 py-2 px-3 bg-red-500 hover:bg-red-400 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" class="w-6 h-6 stroke-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button> -->
                        </div>
                    </li>
                </ul>

                <div class="flex justify-between items-center">
                    <!-- <button @click="addOption()" v-if="options.length < 5"
                        class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg">
                        Добавить вариант
                    </button> -->

                    <div class="space-x-4">
                        <button @click="deleteQuestion()"
                            class="py-2 px-3 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg disabled:cursor-not-allowed ">
                            Удалить
                        </button>
                        <button @click="editQuestion()" :disabled="!hasAnswer() || hasEmptyOption()"
                            class="py-2 px-3 bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg disabled:cursor-not-allowed disabled:bg-green-300">
                            Сохранить изменеия
                        </button>
                    </div>

                    <button @click="$emit('closeModal')"
                        class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg disabled:cursor-not-allowed ">
                        Назад
                    </button>
                </div>
            </div>

            <div v-if="type == 2" class="mt-4">
                <input
                    class="bg-white disabled:bg-slate-200 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 mb-3"
                    placeholder="Введите правельный ответ" v-model="options[0].option" type="text" />

                <div class="flex justify-between">
                    <div class="space-x-4">
                        <button @click="deleteQuestion()"
                            class="py-2 px-3 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg disabled:cursor-not-allowed ">
                            Удалить
                        </button>
                        <button @click="editQuestion()" :disabled="!text"
                            class="py-2 px-3 bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg disabled:bg-green-300 disabled:cursor-not-allowed">
                            Сохранить изменеия
                        </button>

                    </div>

                    <button @click="$emit('closeModal')"
                        class="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg disabled:cursor-not-allowed ">
                        Назад
                    </button>
                </div>

            </div>

        </form>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number
        }
    },
    data() {
        return {
            options: [],
            question: '',
            answer: null,
            text: "",
            type: '',

        }
    },
    created() {
        this.$store.dispatch('test/getQuestion', this.id)
    },
    watch: {
        currentQuestion() {
            this.type = this.currentQuestion.type
            this.options = this.currentQuestion.optis
            this.question = this.currentQuestion.question
            this.options.forEach(o => { o.isAnswer ? this.answer = o.id : '' })
            this.type == 2 ? this.text = this.options[0].option : ''
        }
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
                this.options.forEach(o => { o.id == this.answer ? o.isAnswer = true : o.isAnswer = false })
                return this.options;
            }
        },
        async editQuestion() {
            await this.$store.dispatch("test/editQuestion", { id: this.id, question: { question: this.question, }, options: this.finalOptions() });
            this.$store.dispatch("test/getTest", this.$route.params.id);
            this.$emit('closeModal')
        },

        async deleteQuestion() {
            await this.$store.dispatch("test/deleteQuestion", this.id);
            this.$emit('closeModal')
        },
    },
    computed: {
        currentQuestion() {
            return this.$store.getters['test/currentQuestion']
        }
    }

};
</script>
