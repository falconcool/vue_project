<template>
  <div>
    <h2>Продукты</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} ({{ product.item_count }} шт.) {{ product.price }}₽ 
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsView',
  data() {
    return {
      products: []
    };
  },
  mounted() {
    axios.get('http://localhost:3001/api/products')
      .then(res => this.products = res.data)
      .catch(err => console.error(err));
  }
};
</script>
