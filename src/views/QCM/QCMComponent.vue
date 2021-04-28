<template>
    <div
        class="handwrite w-full xl:w-1/3 lg:w-1/2 md:w-1/2 flex flex-col items-center p-12 m-auto h-full my-20"
    >
        <div class="absolute left-0 top-0 m-6">
            <router-link to="/admin">Prof</router-link>
        </div>
        <div class="text-center" v-if="questionIndex < qcm.questions.length">
            <h1 class="font-bold text-4xl">{{ qcm.title }}</h1>
            <div class="text-xl">
                Question {{ questionIndex + 1 }}/{{ qcm.questions.length }}
            </div>
        </div>

        <div
            class="flex flex-col flex-1 justify-center items-center w-full"
            v-if="currentQuestion != undefined"
        >
            <div
                class="flex-1 flex flex-col text-center justify-center items-center text-2xl"
            >
                {{ questionIndex + 1 }} . {{ currentQuestion.title }}

                <div
                    class="bg-red-500 rounded p-4 text-white text-lg mt-6 -mb-12 shake"
                    v-if="hasFalseAnswer"
                >
                    Oups, mauvaise réponse..<br />
                    Indice : {{ currentQuestion.indice }}
                </div>
            </div>
            <div
                :class="
                    isSelected(index)
                        ? 'bg-green-500 text-white hover:bg-red-500 '
                        : 'hover:bg-green-400 hover:text-white'
                "
                class="flex flex-row w-full px-4 py-2 shadow-lg bg-gray-100 rounded mb-3 cursor-pointer"
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                v-on:click="toggleAnswer(index)"
            >
                <div class="mr-4">{{ index + 1 }}</div>
                <div class="flex-1">{{ option.title }}</div>
            </div>

            <button
                class="button"
                :disabled="currentAnswer.length == 0"
                v-on:click="confirm()"
            >
                Confirmer
            </button>
        </div>

        <div
            class="flex flex-col flex-1 justify-center items-center w-full text-center"
            v-else-if="isFinished()"
        >
            <h1 class="text-2xl font-bold mb-12 text-green-500">
                Bravo, tu as terminé !
            </h1>
            <div class="text-lg">
                On espère que tu as appris beaucoup de choses, à bientôt !
            </div>
        </div>
        <div
            class="flex-1 flex flex-col justify-center items-center text-center my-12 w-full"
            v-else
        >
            Avant de commencer le questionnaire,<br />
            quel est ton nom et ton prénom ?

            <input
                class="input mt-4"
                placeholder="Ecris ici ton nom et ton prénom"
                v-model="report.name"
            />

            <button
                :disabled="!report.name"
                :class="{ 'hover:bg-blue-600 shadow-lg': report.name }"
                class="button"
                v-on:click="start()"
            >
                Commencer
            </button>
        </div>

        <transition name="fade" v-on:enter="displayModal = true">
            <div
                class="absolute w-screen h-screen z-50 top-0 overflow-hidden"
                v-if="mustDisplayFeedback"
            >
                <div
                    class="w-full h-full flex justify-center items-center"
                    style="background: rgba(0, 0, 0, 0.7)"
                >
                    <transition
                        name="slideFromRight"
                        v-on:leave="mustDisplayFeedback = false"
                    >
                        <div
                            v-if="displayModal"
                            class="relative flex flex-row justify-center items-center transition-all duration-300"
                            style="max-width: 600px"
                        >
                            <div
                                class="w-[210px] min-h-[160px] mr-6 bg-gray-300 flex-shrink-0 rounded-lg shadow-lg overflow-hidden"
                            >
                                <img
                                    class="w-full h-full"
                                    v-if="currentQuestion.imageURL"
                                    :src="currentQuestion.imageURL"
                                />
                                <video class="w-full h-full" autoplay onclick="this.play()"
                                    v-if="currentQuestion.videoURL"
                                    :src="currentQuestion.videoURL" >
                                </video>
                            </div>
                            <div class="bg-gray-200 p-6 rounded">
                                <div
                                    class="text-green-500 font-bold mb-4 text-lg"
                                >
                                    Bonne réponse !
                                </div>
                                <div>
                                    {{ currentQuestion.feedbackText }}
                                </div>
                                <div class="mt-2">
                                    <button
                                        class="button"
                                        v-on:click="nextQuestion()"
                                    >
                                        {{
                                            questionIndex ==
                                            qcm.questions.length - 1
                                                ? "Terminer"
                                                : "Question suivante"
                                        }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" src="./QCMComponent.ts" />
