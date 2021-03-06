import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeService} from "../../infrastructure/theme/theme.service";
import {EventService} from "../../infrastructure/event/event.service";
import {filter} from "rxjs/operators";
import {CHANGE_THEME_EVENT} from "../../infrastructure/event/event.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

  darkSwitch = false;

  constructor(private eventService: EventService,
              private themeService: ThemeService) {
    this.eventService
      .getEvent()
      .pipe(filter(value => value === CHANGE_THEME_EVENT))
      .subscribe(() => this.reloadThemeSwitch());
  }

  ngOnInit() {
    this.reloadThemeSwitch();
  }

  reloadThemeSwitch() {
    this.darkSwitch = this.themeService.getDarkThemeStatus();
  }

  changeTheme() {
    this.themeService.changeTheme(this.darkSwitch);
  }

  onMenuButtonClick(event: Event) {
    this.menuButtonClick.emit();
    event.preventDefault();
  }
}
