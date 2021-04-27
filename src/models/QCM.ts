import { Option } from "./Option";
import { Question } from "./Question";

export class QCM {
    public id = "";
    public title = "";
    public subtitle = "";
    public questions: Question[] = [];

    public map() {
        this.questions.forEach((a) => {
            if (a.options) {
                a.options = a.options.map((o) => {
                    return Object.assign(new Option(), o);
                });
            } else {
                a.options = [];
            }
        });
    }
}
