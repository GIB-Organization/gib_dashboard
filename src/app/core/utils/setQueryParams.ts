import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EQueryParams } from '../enums/routes.enum';
import { HttpParams } from '@angular/common/http';

export function navigateToCurrentRouteWithNewQueryParams(route:ActivatedRoute, router:Router, redirectRoute:string) {
    const extras: NavigationExtras = {
        relativeTo: route,
        queryParams: { [EQueryParams.redirectTo]: redirectRoute },
        queryParamsHandling: 'merge'
    };
    router.navigate([], extras);
}

export function setUrlQueryParams(params:{}){
    let httpParams = new HttpParams()
    for(let item in params){
      httpParams = httpParams.set(item, (params as any)[item])
    }
    return httpParams
}