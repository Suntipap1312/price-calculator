<script setup lang="ts">
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import { computed, ref, watch } from 'vue';
import FooterNav from '../components/FooterNav.vue'
import { products, rate, shippingFee } from '../store/config'
import { bahttext } from "bahttext"

const bodyWidth = ref<number>(0);
const zoom = ref(0.5)
const updateBodyWidth = () => {
    bodyWidth.value = document.body.offsetWidth;
};

function generateRandomOrderNumber() {
    const randomSuffix = Math.floor(Math.random() * 10000000); // Generate a random number between 0 and 9999

    const orderNumber = `${randomSuffix}`; // Combine timestamp and random number
    return orderNumber;
}

updateBodyWidth(); // Set initial body width
window.addEventListener('resize', updateBodyWidth);

watch(bodyWidth, (value) => {
    if (value > 800) {
        return zoom.value = 0
    } else if (value > 576) {
        return zoom.value = 0.8
    } else {
        return zoom.value = 0.5
    }
})

const calcSubTotal = computed(() => {
    let sum = 0
    products.value.forEach((item) => {
        sum += item.subTotal()
    })
    return sum
})


const netMessage = computed(() => {
    return bahttext((calcSubTotal.value * rate.value) + shippingFee.value)
})



const dateTime = new Date();

</script>

<template>
    <br>
    <div id="a4-layout" :style="{ zoom }">
        <div class="preview-container" id="preview">
            <header class="header">
                <RouterLink to="/" style="text-decoration: none;">
                    <h2>ใบแจ้ง</h2>
                </RouterLink>
            </header>
            <div class="container">
                <section class="upper-details-box">
                    <div class="detail-box-1">
                        <div class="text-box upper-box">
                            <div class="title-box">
                                <h6>หัวข้อ:</h6>
                                <h6 style="width: 9em;">สั่งซื้อสินค้า</h6>
                            </div>
                            <span class="text-span">Title:</span>
                        </div>
                        <div class="text-box upper-box">
                            <div class="title-box">
                                <h6>เลขที่:</h6>
                                <h6>UBL{{ generateRandomOrderNumber() }}</h6>
                            </div>
                            <span class="text-span" style="min-width: 12em">Quote No:</span>
                        </div>
                    </div>
                    <div class="spacing"></div>
                    <div class="detail-box-2">
                        <div class="text-box upper-box">
                            <div class="title-box">
                                <h6 style="min-width: 6em;">วันที่:</h6>
                                <h6 style="min-width: 6em;">{{ dateTime.toLocaleDateString('th') }}</h6>
                            </div>
                            <span style="min-width: 10em;" class="text-span">Issued Date:</span>
                        </div>
                        <div class="text-box upper-box">
                            <div class="title-box">
                                <h6 style="min-width: 6em;">ผุ้จัดหา:</h6>
                                <h6 style="min-width: 6em;"> Sudchaya</h6>
                            </div>
                            <span style="min-width: 10em;" class="text-span">Prepared by:</span>
                        </div>
                    </div>
                </section>
                <table class="table table-bordered" style="text-align: center;">
                    <thead>
                        <tr>
                            <th style="width: 5em;">ลำดับที่</th>
                            <th style="min-width: 8em;">รายการ</th>
                            <th>ราคา</th>
                            <th style="width: 4em;">จำนวน</th>
                            <th style="width: 16em;">จำนวนเงิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) of products" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.title }}</td>
                            <td>{{ (product.price * rate).toLocaleString('th') }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ (product.subTotal() * rate).toLocaleString('th') }}</td>
                        </tr>
                        <tr style="height: 20em;" class="empty-tr">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div>

                    <div class="footer-container">
                        <div class="footer-amount">
                            <div class="amount-box">
                                <div class="amount">
                                    {{ netMessage }}
                                </div>
                            </div>
                        </div>
                        <div class="box-2">
                            <div class="text-box-item">
                                <div class="item">
                                    <div class="text-box">
                                        <h6>จำนวนเงิน:</h6>
                                        <span style="min-width: 10em" class="text-span">Sub Total:</span>
                                    </div>
                                    <h6>{{ (calcSubTotal * rate).toLocaleString('th') }}</h6>
                                </div>
                                <div class="item">
                                    <div class="text-box">
                                        <h6 style="width: 6em;">ค่าจัดส่ง:</h6>
                                        <span class="text-span" style="min-width: 10em;">Shipping Fee:</span>
                                    </div>
                                    <h6>{{ shippingFee.toLocaleString('th') }}</h6>
                                </div>
                                <div class="item">
                                    <div class="text-box">
                                        <h6>ส่วนลด:</h6>
                                        <span class="text-span">Discount:</span>
                                    </div>
                                    <h6>0</h6>
                                </div>
                                <div class="item">
                                    <div class="text-box">
                                        <h6>รวมทั้งสิ้น:</h6>
                                        <span style="min-width: 10em" class="text-span">Net Total:</span>
                                    </div>
                                    <h6>{{ ((calcSubTotal * rate) + shippingFee).toLocaleString() }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <footer>
        <FooterNav></FooterNav>
    </footer>
</template>

<style scoped>
#a4-layout {
    /* Adjust the value to control the zoom level */
    /* Adjust the value to control the zoom level */
    background-color: #ffffff;
    /* Set your desired background color */
    width: 210mm;
    /* A4 width */
    height: 297mm;
    /* A4 height */
    margin: 0 auto;
    /* Center the content horizontally */
    padding: 15mm;
    /* Add padding for content */
    box-shadow: 0 0 5mm rgba(0, 0, 0, 0.1);
    /* Optional: Add a shadow for a paper-like effect */
}

.upper-box {
    margin: 0 !important;
    margin-bottom: 1em !important;
}

.empty-tr td {
    background-color: #dbdbdb23;
}

.preview-container {
    background-color: white;
}

.title-box {
    display: flex;

}

.title-box h6 {
    width: 5em;
}

tbody,
td,
tfoot,
th,
thead,
tr {
    border: 1px solid #dbdbdb;
}

table {
    border: 2px solid #747373eb;
}

thead tr th {
    background-color: #cfe2ff;
}

h5 {
    font-size: 700;
}

h6 {
    margin: 0;
    font-weight: 500;
}

.header {
    padding: 1em;
    text-align: center;
}

.upper-details-box {
    display: flex;
    border: 2px solid #4a4a4a;
    height: 6em;
    margin-bottom: 1em;
    min-width: 321px;
}

.detail-box-1 {
    padding: 0.8em;
    width: 100%;
}

.detail-box-2 {
    padding: 0.8em;
    width: 80%;
}

.footer-container {
    display: flex;
    margin-bottom: 2em;
}

.footer-amount {
    flex-grow: 4;
}

.amount-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    min-height: 4em;
    margin-right: 1em;
}

.amount {
    font-weight: bold;
}

.box-2 {
    flex-grow: 1;
}

.spacing {
    width: 4px;
    background-color: #4a4a4a;
    height: 100%;
}

.text-box {
    position: relative;
    margin: 1em 0;

}

.text-span {
    position: absolute;
    left: 0;
    bottom: -12px;
    width: 7em;
    font-weight: bold;
    font-size: 0.5em;
}

.text-box-item {
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
}

.note-box {
    width: 100%;
}

.item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 1em;
    align-items: center;
}

.item:last-child {
    background-color: #cfe2ff;
    margin-top: 0.5em;
    padding-top: 0.5em;
    padding-bottom: 1em;
}

.item:last-child .text-box {
    margin: 0;

}
</style>