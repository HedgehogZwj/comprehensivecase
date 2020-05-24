import { Injectable } from "@angular/core";

@Injectable()
export class AdService {//管理服务
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