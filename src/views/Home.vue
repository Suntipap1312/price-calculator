<script setup lang="ts">

import UpperDisplay from '../components/UpperDisplay.vue';
import DataTable from '../components/DataTable.vue';
import Badges from '../components/Badges.vue';
import { selectedBadge, rate, toggleEdit } from '../store/config'
import NewExpense from '../components/NewExpense.vue'




</script>

<template>
    <header>
        <UpperDisplay></UpperDisplay>
    </header>
    <main>
        <div class="main-content">
            <NewExpense></NewExpense>
            <Badges></Badges>
            <p style="text-align: right;" class="text-secondary">1 หยวน = {{ rate }} บาท</p>
            <div class="table-container" :class="[selectedBadge !== 'baht' ? '' : 'hidden-table']">
                <DataTable theme="danger" currency="yuan"></DataTable>
            </div>
            <hr v-show="selectedBadge === 'all'">
            <div class="table-container" :class="[selectedBadge !== 'yuan' ? '' : 'hidden-table']">
                <DataTable theme="primary" currency="baht"></DataTable>
            </div>

            <div class="botton-box">
                <button class="btn btn-secondary"
                    @click="toggleEdit = !toggleEdit">{{ toggleEdit ? 'ยกเลิก' : 'แก้ไข' }}</button>
                <RouterLink to="/preview" class="btn btn-success">สรุปรายงาน</RouterLink>
                <!-- <button class="btn btn-success" @click="router.push('/preview')">สรุปรายงาน</button> -->
            </div>
        </div>
    </main>
</template>

<style scoped>
.table-container {
    text-align: center;
}

.badge {
    font-size: 0.8em;
    margin-right: 0.5em;
}

hr {
    margin: 2.5em 0;
    border-top: 3px dashed var(--emerald-bgcolor);
}

.botton-box {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
    text-align: center;
    margin-top: 2em;
    margin-bottom: 1em;
}

.hidden-table {
    display: none;
}
</style>
