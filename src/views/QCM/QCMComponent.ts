import { Answers } from '@/models/Answers';
import { QCM } from '@/models/QCM';
import { QCMReport } from '@/models/QCMReport';
import { Question } from '@/models/Question';
import FirebaseService from '@/services/FirebaseService';
import { Options, Vue } from 'vue-class-component';
import { Option } from '../../models/Option';

@Options({})
export default class QCMComponent extends Vue {
    public qcm: QCM = new QCM();
    public report: QCMReport = new QCMReport();
    public questionIndex = -1;
    public currentOptionAnswers: number[][] = [];
    public currentAnswer: number[] = [];
    public hasFalseAnswer = false;
    public mustDisplayFeedback = false;
    public displayModal = false;

    mounted() {
        FirebaseService.getInstance()
            .firebaseApp.database()
            .ref('qcm/' + this.$route.params.id)
            .on('value', (it) => {
                this.qcm = it.val() as QCM;
            });
    }

    start() {
        this.questionIndex = 0;
    }

    get currentQuestion(): Question | undefined {
        return this.qcm.questions[this.questionIndex];
    }

    public toggleAnswer(option: number) {
        const foundItem = this.currentAnswer.indexOf(option);
        if (foundItem >= 0) {
            this.currentAnswer.splice(foundItem, 1);
        } else {
            this.currentAnswer.push(option);
        }
    }

    public confirm() {
        this.hasFalseAnswer = false;
        let isGoodAnwser = true;
        this.currentAnswer.forEach((it) => {
            if (!this.currentQuestion?.options[it].isGoodOption) {
                isGoodAnwser = false;
            }
        });

        this.currentOptionAnswers.push(this.currentAnswer);
        this.currentAnswer = [];

        if (isGoodAnwser) {
            this.hasFalseAnswer = false;
            const anwser = new Answers();
            anwser.questionIndex = this.questionIndex;
            anwser.history = this.currentOptionAnswers;

            this.mustDisplayFeedback = true;
            this.currentOptionAnswers = [];
            this.report.answers.push(anwser);
        } else {
            setTimeout(() => {
                this.hasFalseAnswer = true;
            }, 100);
        }
    }

    public nextQuestion() {
        this.displayModal = false;
        this.questionIndex++;

        if (this.isFinished()) {
            FirebaseService.getInstance()
                .firebaseApp.database()
                .ref('qcm-reports/' + this.qcm.id + '/' + Math.floor(Math.random() * 10000000))
                .set(this.report);
        }
    }

    public isSelected(option: number) {
        return this.currentAnswer.indexOf(option) >= 0;
    }

    public isFinished() {
        return this.questionIndex >= this.qcm.questions.length;
    }
}
