import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import {
  getUserType,
  isAuthenticated,
} from 'src/app/auth/state/auth.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  isAuthenticated$?: Observable<boolean>;
  userType$?: Observable<any>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.userType$ = this.store.select(getUserType);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
