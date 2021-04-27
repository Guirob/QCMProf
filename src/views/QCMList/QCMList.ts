import { QCM } from "@/models/QCM";
import { Question } from "@/models/Question";
import FirebaseService from "@/services/FirebaseService";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class QCMList extends Vue {
    public qcmList: QCM[] = [];

    mounted() {
        FirebaseService.getInstance()
            .firebaseApp.database()
            .ref("qcm")
            .on("value", (it) => {
                const data = Object.keys(it.val()).map((a) => it.val()[a]);
                this.qcmList = data
                    .filter((it: any) => it != undefined)
                    .map((a) => {
                        const qcm = Object.assign(new QCM(), a);
                        qcm.map();
                        return qcm;
                    });
            });
    }

    deleteQCM(qcm: QCM) {
        if (confirm('Voulez vous vraiment supprimer le qcm "' + qcm.title + '" ?')) {
            // todo
        }
    }

    goTo(qcm: QCM) {
        this.$router.push({ name: "qcm-edit", params: { id: qcm.id } });
    }

    goToNewQCM() {
        this.$router.push({ name: "qcm-edit", params: { id: 0 } });
    }
}