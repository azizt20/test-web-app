<template>
  <!-- <NavBar/> -->
  <div class="container mx-auto">
    <div class="bg-white mt-10 py-3 px-5 flex justify-between items-center rounded-xl border border-[#2C275812]">
      <div class="flex items-center">
        <label class="relative block w-96 h-9">
          <span class="sr-only">Search</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg class="h-5 w-5 fill-slate-300" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.5233 15.4628L19.7355 18.6743L18.6743 19.7355L15.4628 16.5233C14.2678 17.4812 12.7815 18.0022 11.25 18C7.524 18 4.5 14.976 4.5 11.25C4.5 7.524 7.524 4.5 11.25 4.5C14.976 4.5 18 7.524 18 11.25C18.0022 12.7815 17.4812 14.2678 16.5233 15.4628ZM15.0188 14.9063C15.9706 13.9274 16.5022 12.6153 16.5 11.25C16.5 8.349 14.1503 6 11.25 6C8.349 6 6 8.349 6 11.25C6 14.1503 8.349 16.5 11.25 16.5C12.6153 16.5022 13.9274 15.9706 14.9063 15.0188L15.0188 14.9063Z"
                fill="#A1A3D4" />
            </svg>
          </span>
          <input
            class="placeholder:italic placeholder:text-slate-400 block sm:bg-slate-200 w-full h-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            placeholder="Поиск по любым параметрам..." type="text" v-model="search" name="search" />
        </label>

       
      </div>
      <button @click.prevent="editData = ''; modalToggle = true; "
        class="text-white font-medium rounded-lg bg-green-500 py-2 px-3 flex items-center justify-center hover:bg-green-400">
        Добавить Студента
      </button>
    </div>

    <table class="table bg-white" v-if="searchStudents.length">
      <thead class="">
        <tr>
          <th>Фамилия имя</th>
          <th>Номер телефона</th>
          <th>Дата рождения</th>
          <th>ПИНФЛ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in searchStudents" :key="i" class="table-row bg-white text-night-blue">
          <td>
            <div class="username-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>

              <a class="info">
                <div class="name">
                  {{ user.last_name }} {{ user.first_name }}
                </div>
              </a>
            </div>
          </td>
          <td class="table-col">{{ user.username }}</td>
          <td class="table-col">{{ user.birthday }}</td>
          <td class="table-col">{{ user.PINFL }}</td>
          <span class="hover-info right-6 cursor-pointer" @click.prevent="editStudent(user.id)" title="Редактировать">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </span>
          <span class="hover-info right-20 cursor-pointer" @click.prevent="deleteStudent(user.id)" title="Удалить">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </span>
        </tr>
      </tbody>
    </table>
    <div class="text-xl font-medium text-left mt-4" v-else>No user</div>
    <StudentForm v-if="modalToggle" :editData="editData" @close-modal="modalToggle = false" />
  </div>
</template>

<script>
import StudentForm from "@/components/StudentForm.vue";

export default {
  name: "HomeView",
  components: {
    StudentForm,
  },
  data() {
    return {
      modalToggle: false,
      editData: 0,
      search: ""
    };
  },
  watch: {
    search() {

    }
  },
  methods: {
    deleteStudent(id) {
      if (confirm("Вы действительно хотите удалить этого студента")) {
        this.$store.dispatch("student/deleteStudent", id);
      }
    },
    editStudent(id) {
      this.editData = this.$store.getters['student/studentById'](id)
      this.modalToggle = true

    }
  },
  computed: {
    students() {
      return this.$store.getters["student/allStudents"];
    },

    searchStudents() {
      return this.$store.getters["student/searchStudents"](this.search);
    },

  },
  created() {
    this.$store.dispatch("student/getStudents");
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  margin-top: 15px;
  border-radius: 12px 12px 0 0;

  thead {
    th {
      padding: 18px 0px 11px;
      border-bottom: 1.5px solid #023aff;
      max-width: 400px;
      text-align: start;

      &:last-child {
        border-radius: 0 12px 0 0;
      }

      &:first-child {
        border-radius: 12px 0 0 0;
        padding-left: 72px;
      }
    }
  }

  .table-row {
    box-shadow: inset 0px -1px 0px #f1f1f5;
    transition: all 0.3s;
    align-items: center;
    position: relative;

    .hover-info {
      display: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &:nth-child(2n-1) {
      background: rgba(219, 223, 241, 0.2);
    }

    &:hover {
      background: rgba(219, 223, 241, 0.7);
      box-shadow: inset 0px -1px 0px #023aff, inset 0px 1px 0px #023aff;
    }

    &:hover .hover-info {
      display: block;
    }

    td {
      max-width: 400px;
      text-align: start;
      padding-top: 9px;
      padding-bottom: 9px;

      &:nth-child(5) {
        padding-right: 120px;
      }

      &:first-child {
        padding: 20px;
      }
    }

    .username-col {
      display: flex;
      align-items: center;
      height: 100%;

      svg {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .info {
        .username {
          color: #8676ff;
        }
      }
    }
  }
}
</style>
