import { QCM } from '@/models/QCM';
import FirebaseService from '@/services/FirebaseService';
import LoginService from '@/services/LoginService';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Login extends Vue {
    public email = '';
    public password = '';
    public hasError = false;
    public isLoading = false;

    async login() {
        this.hasError = false;
        this.isLoading = true;
        try {
            await LoginService.getInstance().login(this.email, this.password);
            this.$router.push({ name: 'qcm-list' });
        } catch (e) {
            this.hasError = true;
        }

        this.isLoading = false;
        this.password = '';
    }
}
