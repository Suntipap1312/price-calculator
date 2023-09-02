<script setup lang="ts">
import { selectedBadge } from '../store/config'

</script>

<template>
    <div class="badges-box">
        <span class="badge rounded-pill" :class="[selectedBadge === 'all' ? 'text-bg-primary' : 'text-bg-light']"
            @click="selectedBadge = 'all'">All
        </span>
        <span class="badge rounded-pill" :class="[selectedBadge === 'baht' ? 'text-bg-success' : 'text-bg-light']"
            @click="selectedBadge = 'baht'">Baht
        </span>
        <span class="badge rounded-pill" :class="[selectedBadge === 'yuan' ? 'text-bg-danger' : 'text-bg-light']"
            @click="selectedBadge = 'yuan'">Yuan
        </span>
    </div>
</template>

<style>
.badges-box {
    margin-bottom: 1em;
}
</style>