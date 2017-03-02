<style src="todomvc-app-css/index.css">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input type="text"
        class="new-todo"
        autofocus
        placeholder="what nedds to be done?"
        @keyup.enter="addTodo">
    </header>
    <section class="main" v-if="todos.length">
      <input type="chexkbox"
        class="toggle-all"
        :checked="allChecked"
        @change="toggleAll({ done: !allChecked })">
        <ul class="todo-list">
          <Todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"></Todo>
        </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
         <strong>{{remaining}}</strong>
         {{ remaining | pluralize('item')}} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters">
          <a href="javascript:void(0);"
            :class="{ selected: visibility === key}"
            @click="visibility = key">
            {{ key | capitalize }}
          </a>
        </li>
      </ul>
      <button class="clear-completed" v-show="todos.length"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Todo from './components/todo.vue'

  const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todo => todo.done)
  }

  export default {
    components: { Todo },
    data () {
      return {
        visibility: 'all',
        filters: filters
      }
    },

    computed: {
      todos () {
        return this.$store.state.todos
      },
      allChecked () {
        return this.todos.every(todo => todo.done)
      },
      filteredTodos () {
        return filters[this.visibility](this.todos)
      },
      remaining () {
        return this.todos.filter(todo => !todo.done).length
      }
    },

    methods: {
      addTodo (e) {
        let text = e.target.value
        if (text.trim()) {
          this.$store.commit('addTodo', { text })
        }
        e.target.value = ''
      },
      ...mapMutations([
        'toggleAll',
        'clearCompleted'
      ])
    },

    filters: {
      pluralize: (n, w) => n === 1 ? w : (w + 's'),
      capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
</script>
