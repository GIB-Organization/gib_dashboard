import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { FilterApiService } from '../filterApi/filter-api.service';
import { HttpClient } from '@angular/common/http';
import { ITicket, IFilter, IPagingResponse, IResponse, ITicketReply, IMessage, ITicketsMetrics } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private filterService = inject(FilterApiService);
  private path = 'tickets'
  private http = inject(HttpClient)
  
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  getTickets(data:IFilter): Observable<IPagingResponse<ITicket[]>>{
    return this.filterService.getFilteredData(`${this.baseUrl}/${this.path}/getTickets`, data);
  }
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  exportTickets(data:IFilter):Observable<IResponse<string>>{
    return this.filterService.exportFilteredData(`${this.baseUrl}/${this.path}/exportTickets`, data) as Observable<IResponse<string>>;
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  getTicket(id:string):Observable<IResponse<ITicket>>{
    return this.http.get<IResponse<ITicket>>(`${this.baseUrl}/${this.path}/getTicket?id=${id}`);
  }
  /**
   * @returns Observable
   */
  getTicketsMetrics():Observable<IResponse<ITicketsMetrics>>{
    return this.http.get<IResponse<ITicketsMetrics>>(`${this.baseUrl}/${this.path}/getTicketsMetrics`);
  }
  /**
   * @param  {ITicketReply} data
   * @returns Observable
   */
  replyTicket(data:ITicketReply):Observable<IResponse<IMessage>>{
    return this.http.post<IResponse<IMessage>>(`${this.baseUrl}/${this.path}/replyTicket`, data);
  }
}
