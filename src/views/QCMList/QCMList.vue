<template>
    <div class="w-1/2 lg:1/3 flex flex-col items-center m-auto my-6">
        <h1 class="text-2xl font-bold mb-6">Liste des QCM</h1>
        <div
            class="text-left bg-gray-100 shadow w-full rounded px-6 py-4 hover:scale-105 transform duration-300 cursor-pointer mb-4"
            v-on:click.stop="goTo(qcm)"
            v-for="(qcm, index) in qcmList"
            :key="index"
        >
            <div class="font-bold">
                {{ qcm.title }}
                <div
                    class="text-xs font-normal inline-block bg-gray-200 rounded px-3 py-1"
                >
                    {{ qcm.questions.length }} questions
                </div>

                <div
                    class="text-xs font-normal inline-block bg-red-500 text-white rounded px-3 py-1 float-right hover:bg-red-600 ml-4"
                    v-tooltip="'Copier l\'url du QCM'"
                    v-on:click.stop="deleteQCM(qcm)"
                >
                    Supprimer
                </div>
                <div
                    class="text-xs font-normal inline-block bg-blue-500 text-white rounded px-3 py-1 float-right hover:bg-blue-600"
                    v-tooltip="'Copier l\'url du QCM'"
                    v-on:click.stop="copyUrl(qcm)"
                >
                    Copier l'url
                </div>
            </div>
            <div>{{ qcm.url }}</div>
        </div>

        <div
            class="text-left bg-gray-300 w-full rounded px-6 py-4 hover:scale-105 transform duration-300 cursor-pointer mb-4"
            v-on:click.stop="goToNewQCM()"
        >
            + Ajouter un nouveau QCM
        </div>
    </div>
</template>

<script lang="ts" src="./QCMList.ts" />
 