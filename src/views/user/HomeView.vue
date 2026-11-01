<template>
  <a-carousel class="carousel" arrows autoplay>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <div><img class="carousel-img" src="@/assets/images/news.png" /></div>
    <div><img class="carousel-img" src="@/assets/images/newbook.png" /></div>
    <div><img class="carousel-img" src="@/assets/images/popularbook.png" /></div>
  </a-carousel>
  <div class="book-section">
    <h2>熱門書籍</h2>
    <div class="book-list">
      <a-card hoverable title="Effective Java">
        <template #cover>
          <img src="@/assets/images/Effective Java.png" />
        </template>
      </a-card>
      <a-card hoverable title="Head First Java">
        <template #cover>
          <img src="@/assets/images/Head First Java.png" />
        </template>
      </a-card>
      <a-card hoverable title="Spring in Action">
        <template #cover>
          <img src="@/assets/images/Spring in Action.png" />
        </template>
      </a-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
</script>
<style scoped>
.book-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 24px;
}

.book-list {
  display: flex;
  gap: 24px;
}

.book-list .ant-card {
  flex: 1;
}

.book-section h2 {
  text-align: center;
}

.carousel {
  width: 90%;
  max-width: 1400px;
  margin: 35px auto;
}

.carousel img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  display: block;
}

:deep(.slick-slide) {
  height: 450px;
  overflow: hidden;
}

:deep(.slick-slide > div) {
  height: 100%;
}

:deep(.slick-slide img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}
</style>
