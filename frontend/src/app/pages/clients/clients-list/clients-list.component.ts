import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService, Client } from '../../../services/client.service';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  errorMessage = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (res) => (this.clients = res),
      error: (err) => {
        this.errorMessage = 'Erro ao carregar clientes';
        console.error(err);
      },
    });
  }

  deleteClient(id: number): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => this.loadClients(),
        error: (err) => {
          this.errorMessage = 'Erro ao deletar cliente';
          console.error(err);
        },
      });
    }
  }
}
