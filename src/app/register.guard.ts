import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { AdService } from "./admin.service";

@Injectable()
export class AdminGuard implements CanActivate {//管理员路由守卫
    constructor(private adService: AdService) {

    }

    canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean {
        if (!this.adService.loggedIn()) {
            alert();
        }
        return this.adService.loggedIn();
    }
}