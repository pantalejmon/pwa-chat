import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../infrastructure/theme/theme.service";
import {EventService} from "../../infrastructure/event/event.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  darkSwitch = false;

  constructor(private eventService: EventService,
              private themeService: ThemeService) {
    this.eventService.getEvent().subscribe(value => {
      if (value && value.text === 'theme') {
        this.reloadThemeSwitch();
      }
    });
  }


  ngOnInit(): void {
    this.reloadThemeSwitch();
  }

  reloadThemeSwitch() {
    this.darkSwitch = this.themeService.getDarkThemeStatus();
  }


  changeTheme() {
    this.themeService.changeTheme(this.darkSwitch);
  }
}
