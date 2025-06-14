import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService, Client } from '../../../services/client.service';

@Component({
    selector: 'app-clients-form',
    imports: [CommonModule, FormsModule],
    templateUrl: './clients-form.component.html',
    styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {
  client: Client = { name: '', email: '' };
  isEditMode = false;
  id?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.isEditMode = true;
      this.clientService.getClientById(this.id).subscribe({
        next: (res: Client) => (this.client = res),
        error: (err: any) => console.error('Erro ao buscar cliente', err),
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.clientService.updateClient(this.id!, this.client).subscribe({
        next: (res: Client) => this.router.navigate(['/']),
        error: (err: any) => console.error('Erro ao atualizar', err),
      });
    } else {
      this.clientService.createClient(this.client).subscribe({
        next: (res: Client) => this.router.navigate(['/']),
        error: (err: any) => console.error('Erro ao criar', err),
      });
    }
  }
}
