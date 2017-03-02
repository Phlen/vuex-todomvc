import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const TODO_LIST_STORAGE_KEY = 'todo-list'
export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(TODO_LIST_STORAGE_KEY) || '[]')
  },

  mutations: {
    addTodo: (state, { text }) => {
      console.log(text)
      state.todos.push({
        text,
        done: false
      })
    },

    deleteTodo: (state, { todo }) => {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },

    toggleTodo: (state, { todo }) => {
      todo.done = !todo.done
    },

    editTodo: (state, { todo, value }) => {
      todo.text = value
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.done)
    }
  }
})
