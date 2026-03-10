import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TagService {
  private readonly http = inject(HttpClient);

  getTags(): Observable<{ tags: string[] }> {
    return this.http.get<{ tags: string[] }>('/tags');
  }
}