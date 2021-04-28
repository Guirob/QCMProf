<template>
    <div
        class="w-[800px] flex flex-col items-center justify-center m-auto my-6 relative"
    >
        <h1 class="text-2xl font-bold mb-6 px-6 py-3 w-full text-center">
            <div
                class="text-sm font-bold bg-gray-100 shadow absolute left-0 top-0 mt-4 px-3 py-1 cursor-pointer rounded"
                v-on:click="back()"
            >
                &larr; Retour
            </div>
            Participations au QCM
        </h1>

        <div class="flex flex-row w-full">
            <div class="w-1/3 mr-3">
                <div
                    class="text-left w-full bg-gray-300 rounded font-bold text-lg mb-4 px-3 py-1"
                >
                    Participants {{ currentReportIndex }}
                </div>
                <div
                    class="text-left w-full rounded shadow px-3 py-1 mb-2 hover:scale-105 cursor-pointer transform duration-200"
                    v-for="(report, index) in reports"
                    v-on:click="currentReportIndex = index"
                    :key="index"
                    :class="
                        report == currentReport
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                    "
                >
                    {{ report.name }}
                </div>
            </div>
            <div class="w-2/3 ml-3">
                <div
                    class="text-left w-full bg-gray-300 rounded font-bold text-lg mb-4 px-3 py-1"
                >
                    Participants
                </div>
                <div class="bg-gray-100 px-6 py-6 w-full rounded shadow">
                    <div v-if="currentReport">
                        <div
                            class="mb-8"
                            v-for="(answer, a) in currentReport.answers"
                            :key="a"
                        >
                            <div
                                class="bg-gray-200 font-bold px-3 py-1 rounded"
                            >
                                {{ getQuestionText(answer) }}
                            </div>

                            <div
                                class=""
                                v-for="(history, h) in answer.history"
                                :key="h"
                            >
                                <div class="text-xs mt-4 mb-4">
                                    TENTATIVE {{ h + 1 }}
                                </div>
                                <div
                                    class="px-3 py-1 mb-3 shadow rounded text-white"
                                    :class="
                                        isGoodOption(answer, ans)
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                    "
                                    v-for="(ans, s) in history"
                                    :key="s"
                                >
                                    {{ getResponseText(answer, ans) }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center py-32 px-16" v-else>
                        Sélectionnez un participant pour voir ses résultats
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./QCMReports.ts" />
 