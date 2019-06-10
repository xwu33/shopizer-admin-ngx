import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { CrudService } from '../../shared/services/crud.service';
import { UserService } from '../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUserUrl = '/v1/private/login';

  constructor(
    private tokenService: TokenService,
    private crudService: CrudService,
    private userService: UserService
  ) {
  }

  logon(username: string, password: string): Observable<any> {
    return this.crudService.post(this.loginUserUrl, { username, password });
  }

  logout() {
    this.tokenService.destroyToken();
    this.userService.destroyUserId();
  }

  refresh(): Observable<any> {
    return this.crudService.get('/v1/auth/refresh');
  }

}
