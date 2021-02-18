<template>
  <div>
    <div class="buttons">
        <router-link 
          class="button1"
          v-bind:class="{clicked: isclicked}"
          :to="{name: 'Convert'}"
          ><p @click="isclicked = !isclicked">Convert</p>
        </router-link>
        <router-link 
          class="button2"
          to="/crypto-dist.github.io/bag"
          v-bind:class="{clicked: !isclicked}"
        >
          <p @click="isclicked = !isclicked">Bag</p>
        </router-link> 
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return{
      isclicked: true
    }
  },
  mounted() {
    
  },
  methods: {
  }
}
</script>
<style>
  body {
    background: #ECEDF1;
  }
  
  a {
    text-decoration: none;
    color: white;
    font-family: Consolas;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */
    letter-spacing: 0.285em;
    text-transform: uppercase;

  }
  .button1 {
    position: absolute;
    top: 207px;
    left: 785px;
    width: 158px;
    height: 30px;
    text-align: center;
    background: #ECEDF1;
    color: #5B5B5B;
    box-shadow: 10px 10px 20px rgba(166, 171, 189, 0.4), -10px -10px 20px #FAFBFF;
    border-radius: 8px;
    transition: 0.3s;
  }
  .button1 > p {
    margin: 4px;
  }
  .button2 > p {
    margin: 4px;
  }
  .button2 {
    position: absolute;
    top: 207px;
    left: 1007px;
    width: 158px;
    height: 30px;
    text-align: center;
    background: #ECEDF1;
    color: #5B5B5B;
    box-shadow: 10px 10px 20px rgba(166, 171, 189, 0.4), -10px -10px 20px #FAFBFF;
    border-radius: 8px;
    transition: 0.3s;
  }
  .clicked {
    background: #FF9A3E;
    color: white;
    transition: 0.3s;
  }
</style>
