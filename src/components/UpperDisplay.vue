<script setup lang="ts">
import { ref } from 'vue';
import { rate, shippingFee } from '../store/config';

// Rate and Shipping

type SelectedFee = 'rate' | 'shipping';
const inputShippingFee = ref('');
const inputValue = ref('')
function setupRateValue(type: SelectedFee) {
    if (type === 'rate') {
        if (typeof inputValue.value !== 'number') return
        rate.value = +(+inputValue.value).toFixed(2);
        inputValue.value = '';
    } else {
        if (typeof inputShippingFee.value !== 'number') return
        shippingFee.value = inputShippingFee.value;
        inputShippingFee.value = '';
    }
}

function onEnter(type: SelectedFee) {
    if (type === 'rate') {
        rate.value = +(+inputValue.value).toFixed(2);
        inputValue.value = '';
    } else if (type === 'shipping') {
        shippingFee.value = +(+inputShippingFee.value).toFixed(2);
        inputShippingFee.value = ''
    }
}
</script>

<template>
    <div class="container text-center">
        <div class="row">

            <!-- Card-1 -->
            <div class="col col-12 col-sm-6">
                <div class="card">
                    <div class="card-title">
                        <div class="text-icon">
                            <span class="material-symbols-outlined">
                                swap_horiz
                            </span>
                            <h6>กำหนดอัตราแลกเปลี่ยน</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="display-box">
                            <h3>{{ rate }} บาท</h3>
                        </div>
                        <div class="input-box">
                            <input tabindex="1" type="number" placeholder="ค่าเงิน (บาท/หยวน)" class="form-control"
                                v-model="inputValue" @keyup.enter="onEnter('rate')">
                            <button tabindex="-1" class="btn btn-primary" @click="setupRateValue('rate')">SET</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card-2 -->
            <div class="col col-12 col-sm-6">
                <div class="card">
                    <div class="card-title">
                        <div class="text-icon">
                            <span class="material-symbols-outlined">
                                local_shipping
                            </span>

                            <h6>กำหนดค่าจัดส่ง</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="display-box">
                            <h3>{{ shippingFee }} บาท</h3>
                        </div>
                        <div class="input-box">
                            <input tabindex="2" type="number" placeholder="ค่าจัดส่ง (บาท)" class="form-control"
                                v-model="inputShippingFee" @keyup.enter="onEnter('shipping')">
                            <button tabindex="-1" class="btn btn-primary" @click="setupRateValue('shipping')">SET</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
@media (max-width: 576px) {
    .row {
        margin: 1.5em;
    }

    .row .col:first-child .card {
        background-color: yellow;
        border-radius: 10px 10px 0 0;
    }

    .row .col:last-child .card {
        background-color: yellow;
        border-radius: 0 0 10px 10px;
    }

    .card-body {
        padding: 0.5em;
    }
}

@media (min-width: 576px) {

    .row .col:first-child .card {

        border-radius: 10px 0 0 10px;
    }

    .row .col:last-child .card {

        border-radius: 0 10px 10px 0;
    }

}

h6 {
    margin: 0;
}

h3 {
    margin-bottom: 0.6em;
}

.container {
    margin-top: 1em;
    padding: 0;
}

.col {
    padding: 0;
}

.card {
    border-radius: 0;
    padding: 1em;
}

.card-title {
    margin: 0;
}

.text-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
}

.input-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
}

.card-body {
    margin: auto;
}
</style>