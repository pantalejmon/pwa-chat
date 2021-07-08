import {Component, ElementRef} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {SwUpdate} from "@angular/service-worker";
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuActive = false;

  constructor(private primengConfig: PrimeNGConfig,
              elementRef: ElementRef,
              private updates: SwUpdate,
              private messageService: MessageService) {

    this.primengConfig.ripple = true;

    const hammertime = new Hammer(elementRef.nativeElement, {
      touchAction: 'auto',
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ]
    });

    hammertime.on('swiperight', () => this.menuActive = true);
    hammertime.on('swipeleft', () => this.menuActive = false);

    updates.available.subscribe(() => {
      updates.activateUpdate()
        .then(() => this.updateApp());
    });
  }

  updateApp() {
    document.location.reload();
  }

  onMenuButtonClick() {
    this.menuActive = !this.menuActive;
  }

  onMaskClick() {
    this.hideMenu();
  }

  hideMenu() {
    this.menuActive = false;
  }

}
