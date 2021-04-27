import { QCM } from '@/models/QCM';
import { Question } from '@/models/Question';
import FirebaseService from '@/services/FirebaseService';
import { Options, Vue } from 'vue-class-component';
import { Option } from '../models/Option';
import { useToast } from 'vue-toastification';

@Options({})
export default class QCMForm extends Vue {
    public qcm: QCM = new QCM();
    public isLoading = true;
    public questionIndex = -1;
    public transitionName = 'fade';

    mounted() {
        FirebaseService.getInstance()
            .firebaseApp.database()
            .ref('qcm/' + this.$route.params.id)
            .on('value', (it) => {
                const data = it.val();
                if (data == null) {
                    this.qcm = new QCM();
                } else {
                    this.qcm = Object.assign(new QCM(), data);
                    this.qcm.map();
                }
                this.isLoading = false;
                if (this.qcm.questions.length) {
                    this.questionIndex = 0;
                }
                setTimeout(() => {
                    this.autoGrow();
                }, 50);
            });
    }

    public addQuestion() {
        this.qcm.questions.push(new Question());
        this.next();
    }

    public removeQuestion() {
        this.qcm.questions.splice(this.questionIndex, 1);
        if (this.questionIndex > this.qcm.questions.length - 1) {
            this.prev();
        }

        if (this.questionIndex < 0) {
            this.questionIndex = 0;
        }
    }

    public next() {
        this.transitionName = 'slide-next';
        this.questionIndex++;
        setTimeout(() => {
            this.autoGrow();
        }, 50);
    }

    public prev() {
        this.transitionName = 'slide-prev';
        this.questionIndex--;
        setTimeout(() => {
            this.autoGrow();
        }, 50);
    }

    public addOption(question: Question) {
        console.log(question);
        question.options.push(new Option());
    }

    public removeOption(question: Question, index: number) {
        question.options.splice(index, 1);
    }

    public async save() {
        this.isLoading = true;
        if (this.qcm.id.trim() == '') {
            this.qcm.id = this.generateRandomId();
        }

        const storageRef = FirebaseService.getInstance().firebaseApp.storage().ref();
        for (let index = 0; index < this.qcm.questions.length; index++) {
            const it = this.qcm.questions[index];
            it.options = it.options.filter((a) => {
                return a.title.trim().length > 0;
            });
            if (it._imageTmpFile) {
                const task = await storageRef.child('qcm/' + this.qcm.id + '/' + it._imageTmpFile.name).put(it._imageTmpFile);

                it.imageURL = await task.ref.getDownloadURL();
                it._imageTmpFile = undefined;
            }
            if (it._videoTmpFile) {
                const task = await storageRef.child('qcm/' + this.qcm.id + '/' + it._videoTmpFile.name).put(it._videoTmpFile);

                it.videoURL = await task.ref.getDownloadURL();
                it._videoTmpFile = undefined;
            }

            delete it._imageTmpFile;
            delete it._videoTmpFile;
        }

        await FirebaseService.getInstance()
            .firebaseApp.database()
            .ref('qcm/' + this.qcm.id)
            .set(this.qcm);

        const toast = useToast();
        toast.success('QCM sauvegardé');
        this.isLoading = false;
    }

    public autoGrow() {
        let element = this.$refs.title as HTMLElement;
        element.style.height = '5px';
        element.style.height = element.scrollHeight + 'px';
        element = this.$refs.subtitle as HTMLElement;
        element.style.height = '5px';
        element.style.height = element.scrollHeight + 'px';
        element = this.$refs.qTitle as HTMLElement;
        element.style.height = '5px';
        element.style.height = element.scrollHeight + 'px';
        element = this.$refs.qIndice as HTMLElement;
        element.style.height = '5px';
        element.style.height = element.scrollHeight + 'px';
        element = this.$refs.qFeedback as HTMLElement;
        element.style.height = '5px';
        element.style.height = element.scrollHeight + 'px';
    }

    public previousPage() {
        this.$router.back();
    }

    public handleUpload(el: any) {
        const file = el.target.files[0];
        const blobURL = URL.createObjectURL(file);
        if (file.type.indexOf('image') >= 0) {
            this.currentQuestion._imageTmpFile = file;
            this.currentQuestion._videoTmpFile = undefined;
            this.currentQuestion.imageURL = blobURL;
            this.currentQuestion.videoURL = '';
        } else {
            this.currentQuestion._imageTmpFile = undefined;
            this.currentQuestion._videoTmpFile = file;
            this.currentQuestion.videoURL = blobURL;
            this.currentQuestion.imageURL = '';
        }
        // document.querySelector('video').src = blobURL;
    }

    private generateRandomId() {
        const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        let id = '';

        for (let index = 0; index < 8; index++) {
            id += data[Math.floor(Math.random() * data.length)];
        }

        return id;
    }

    get currentQuestion() {
        return this.qcm.questions[this.questionIndex];
    }
}
