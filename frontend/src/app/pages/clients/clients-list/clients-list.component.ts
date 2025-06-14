import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService, Client } from '../../../services/client.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})

export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  searchTerm = '';
  currentPage = 1;
  limit = 4;
  hasMore = false;

  errorMessage = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService
      .getClients(this.searchTerm, this.currentPage, this.limit)
      .subscribe({
        next: (res) => {
          this.clients = res;
          this.hasMore = res.length === this.limit;
        },
        error: (err) => {
          console.error('Erro ao carregar clientes', err);
        },
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadClients();
  }

  nextPage(): void {
    if (this.hasMore) {
      this.currentPage++;
      this.loadClients();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadClients();
    }
  }

  deleteClient(id: number): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => this.loadClients(),
        error: (err) => console.error('Erro ao deletar cliente', err),
      });
    }
  }
}
