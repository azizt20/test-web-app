import apiRequest from "@/utils/apiRequest";

export default {
  namespaced: true,
  state: {
    question: undefined,
    test: undefined,
    tests: [],
    result: undefined,
  },

  getters: {
    currentQuestion: (state) => state.question,
    currentTest: (state) => state.test,
    allTests: (state) => state.tests,
    result: (state) => state.result,
  },

  mutations: {
    SET_QUESTION(state, question) {
      state.question = question;
    },

    SET_TEST(state, test) {
      state.test = test;
    },

    SET_TESTS(state, tests) {
      state.tests = tests;
    },

    SET_RESULT(state, result) {
      state.result = result;
    },

    ADD_TEST(state, test) {
      state.tests.push(test);
    },

    REMOVE_TEST(state, id) {
      state.tests = state.tests.filter((t) => t.id != id);
    },

    REMOVE_QUESTION(state, id) {
      state.test.quests = state.test.quests.filter((q) => q.id != id);
    },
  },

  actions: {
    getQuestion({ commit }, id) {
      return new Promise((resolve, reject) => {
        apiRequest
          .get(`Questiion/${id}`)
          .then((result) => {
            commit("SET_QUESTION", result.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addQuestion({ dispatch }, formData) {
      return new Promise((resolve, reject) => {
        apiRequest
          .post("Questiion/", formData.question)
          .then((result) => {
            if (result.data.type == 2) {
              dispatch("addOptions", {
                question: result.data.id,
                option: formData.options,
                isAnswer: true,
              });
              resolve();
            } else {
              formData.options.forEach((opt) => {
                opt["question"] = result.data.id;
                dispatch("addOptions", opt);
              });
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editQuestion({ dispatch }, formData) {
      return new Promise((resolve, reject) => {
        apiRequest
          .put(`Questiion/${formData.id}/`, formData.question)
          .then((result) => {
            if (result.data.type == 2) {
              dispatch("editOption", formData.options);
              resolve();
            } else {
              formData.options.forEach((opt) => {
                dispatch("editOption", opt);
              });
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteQuestion({ commit }, id) {
      return new Promise((resolve, reject) => {
        apiRequest
          .delete(`Questiion/${id}/`)
          .then(() => {
            commit("REMOVE_QUESTION", id);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editOption(state, option) {
      return new Promise((resolve, reject) => {
        apiRequest
          .put(`Option/${option.id}/`, option)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addOptions(state, formData) {
      return new Promise((resolve, reject) => {
        apiRequest
          .post("Option/", formData)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getTests({ commit }) {
      return new Promise((resolve, reject) => {
        apiRequest
          .get("Test/")
          .then((result) => {
            commit("SET_TESTS", result.data.results);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getTest({ commit }, id) {
      return new Promise((resolve, reject) => {
        apiRequest
          .get(`Test/${id}`)
          .then((result) => {
            commit("SET_TEST", result.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addTest({ commit }, testName) {
      return new Promise((resolve, reject) => {
        apiRequest
          .post("Test/", testName)
          .then((result) => {
            commit("ADD_TEST", result.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    checkTest({ commit }, result) {
      return new Promise((resolve, reject) => {
        apiRequest
          .post("result/", result)
          .then((result) => {
            commit("SET_RESULT", result.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteTest({ commit }, id) {
      return new Promise((resolve, reject) => {
        apiRequest
          .delete(`Test/${id}/`)
          .then(() => {
            commit("REMOVE_TEST", id);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
