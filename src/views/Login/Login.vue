<template>
    <div
        class="w-1/2 lg:1/3 flex flex-col items-center m-auto my-6 h-full flex-1 justify-center"
    >
        <div class="w-[360px]">
            <h1 class="text-2xl font-bold mb-6 text-center">QCMProf</h1>
            <div class="bg-gray-100 shadow rounded p-6 mb-32">
                <div class="text-center mb-8">
                    Connectez-vous<br />
                    avec votre email et votre mot de passe
                </div>

                <input
                    class="input h-12 mb-4"
                    type="text"
                    placeholder="Email"
                    v-on:keydown.enter="login"
                    v-model="email"
                />
                <input
                    class="input h-12 mb-4"
                    type="password"
                    placeholder="Mot de passe"
                    v-on:keydown.enter="login"
                    v-model="password"
                />

                <div v-if="hasError" class="text-red-500 text-center font-bold">
                    Email/Mot de passe invalide
                </div>

                <button class="button" :disabled="isLoading" v-on:click="login">
                    {{ isLoading ? "Connexion..." : "Se connecter" }}
                </button>
            </div>
            <i class="text-sm text-center text-gray-400"
                >Le projet <b>QCMProf</b> est un projet libre de droit. Cette
                version est hébergée par un administrateur spécifique. <br />
                Pour déployer votre propre version, copiez le projet
                <a
                    class="font-bold text-blue-500"
                    href="https://github.com/Guirob/QCMProf"
                    target="_blank"
                    >Github</a
                >
                et utilisez votre propre soution d'hébergement
            </i>
        </div>
    </div>
</template>

<script lang="ts" src="./Login.ts" />
 