import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);
  addSuccess(message:string = 'successProccess'){
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('success'),
      detail:  message ? this.translate.instant(message): message
    })
  }
  addError(message:string = 'errorProccess'){
    this.messageService.add({
      severity: 'error',
      summary:  this.translate.instant('error'),
      detail:  message ? this.translate.instant(message) : message
    })
  }
}
