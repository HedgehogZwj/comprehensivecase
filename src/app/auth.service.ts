import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {//学生用户服务
    isLoggedIn = false;
    login() {
        this.isLoggedIn = true;
    }
    logout() {
        this.isLoggedIn = false;
    }
    loggedIn() {
        return this.isLoggedIn;
    }
}