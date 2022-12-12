import apiRequest from "@/utils/apiRequest";

export default {
  namespaced: true,
  state: {
    students: [],
  },

  getters: {
    searchStudents: (state) => (searchText) => {
      return state.students.filter((student) =>
        (
          student.first_name +
          " " +
          student.last_name +
          " " +
          student.username +
          " " +
          student.PINFL +
          " " +
          student.birthday
        )
          .toUpperCase()
          .includes(searchText.toUpperCase())
      );
    },
    studentById: (state) => (id) => {
      return state.students.find((student) => student.id === id);
    },
  },

  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },

    ADD_STUDENT(state, student) {
      state.students.push(student);
    },

    REMOVE_STUDENT(state, id) {
      state.students = state.students.filter((s) => s.id != id);
    },

    UPDATE_STUDENT(state, student) {
      state.students.forEach((s, i) => {
        if (s.id == student.id) {
          state.students[i] = student;
        }
      });
    },
  },

  actions: {
    getStudents({ commit }) {
      return new Promise((resolve, reject) => {
        apiRequest
          .get("User/?offset=1")
          .then((result) => {
            commit("SET_STUDENTS", result.data.results);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addStudent({ commit }, formData) {
      return new Promise((resolve, reject) => {
        apiRequest
          .post("registration/", formData)
          .then((result) => {
            if (
              result.data.username === "user with this username already exists."
            ) {
              reject("Студент с таким номером телефона уже сушествует");
            } else {
              commit("ADD_STUDENT", result.data);
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editStudent({ commit }, formData) {
      return new Promise((resolve, reject) => {
        apiRequest
          .put(`User/${formData.id}/`, formData)
          .then((result) => {
            commit("UPDATE_STUDENT", result.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteStudent({ commit }, id) {
      return new Promise((resolve, reject) => {
        apiRequest
          .delete(`User/${id}/`)
          .then(() => {
            commit("REMOVE_STUDENT", id);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
