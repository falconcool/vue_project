<template>
  <div>
    <h2>Данные из базы</h2>

    <div>
      <button @click="fetchCouriers">Загрузить курьеров</button>
      <button @click="fetchProducts">Загрузить продукты</button>
      <button @click="fetchOrders">Загрузить заказы</button>
    </div>

    <!-- Статусы загрузки -->
    <div v-if="loading">🔄 Загрузка...</div>

    <!-- Курьеры -->
    <div v-if="couriers.length">
      <h3>Курьеры:</h3>
      <ul>
        <li v-for="courier in couriers" :key="courier.id">
          {{ courier.name }}
        </li>
      </ul>
    </div>

    <!-- Продукты -->
    <div v-if="products.length">
      <h3>Продукты:</h3>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} — {{ product.price }}₽ (В наличии: {{ product.item_count }})
        </li>
      </ul>
    </div>

    <!-- Заказы -->
    <div v-if="orders.length">
      <h3>Заказы:</h3>
      <ul>
        <li v-for="order in orders" :key="order.id">
          {{ order.client_name }} заказал {{ order.product_name }} через {{ order.courier_name }}
          — {{ order.items_count }} шт. на {{ order.price }}₽
        </li>
      </ul>
    </div>

    <!-- Ошибка -->
    <div v-if="error" style="color: red;">⚠️ {{ error }}</div>
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
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchCouriers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3001/api/couriers');
        this.couriers = response.data;
      } catch (err) {
        this.error = 'Ошибка загрузки курьеров: ' + err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        this.products = response.data;
      } catch (err) {
        this.error = 'Ошибка загрузки продуктов: ' + err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchOrders() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3001/api/orders');
        this.orders = response.data;
      } catch (err) {
        this.error = 'Ошибка загрузки заказов: ' + err.message;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // Загрузка всех данных при открытии страницы
    this.fetchCouriers();
    this.fetchProducts();
    this.fetchOrders();
  }
};
</script>
