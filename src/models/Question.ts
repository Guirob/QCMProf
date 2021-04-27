import { Option } from './Option';

export class Question {
    public title = '';
    public options: Option[] = [];
    public indice = '';
    public videoURL = '';
    public imageURL = '';
    public _videoTmpFile?: File;
    public _imageTmpFile?: File;
    public feedbackText = '';
}
