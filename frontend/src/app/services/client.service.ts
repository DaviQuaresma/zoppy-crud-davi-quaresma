import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  cep: string;
  cnpj: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3050/clients';

  constructor(private http: HttpClient) {}

  getClients(
    search: string = '',
    page: number = 1,
    limit: number = 4
  ): Observable<Client[]> {
    const params = {
      search,
      page: page.toString(),
      limit: limit.toString(),
    };
    return this.http.get<Client[]>(this.apiUrl, { params });
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
