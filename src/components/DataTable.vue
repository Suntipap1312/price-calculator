<script setup lang="ts">
import { computed } from 'vue';
import { products, totalSum, shippingFee, rate, toggleEdit } from '../store/config';
const props = defineProps<{
    theme: string
    currency?: string
}>()

const getTotalSum = computed(() => {
    return totalSum()
})

const formatToFixed = ((price: number) => {
    return price.toFixed(2)
})

function onDelete(i) {
    products.value.splice(i, 1);
}

</script>

<template>
    <!-- Yuan -->
    <table class="table" v-if="currency === 'yuan'">
        <thead :class="`table-${props.theme}`">
            <tr>
                <th scope="col" style="min-width: 4em;">ชื่อสินค้า</th>
                <th scope="col">ราคา</th>
                <th scope="col">จำนวน</th>
                <th scope="col" style="width: 14em;">จำนวนเงิน</th>
            </tr>
        </thead>
        <tbody v-if="currency === 'yuan'">
            <tr v-for="( product, index ) of products" :key="index" v-if="products.length >= 1">
                <th>
                    {{ product.title }}
                </th>
                <td>
                    <input type="number" v-model="product.price" class="input-price">
                </td>
                <td>
                    <input type="number" v-model="product.quantity" class="input-qty">
                </td>
                <td class="sub-total" style="display: flex; justify-content: flex-end; align-items: center; gap: 0.5em;">
                    <div class="center" style="display: flex; justify-content: center; flex-grow:1 ;">
                        {{ product.subTotal() }} ¥

                    </div>
                    <button class="btn btn-danger" v-show="toggleEdit" @click="onDelete(index)">ลบ</button>
                </td>
            </tr>
            <tr v-if="products.length <= 0">
                <td colspan="5">กรุณาเพิ่มรายการสินค้า</td>
            </tr>
        </tbody>

        <tfoot :class="`table-${props.theme}`">
            <tr style="height: auto;">
                <td colspan="3" style="border-bottom-width: 0; width: 15em;"></td>
                <div class="addon-details">
                    <td>
                        <div class="detail-box">
                            <p>รวมเงิน</p>
                            <p>{{ formatToFixed(getTotalSum) }} ¥</p>
                        </div>
                    </td>
                    <td>
                        <div class="detail-box">
                            <p>ค่าจัดส่ง</p>
                            <p>{{ formatToFixed(shippingFee / rate) }} ¥</p>
                        </div>
                    </td>
                    <td>
                        <div class="detail-box">
                            <p>ส่วนลด</p>
                            <p>0 ¥</p>
                        </div>
                    </td>
                    <td>
                        <div class="detail-box net-total">
                            <p>รวมทั้งสิ้น</p>
                            <p>{{ formatToFixed(getTotalSum + (shippingFee / rate)) }} ¥</p>
                        </div>
                    </td>
                </div>
            </tr>
        </tfoot>
    </table>

    <!-- Baht -->
    <table id="my-table" class="table" v-if="currency === 'baht'">
        <thead :class="`table-${props.theme}`">
            <tr>
                <th scope="col">ชื่อสินค้า</th>
                <th scope="col" style="min-width: 1em;">ราคา</th>
                <th scope="col" style="min-width: 1em;">จำนวน</th>
                <th scope="col" style="min-width: 10em;">จำนวนเงิน</th>
            </tr>
        </thead>
        <tbody v-if="currency === 'baht'">
            <tr v-for="( product, index ) of  products " :key="index" v-if="products.length >= 1">
                <th>{{ product.title }}</th>
                <td>{{ product.price * rate }} ฿</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.subTotal() * rate }} ฿</td>
            </tr>
            <tr v-if="products.length <= 0">
                <td colspan="5">กรุณาเพิ่มรายการสินค้า</td>
            </tr>
        </tbody>
        <tfoot :class="`table-${props.theme}`">
            <tr style="height: auto;">
                <td colspan="3" style="border-bottom-width: 0; width: 15em;"></td>
                <div class="addon-details">
                    <td>
                        <div class="detail-box">
                            <p>รวมเงิน</p>
                            <p>{{ getTotalSum * rate }} ฿</p>
                        </div>
                    </td>
                    <td>
                        <div class="detail-box">
                            <p>ค่าจัดส่ง</p>
                            <p>{{ shippingFee }} ฿</p>
                        </div>
                    </td>
                    <td>
                        <div class="detail-box">
                            <p>ส่วนลด</p>
                            <p>0 ฿</p>
                        </div>
                    </td>
                    <td>
                        <div class="detail-box net-total">
                            <p>รวมทั้งสิ้น</p>
                            <p>{{ (getTotalSum + shippingFee) * rate }} ฿</p>
                        </div>
                    </td>
                </div>
            </tr>
        </tfoot>
    </table>
</template>

<style scoped>
table {
    margin: auto;
}

.addon-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-left: 1.5px solid #cbcdcf;
    border-right: 1.5px solid #cbcdcf;

}

.addon-details td {
    text-align: left;
}

.detail-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0.2em;
}

.detail-box p {
    margin: 0;
}

table tbody th,
table tbody td {
    padding: 1.2em 0;
}



.net-total p {
    font-weight: bold;
}
</style>