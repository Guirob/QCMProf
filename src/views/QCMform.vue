
<!-- eslint-disable -->
<template>
    <div
        class="w-[800px] flex flex-col items-center justify-center m-auto my-6 relative"
    >
        <h1 class="text-2xl font-bold mb-6 px-6 py-3 w-full text-center">
            <div
                class="text-sm font-bold bg-gray-100 shadow absolute left-0 top-0 mt-4 px-3 py-1 cursor-pointer rounded"
                v-on:click="previousPage()"
            >
                &larr; Retour
            </div>
            <div class="text-center flex justify-center items-center flex-col">
                {{ qcm.id ? "Modifier le QCM" : "Créer un QCM" }}<br />
                <div
                    class="bg-blue-500 text-2xs w-48 transform hover:scale-x-105 duration-200 text-white px-3 rounded cursor-pointer"
                    v-on:click="openInNewTab()"
                >
                    Voir dans un nouvel onglet
                </div>
            </div>
            <div
                v-if="qcm.id"
                class="text-sm font-bold bg-gray-100 shadow absolute right-0 top-0 mt-4 px-3 py-1 cursor-pointer rounded"
                v-on:click="goToParticipations()"
            >
                &rarr; Voir les participations
            </div>
        </h1>

        <div class="text-left w-full bg-gray-100 rounded shadow mb-32">
            <label class="block w-full text-center mt-9">
                <div class="text-2xs text-gray-400 font-bold -mb-1">
                    TITRE DU QCM
                </div>
                <textarea
                    class="text-center text-2xl font-bold bg-transparent w-full focus:outline-none resize-none overflow-hidden"
                    placeholder="Saisir ici le nom du QCM"
                    v-model="qcm.title"
                    v-on:keyup="autoGrow"
                    ref="title"
                />
            </label>

            <label class="block w-full text-center mt-3">
                <div class="text-2xs text-gray-400 font-bold -mb-1">
                    SOUS TITRE DU QCM
                </div>
                <textarea
                    class="text-center text-lg bg-transparent w-full focus:outline-none resize-none overflow-hidden"
                    placeholder="Saisir ici le sous titre du QCM"
                    v-model="qcm.subtitle"
                    v-on:keyup="autoGrow"
                    ref="subtitle"
                />
            </label>

            <div
                class="bg-gray-200 text-gray-500 text-xl px-4 py-2 mt-6 mb-6 font-bold rounded text-center mx-6"
            >
                <div>Questions</div>
                <div
                    class="flex flex-row m-auto justify-center items-center text-base mt-2"
                    v-if="qcm.questions.length > 0"
                >
                    <button
                        :disabled="questionIndex <= 0"
                        class="w-8 h-8 bg-gray-100 shadow rounded flex justify-center items-center hover:scale-110 transform duration-200 cursor-pointer disabled:opacity-25"
                        v-on:click="prev()"
                    >
                        &larr;
                    </button>

                    <button
                        class="h-8 bg-red-500 shadow rounded text-xs px-3 ml-2 text-white flex justify-center items-center hover:scale-110 transform duration-200 cursor-pointer"
                        v-on:click="removeQuestion()"
                    >
                        Supprimer
                    </button>
                    <div
                        class="px-6 h-8 flex justify-center items-center rounded shadow bg-gray-100 mx-2"
                    >
                        {{ questionIndex + 1 }} / {{ qcm.questions.length }}
                    </div>

                    <button
                        class="h-8 bg-blue-500 shadow rounded text-xs px-3 mr-2 text-white flex justify-center items-center hover:scale-110 transform duration-200 cursor-pointer"
                        v-on:click="addQuestion()"
                    >
                        Ajouter Q.
                    </button>
                    <button
                        :disabled="questionIndex >= qcm.questions.length - 1"
                        class="w-8 h-8 bg-gray-100 shadow rounded flex justify-center items-center hover:scale-110 transform duration-200 cursor-pointer disabled:opacity-25"
                        v-on:click="next()"
                    >
                        &rarr;
                    </button>
                </div>
            </div>

            <div
                class="flex flex-col justify-center items-center mb-6 text-center text-gray-400"
                v-if="qcm.questions.length == 0"
            >
                Votre QCM n'a aucune question<br />
                Ajoutez une question en cliquant sur le bouton ci dessous
                <div
                    class="text-center m-auto px-4 text-sm py-2 mt-2 mb-6 bg-blue-500 text-white hover:bg-blue-600 font-bold rounded flex justify-center items-center cursor-pointer shadow-lg"
                    v-on:click="addQuestion()"
                >
                    Ajouter une question
                </div>
            </div>
            <transition-group
                class="relative overflow-hidden h-[900px]"
                tag="div"
                :name="transitionName"
                v-else
            >
                <div
                    class="px-6 rounded mb-6 bg-gray-100 absolute w-[800px]"
                    v-if="currentQuestion != undefined"
                    :key="questionIndex"
                >
                    <div class="flex flex-row">
                        <div class="w-full text-center">
                            <div class="text-2xs text-gray-400 font-bold -mb-1">
                                QUESTION
                            </div>
                            <div class="flex flex-row">
                                <textarea
                                    class="text-center text-xl font-bold bg-transparent w-full focus:outline-none resize-none overflow-hidden"
                                    placeholder="Saisissez la question"
                                    v-model="currentQuestion.title"
                                    v-on:keyup="autoGrow"
                                    ref="qTitle"
                                />
                            </div>

                            <div
                                class="text-2xs text-gray-400 font-bold -mb-1 text-center mt-6"
                            >
                                INDICE
                            </div>
                            <div class="flex flex-col text-center mb-6">
                                <textarea
                                    class="text-center text-xl font-bold bg-transparent w-full focus:outline-none resize-none overflow-hidden"
                                    placeholder="Indice en cas de mauvaise réponse"
                                    v-model="currentQuestion.indice"
                                    v-on:keyup="autoGrow"
                                    ref="qIndice"
                                />
                            </div>

                            <div
                                class="flex flex-row mb-3 items-center"
                                v-for="(option, a) in currentQuestion.options"
                                :key="a"
                            >
                                <div
                                    class="text-center flex flex-row mt-2 w-full bg-white px-6 py-3 rounded relative shadow"
                                >
                                    <div class="flex-shrink-0 mr-2">
                                        {{ a + 1 }}.
                                    </div>
                                    <input
                                        type="text"
                                        class="bg-transparent w-full focus:outline-none"
                                        :placeholder="
                                            'Saisir la réponse ' + (a + 1)
                                        "
                                        v-model="option.title"
                                    />
                                    <div
                                        class="px-4 py-1 text-white absolute right-0 top-0 rounded hover:scale-105 shadow transform duration-200 -mt-2 mr-6 text-xs cursor-pointer"
                                        v-on:click="
                                            option.isGoodOption = !option.isGoodOption
                                        "
                                        :class="
                                            option.isGoodOption
                                                ? 'bg-green-500 '
                                                : 'bg-red-500 '
                                        "
                                    >
                                        {{
                                            option.isGoodOption
                                                ? "Bonne réponse"
                                                : "Mauvaise réponse"
                                        }}
                                    </div>

                                    <div
                                        class="w-6 bg-red-500 h-6 absolute right-0 top-0 z-10 flex justify-center items-center ml-3 cursor-pointer rounded text-center hover:scale-105 shadow transform duration-200 -mt-2 -mr-2 text-xs text-white hover:bg-red-600"
                                        v-on:click="
                                            removeOption(currentQuestion, a)
                                        "
                                    >
                                        X
                                    </div>
                                </div>
                            </div>

                            <div
                                class="px-6 py-2 rounded mt-6 flex justify-center items-center cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                                v-on:click="addOption(currentQuestion)"
                            >
                                Ajouter une réponse
                            </div>
                        </div>
                    </div>
                    <hr class="border-t border-gray-200 my-3" />

                    <div
                        class="bg-gray-200 text-gray-500 text-xl px-4 py-2 mt-6 mb-6 font-bold rounded text-center"
                    >
                        Feedback
                    </div>
                    <div class="flex flex-col">
                        <div
                            class="relative flex flex-row justify-center items-center transition-all duration-300 w-full"
                        >
                            <div
                                class="w-[160px] flex-shrink-0 min-h-[160px] mr-6 bg-gray-300 rounded-lg shadow-lg overflow-hidden"
                            >
                                <img
                                    class="w-full h-full"
                                    v-if="currentQuestion.imageURL"
                                    :src="currentQuestion.imageURL"
                                />
                                <video
                                    class="w-full h-full"
                                    onclick="this.play()"
                                    v-if="currentQuestion.videoURL"
                                    :src="currentQuestion.videoURL"
                                ></video>
                            </div>
                            <div class="flex flex-col flex-1">
                                <div class="text-2xs text-gray-400 font-bold">
                                    ILLUSTRATION (JPG, PNG, GIF, MP4)
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        class=""
                                        accept="image/x-png,image/gif,image/jpeg,video/mp4"
                                        placeholder="URL de la vidéo à afficher en cas de bonne réponse"
                                        v-on:change="handleUpload"
                                    />
                                </div>

                                <div
                                    class="text-2xs text-gray-400 font-bold mt-4"
                                >
                                    TEXTE DE BONNE REPONSE
                                </div>
                                <div
                                    class="bg-white rounded shadow px-6 py-3 flex-1"
                                >
                                    <div
                                        class="text-green-500 font-bold mb-4 text-lg"
                                    >
                                        Bonne réponse !
                                    </div>

                                    <textarea
                                        class="bg-transparent w-full focus:outline-none resize-none overflow-hidden"
                                        placeholder="Description en cas de bonne réponse"
                                        v-model="currentQuestion.feedbackText"
                                        v-on:keyup="autoGrow"
                                        ref="qFeedback"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>

        <div
            class="fixed bottom-0 left-0 w-screen border-t border-gray-300 bg-gray-100 shadow-xl p-4"
        >
            <div class="w-[800px] m-auto">
                <button
                    :disabled="isLoading"
                    class="w-full font-bold px-4 py-2 rounded flex justify-center items-center cursor-pointer bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-25"
                    v-on:click="save()"
                >
                    {{ isLoading ? "Sauvegarde..." : "Sauvegarder le QCM" }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./QCMForm.ts" />
