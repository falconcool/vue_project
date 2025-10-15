<script setup>

</script>



<template>
  <nav>
  <RouterLink to="/home">Главная</RouterLink>
  <RouterLink to="/contacts">Контакты</RouterLink>
  <RouterLink to="/about">О нас</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 1rem;
}
a {
  text-decoration: none;
}
</style>
