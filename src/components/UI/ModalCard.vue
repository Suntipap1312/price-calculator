<script setup lang="ts">
import { downloadFile, loading, disabledButton, modalToggle } from '../../store/config'
</script>



<template>
    <div class="modal-backdrop fade show" v-show="modalToggle"></div>
    <div class="modal fade show" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle"
        style="display: block;" aria-modal="true" role="dialog" v-if="modalToggle">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalCenterTitle">เลือกประเภทไฟล์</h1>
                    <button type="button" class="btn-close" @click="modalToggle = false"
                        :disabled="disabledButton"></button>
                </div>

                <div class="modal-body" style="display: flex; gap: 1em;">
                    <!-- PDF -->
                    <button type="button" class="btn btn-lg btn-outline-danger" @click="downloadFile('mobile', 'pdf')"
                        v-if="!loading.filePDF" :disabled="disabledButton"
                        style="height: 3em; display: flex; justify-content: space-around; align-items: center; gap: 0.4em;">
                        <span class="material-symbols-outlined">
                            picture_as_pdf
                        </span>
                        <span>PDF File</span>
                    </button>

                    <button type="button" class="btn btn-lg btn-outline-danger" v-if="loading.filePDF" disabled
                        style="height: 3em; display: flex; justify-content: space-around; align-items: center; gap: 0.4em;">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </button>

                    <!-- PNG -->
                    <button type="button" class="btn btn-lg btn-outline-success" data-bs-dismiss="modal"
                        @click="downloadFile('mobile', 'png')" v-if="!loading.filePNG" :disabled="disabledButton"
                        style="height: 3em; display: flex; justify-content: space-around; align-items: center; gap: 0.4em;">
                        <span class="material-symbols-outlined">
                            image
                        </span>
                        <span>PNG Image</span>
                    </button>

                    <button type="button" class="btn btn-lg btn-outline-success" data-bs-dismiss="modal"
                        v-if="loading.filePNG" disabled
                        style="height: 3em; display: flex; justify-content: space-around; align-items: center; gap: 0.4em;">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>