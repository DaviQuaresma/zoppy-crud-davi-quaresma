import { Component, OnInit } from '@angular/core';
import { ClientService, Client } from '../../../services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
  imports: [CommonModule],
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  loading = true;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (res: Client[]) => {
        // console.log('CLIENTES RECEBIDOS', res);
        this.clients = res;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
