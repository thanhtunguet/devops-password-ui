import {Repository} from 'react3l';
import type {Observable} from 'rxjs';
import {httpConfig} from 'src/config/repository';

export class PasswordRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = window.location.origin;
  }

  changePassword(
    username: string,
    password: string,
    newPassword: string,
  ): Observable<PasswordRepository.PasswordChangeResponse> {
    return this.http
      .post('/api/change-password', {
        username,
        password,
        newPassword,
      })
      .pipe(
        Repository.responseDataMapper<PasswordRepository.PasswordChangeResponse>(),
      );
  }
}

export const passwordRepository = new PasswordRepository();

export namespace PasswordRepository {
  export interface PasswordChangeResponse {
    status: 'success' | 'error';
    message?: string;
  }
}
