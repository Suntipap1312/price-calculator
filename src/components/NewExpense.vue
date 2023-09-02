<script setup lang="ts">
import { ref } from 'vue';
import { ItemDetail, products } from '../store/config'
const newProductInput = ref('');

function addNewProduct(): void {
    const newProduct: ItemDetail = ({
        title: newProductInput.value,
        price: 1000,
        quantity: 1,
        subTotal() {
            return this.price * this.quantity
        }
    });
    products.value.push(newProduct);
    newProductInput.value = '';
}
</script>

<template>
    <form @submit.prevent="addNewProduct">
        <div class="input-box">
            <input type="text" class="form-control" v-model="newProductInput">
            <button tabindex="-1" class="btn btn-primary add-new">เพิ่มสินค้า</button>
        </div>
    </form>
</template>

<style>
.add-new {
    min-width: 6em;
}

.input-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin-bottom: 2em;
}
</style>