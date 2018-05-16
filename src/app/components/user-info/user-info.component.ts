import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: require('./user-info.component.html'),
  styleUrls: [require('./user-info.component.scss')]
})
export class UserInfoComponent implements OnInit {
  info = {};
  login: string;

  constructor(private userInfoService: UserInfoService) {}

  private getInfo() {
    this.userInfoService.getInfo().subscribe(data => (this.info = data));
  }

  loginChanged() {
    this.userInfoService.changeLogin(this.login);
    this.getInfo();
  }

  ngOnInit() {
    this.login = this.userInfoService.getLogin();
    this.getInfo();
  }
}
