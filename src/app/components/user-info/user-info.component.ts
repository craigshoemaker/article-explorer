import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: require('./user-info.component.html'),
  styleUrls: [require('./user-info.component.scss')]
})
export class UserInfoComponent implements OnInit, OnDestroy {
  info = {};
  infoSubscription: Subscription;

  @Input()
  login: string;

  constructor(private userInfoService: UserInfoService) {}

  private getInfo() {
    this.infoSubscription = this.userInfoService
                                  .getInfo()
                                  .subscribe(data => this.info = JSON.parse(data._body));
  }

  loginChanged() {
    this.userInfoService.changeLogin(this.login);
    this.getInfo();
  }

  ngOnInit() {
    this.login = this.userInfoService.getLogin();
    this.getInfo();
  }

  ngOnDestroy() {
    this.infoSubscription.unsubscribe();
  }

}
