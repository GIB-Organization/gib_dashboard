import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { IResponse, IStatistics } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'statistics'
  private http = inject(HttpClient)
  
  getStatistics(): Observable<IResponse<IStatistics>>{
    return this.http.get<IResponse<IStatistics>>(`${this.baseUrl}/${this.path}/getStatistics`);
  }
}
