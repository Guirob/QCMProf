import { Answers } from '@/models/Answers';
import { Option } from '@/models/Option';
import { QCM } from '@/models/QCM';
import { QCMReport } from '@/models/QCMReport';
import { Question } from '@/models/Question';
import FirebaseService from '@/services/FirebaseService';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class QCMReports extends Vue {
    public qcm?: QCM;
    public reports: QCMReport[] = [];
    public currentReportIndex = -1;
    public isLoading = false;

    mounted() {
        this.qcm = new QCM();
        this.qcm.questions = [this.randomQuestion(1), this.randomQuestion(2), this.randomQuestion(3), this.randomQuestion(4)];

        this.reports = [this.randomReport(), this.randomReport(), this.randomReport()];
        console.log(this.qcm);
        /* FirebaseService.getInstance()
            .firebaseApp.database()
            .ref('qcm/' + this.$route.params.id)
            .on('value', (it) => {
                const data = it.val();
                if (data == null) {
                    this.qcm = new QCM();
                } else {
                    this.qcm = Object.assign(new QCM(), data);
                    this.qcm!.map();
                }
                this.isLoading = false;
            }); */

        /*
        FirebaseService.getInstance()
            .firebaseApp.database()
            .ref('qcm-reports/' + this.$route.params.id)
            .on('value', (it) => {
                this.reports = it.val();
            }); */
    }

    back() {
        this.$router.back();
    }

    randomQuestion(i: number): Question {
        const question = new Question();
        question.title = 'Question ' + i;
        question.options = [this.randomOption(1), this.randomOption(2), this.randomOption(3)];
        return question;
    }

    randomOption(i: number): Option {
        const option = new Option();
        option.title = 'Option ' + i;
        option.isGoodOption = Math.random() > 0.5;
        return option;
    }

    randomReport(): QCMReport {
        const report = new QCMReport();
        report.name = (Math.random() * 10000).toString();
        for (let index = 0; index < 3; index++) {
            const answer = new Answers();
            answer.questionIndex = Math.floor(Math.random() * this.qcm!.questions.length);
            answer.history = [[0], [1, 2], [0, 1, 2]];
            report.answers.push(answer);
        }
        return report;
    }

    getQuestionText(answer: Answers) {
        return this.qcm!.questions[answer.questionIndex].title;
    }

    getResponseText(answer: Answers, i: number) {
        return this.qcm!.questions[answer.questionIndex].options[i].title;
    }

    isGoodOption(answer: Answers, i: number) {
        return this.qcm!.questions[answer.questionIndex].options[i].isGoodOption;
    }

    get currentReport(): QCMReport {
        return this.reports[this.currentReportIndex];
    }
}
