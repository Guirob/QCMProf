<template>
    <div class="flex flex-col">
        <div class="bg-gray-100 mb-6 shadow flex flex-row">
            <div class="px-6 py-4 font-bold flex-1">QCM Prof</div>
            <div
                v-on:click="logout"
                class="px-6 py-4 hover:bg-gray-200 cursor-pointer self-end"
            >
                Se déconnecter
            </div>
        </div>
        <router-view />
    </div>
</template>

<script lang="ts" src="./LoggedLayout.ts" />
 