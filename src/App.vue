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
    <todo-header></todo-header>
    <section class="main" v-show="todos.length">
      <input type="checkbox"
        class="toggle-all"
        :checked="allChecked"
        @change="toggleAll({ done: !allChecked})">
      <ul class="todo-list">
        <Todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"></Todo>
      </ul>
    </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize('item') }} left
        </span>
        <ul class="filters">
          <li v-for="(val, key) in filters">
            <a href="javascript:void(0);"
              :class="{selected: visibility === key}"
              @click="visibility = key">
              {{ key | capitalize }}
            </a>
          </li>
        </ul>
        <button class="clear-completed"
          v-show="todos.length"
          @click="clearCompleted">Clear completed</button>
      </footer>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Header from './components/header'
  import Todo from './components/todo'

  const filters = {
    all: todos => todos,
    completed: todos => todos.filter(todo => todo.done),
    active: todos => todos.filter(todo => !todo.done)
  }
  export default {
    components: {
      'todo-header': Header,
      'Todo': Todo
    },
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

      filteredTodos () {
        return filters[this.visibility](this.todos)
      },

      remaining () {
        return this.todos.filter(todo => !todo.done).length
      },

      allChecked () {
        return this.todos.every(todo => todo.done)
      }
    },

    methods: {
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
