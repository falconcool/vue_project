<template>
  <div>
    <h2>Данные из базы</h2>
    
    <div>
      <button @click="fetchCouriers">Загрузить курьеров</button>
      <button @click="fetchProducts">Загрузить продукты</button>
      <button @click="fetchOrders">Загрузить заказы</button>
    </div>

    <div v-if="loading">Загрузка...</div>
    
    <div v-else>
      <!-- Курьеры -->
      <div v-if="couriers.length">
        <h3>Курьеры:</h3>
        <div v-for="courier in couriers" :key="courier.id">
          {{ courier.name }}
        </div>
      </div>

      <!-- Продукты -->
      <div v-if="products.length">
        <h3>Продукты:</h3>
        <div v-for="product in products" :key="product.id">
          {{ product.name }} — {{ product.price }}₽ (В наличии: {{ product.item_count }})
        </div>
      </div>

      <!-- Заказы -->
      <div v-if="orders.length">
        <h3>Заказы:</h3>
        <div v-for="order in orders" :key="order.id">
          {{ order.client_name }} заказал {{ order.product_name }} через {{ order.courier_name }} ({{ order.items_count }} шт. на {{ order.price }}₽)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataComponent',
  data() {
    return {
      couriers: [],
      products: [],
      orders: [],
      loading: false
    };
  },
  methods: {
    async fetchCouriers() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/couriers');
        this.couriers = response.data;
      } catch (error) {
        console.error('Ошибка загрузки курьеров:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchOrders() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/orders');
        this.orders = response.data;
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchCouriers();
    this.fetchProducts();
    this.fetchOrders();
  }
};
</script>
