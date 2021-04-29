import { QCM } from '@/models/QCM';
import { Question } from '@/models/Question';
import router from '@/router';
import FirebaseService from '@/services/FirebaseService';
import LoginService from '@/services/LoginService';
import { Options, Vue } from 'vue-class-component';
import { useToast } from 'vue-toastification';

@Options({})
export default class LoggedLayout extends Vue {
    logout() {
        LoginService.getInstance().logout();
        this.$router.push({ name: 'login' });
    }
}
