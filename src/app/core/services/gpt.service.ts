import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { showToast } from 'src/app/shared/utils/alert';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GptService {
  readonly URL = environment.backendUrl + '/ai';

  constructor(private readonly http: HttpClient) {}

  getText(prompt: string) {
    const body = { prompt: prompt };

    this.http.post(this.URL + '/text', body).pipe(
      catchError((err) => {
        showToast('error', err.error.message);
        return err.error;
      })
    );
  }
}
