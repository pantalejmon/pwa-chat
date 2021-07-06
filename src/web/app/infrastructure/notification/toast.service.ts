import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {
  }

  showError(info: string) {
    this.messageService.add({
      severity: 'error',
      summary: `${info}`,
    });
  }

  showSuccess(info: string) {
    this.messageService.add({
      severity: 'error',
      summary: `${info}`,
    });
  }
}
