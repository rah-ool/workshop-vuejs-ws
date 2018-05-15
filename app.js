// Your code will go here!
const punchingBag = Vue.component('punching-bag', {
  props: ['tim'],
    computed: {
    timClasses: function () {
      return {
        'tim-100': this.tim && this.health <= 100 && this.health > 70,
        'tim-70': this.tim && this.health <= 70 && this.health > 30,
        'tim-30': this.tim && this.health <= 30 && this.health > 0,
        'tim-burst': this.tim && this.health <= 0,
      }
    }
  },
  data: function () {
    return {
      health: 100,
      ended: false,
  }},
  methods: {
    punch() {
      this.health -= 10;
      if (this.health <= 0) {
        this.ended = true;
      }
    },
    reset() {
      this.health = 100;
      this.ended = false;
    },
  },
  template: `
    <div class="punching-bag">
      <div id="bag" v-bind:class="{ burst: ended }"></div>

      <div id="bag-health">
          <div v-bind:style="{ width: health + '%' }"></div>
      </div>

      <div id="controls">
          <button v-on:click="punch" v-show="!ended">Punch</button>
          <button v-on:click="reset">Reset</button>
      </div>
    </div>
  `,
});

const counter = Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

const routes = [
  { path: '/', component: punchingBag, props: { tim: false } },
  { path: '/tim', component: punchingBag, props: { tim: true } },
  { path: '/counter', component: counter, props: { tim: false } },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: 'history', // removes the hash from our routes
});

new Vue({
  // This is our root instance.
  el: '#main-app',
  router
});
