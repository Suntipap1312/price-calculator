<script setup lang="ts">
import ModalCard from './UI/ModalCard.vue'
import FooterNavigation from './UI/FooterNavigation.vue'
import { loading, progressPercentage, disabledButton, modalToggle } from '../store/config'
import 'sweetalert2/src/sweetalert2.scss'


</script>

<template>
    <!-- Computer -->
    <div :class="'nav-bar footer-pc'" style="width: 210mm; position: relative;">
        <FooterNavigation>
            <nav class="navbar bg-light" style="width: 100%; position: fixed; bottom: 0; height: 4em;">
                <div class="container-fluid justify-content-start flex justify-content-between">
                    <RouterLink to="/"><button class="btn btn-link">Back</button></RouterLink>
                    <button class="btn btn-primary" @click="modalToggle = true">
                        <p>Download</p>
                    </button>
                </div>
            </nav>
        </FooterNavigation>
    </div>

    <!-- Mobile -->
    <div :class="'nav-bar footer-mobile'" style="width: 210mm;">
        <FooterNavigation>
            <nav class="navbar-grid">
                <RouterLink to="/" class="icon-group bg-light">
                    <p class="material-symbols-outlined icon-img text-primary">Home</p>
                    <p class="icon-text text-primary">Home</p>
                </RouterLink>
                <button class="icon-group bg-primary" @click="modalToggle = true" :disabled="disabledButton">
                    <p class="material-symbols-outlined icon-img">Download</p>
                    <p class="icon-text">Download</p>
                </button>
            </nav>
        </FooterNavigation>
    </div>

    <!-- Modal Backdrop -->
    <ModalCard></ModalCard>
    <!--  Progress Bar -->
    <div :class="['progress', { 'hidden': !loading.progressBar }]" role="progressbar"
        style="position: absolute; top: 0; left: 0; right: 0; z-index: 2;">
        <div class="progress-bar progress-bar-striped progress-bar-animated" :style="`width: ${progressPercentage}%`"></div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    width: 100%;
    height: 100%;
}

.navbar-grid {
    box-shadow: 0 4px 2px 5px rgba(87, 83, 83, 0.171);
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 0;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 5em;
}

.navbar button {
    height: 100%;
}

.icon-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    border: 0;
}


a {
    text-decoration: none;
}

p {
    margin: 0;
}

.icon-img {
    font-size: 3em;
}

.icon-text {
    font-size: 1em;
}

.dropdown-menu {
    position: absolute;
    right: 10px;
    left: 10px;
    bottom: 6em;
}

.modal-backdrop {
    z-index: 1;
}

.progress {
    border-radius: 0;
}

.hidden {
    display: none;
}
</style>