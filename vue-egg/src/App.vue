<script setup>

</script>



<template>
  <nav>
  <RouterLink to="/home">Главная</RouterLink>
  <RouterLink to="/contacts">Контакты</RouterLink>
  <RouterLink to="/products">Продукты</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  display: grid;
  grid-auto-flow: column;
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  align-self: center;
  background-color: blanchedalmond;
  width: 300px;
}
a {
  text-decoration: none;
}
</style>
