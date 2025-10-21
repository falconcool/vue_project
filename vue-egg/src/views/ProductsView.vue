<template>
  <div>
    <h2>Продукты</h2>

    <!-- Добавление продукта -->
    <div>
      <h3>Добавить продукт:</h3>
      <input v-model="newProduct.name" placeholder="Название" />
      <input v-model.number="newProduct.price" placeholder="Цена" type="number" />
      <input v-model.number="newProduct.item_count" placeholder="Количество" type="number" />
      <input v-model.number="newProduct.company_id" placeholder="ID компании" type="number" />
      <button @click="addProduct">Добавить</button>
    </div>

    <!-- Список продуктов -->
    <ul>
      <li v-for="product in products" :key="product.id">
        <div v-if="editingProduct?.id !== product.id">
          {{ product.name }} — {{ product.item_count }} шт. — {{ product.price }}₽
          <button @click="startEdit(product)">✏️ Редактировать</button>
          <button @click="deleteProduct(product.id)">🗑️ Удалить</button>
        </div>

        <!-- Режим редактирования -->
        <div v-else>
          <input v-model="editingProduct.name" placeholder="Название" />
          <input v-model.number="editingProduct.price" placeholder="Цена" type="number" />
          <input v-model.number="editingProduct.item_count" placeholder="Количество" type="number" />
          <input v-model.number="editingProduct.company_id" placeholder="ID компании" type="number" />
          <button @click="updateProduct">💾 Сохранить</button>
          <button @click="cancelEdit">✖️ Отмена</button>
        </div>
      </li>
    </ul>

    <!-- Ошибка -->
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsView',
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: 0,
        item_count: 0,
        company_id: null
      },
      editingProduct: null,
      error: null
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3001/api/products');
        this.products = res.data;
      } catch (err) {
        this.error = 'Ошибка загрузки продуктов: ' + err.message;
      }
    },
    async addProduct() {
      try {
        await axios.post('http://localhost:3001/api/products', this.newProduct);
        this.newProduct = { name: '', price: 0, item_count: 0, company_id: null };
        this.fetchProducts();
      } catch (err) {
        this.error = 'Ошибка добавления: ' + err.message;
      }
    },
    async deleteProduct(id) {
      if (!confirm('Удалить продукт?')) return;
      try {
        await axios.delete(`http://localhost:3001/api/products/${id}`);
        this.fetchProducts();
      } catch (err) {
        this.error = 'Ошибка удаления: ' + err.message;
      }
    },
    startEdit(product) {
      this.editingProduct = { ...product };
    },
    cancelEdit() {
      this.editingProduct = null;
    },
    async updateProduct() {
      try {
        const { id, name, price, item_count, company_id } = this.editingProduct;
        await axios.put(`http://localhost:3001/api/products/${id}`, {
          name, price, item_count, company_id
        });
        this.editingProduct = null;
        this.fetchProducts();
      } catch (err) {
        this.error = 'Ошибка обновления: ' + err.message;
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

