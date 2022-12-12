<template>
  <div class="w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-sm absolute left-0 top-0">
    <form @submit.prevent="addStudent" class="rounded-xl shadow-xl bg-white w-1/2 min-h-1/2  p-4 border">
      <div class="flex items-center justify-between">
        <h4 class="text-2xl font-medium leading-6 text-gray-900">
          Заполните персональные данные студента
        </h4>
        <button @click="$emit('closeModal')" class="hover:text-red-400 px-3 py-2 text-xl text-red-500 font-bold">
          &times;
        </button>
      </div>

      <div class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div class="">
          <label for="first-name" class="block text-sm font-medium text-gray-700">Имя</label>
          <div class="mt-1">
            <input type="text" name="first-name" id="first-name" v-model="first_name"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div class="">
          <label for="last-name" class="block text-sm font-medium text-gray-700">Фамилия</label>
          <div class="mt-1">
            <input type="text" name="last-name" id="last-name" v-model="last_name"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div class="">
          <label for="pinfl" class="block text-sm font-medium text-gray-700">ПИНФЛ</label>
          <div class="mt-1">
            <input type="number" name="pinfl" v-model="pinfl" id="pinfl"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div class="">
          <label for="birthday" class="block text-sm font-medium text-gray-700">Дата рождения</label>
          <div class="mt-1">
            <input type="date" name="birthday" v-model="birthday" :max="new Date().toISOString().split('T')[0]"
              id="birthday"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div class="sm:col-span-2 w-1/2">
          <label for="tel" class="block text-sm font-medium text-gray-700">Номер телефона</label>
          <div class="mt-1">
            <input type="number" name="tel" v-model="username" id="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div class="">
          <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
          <div class="mt-1">
            <input type="password" name="password" v-model="password" id="password"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div class="">
          <label for="password2" class="block text-sm font-medium text-gray-700">Повторите пароль</label>
          <div class="mt-1">
            <input type="password" name="password2" v-model="password2" id="password2"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-3">
        <ul>
          <li v-for="error in errors" :key="error" class="text-sm text-red-500">
            * {{ error }}
          </li>
        </ul>

        <button v-if="editData" type="submit" @click.prevent="editStudent()" :disabled="!hasValue()"
          class="px-3 py-2 rounded-md h-10 bg-green-500 hover:bg-green-400 disabled:bg-green-300 disabled:cursor-not-allowed font-medium text-white">
          Сохранить изменеия
        </button>

        <button v-else type="submit" @submit.prevent="addStudent()" :disabled="!hasValue()"
          class="px-3 py-2 rounded-md h-10 bg-green-500 hover:bg-green-400 disabled:bg-green-300 disabled:cursor-not-allowed font-medium text-white">
          Сохранить
        </button>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
    }
  },

  data() {
    return {
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      pinfl: "",
      birthday: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  created() {
    if (this.editData) {
      this.id = this.editData.id;
      this.first_name = this.editData.first_name;
      this.last_name = this.editData.last_name;
      this.username = this.editData.username;
      this.pinfl = this.editData.PINFL;
      this.birthday = this.editData.birthday;
    }
  },
  methods: {
    async addStudent() {
      this.checkForm();
      if (!this.errors.length) {
        await this.$store.dispatch("student/addStudent", {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          PINFL: this.pinfl,
          birthday: this.birthday,
          password: this.password,
        });
        this.$emit('closeModal')
        this.first_name = "";
        this.last_name = "";
        this.username = "";
        this.pinfl = "";
        this.birthday = "";
        this.password = "";
        this.password2 = "";
        this.errors = [];
      }
    },

    async editStudent() {
      this.checkForm();
      if (!this.errors.length) {
        await this.$store.dispatch("student/editStudent", {
          id: this.id,
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          PINFL: this.pinfl,
          birthday: this.birthday,
          password: this.password,
        });
        this.$emit('closeModal')
        this.id = "";
        this.first_name = "";
        this.last_name = "";
        this.username = "";
        this.pinfl = "";
        this.birthday = "";
        this.password = "";
        this.password2 = "";
        this.errors = [];
      }
    },

    checkForm() {
      this.errors = [];
      let regName = /^[а-яА-Я]+$/;
      let regTel =
        /^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
      let regPinfl = /^\d{14}$/;
      if (!regName.test(this.first_name) || !regName.test(this.last_name)) {
        this.errors.push(
          "Фамилия и имя должны сожержать только кирильские буквы"
        );
      }
      if (!regTel.test(this.username)) {
        this.errors.push("Вы ввели не верный формат номера телефона");
      }
      if (!regPinfl.test(this.pinfl)) {
        this.errors.push("ПИНФЛ должен содержать 14 цифр");
      }
      if (this.password.length < 6) {
        this.errors.push("Пароль должен содержать не менее 6 знаков");
      }
      if (!(this.password === this.password2)) {
        this.errors.push("Пароли не совподают");
      }
    },

    hasValue() {
      if (!this.first_name) {
        return false;
      }
      if (!this.last_name) {
        return false;
      }
      if (!this.username) {
        return false;
      }
      if (!this.pinfl) {
        return false;
      }
      if (!this.birthday) {
        return false;
      }
      if (!this.password) {
        return false;
      }
      if (!this.password2) {
        return false;
      }
      return true;
    },
  },
};
</script>
