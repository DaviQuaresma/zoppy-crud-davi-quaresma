import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService, Client } from '../../../services/client.service';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css'],
})
export class ClientsFormComponent implements OnInit {
  client: Client = {
    name: '',
    email: '',
    phone: '',
    company: '',
    cep: '',
    cnpj: '',
  };
  
  errorMessage: string = '';
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

  goBack() {
  this.router.navigate(['/']);
}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.client.name || !this.client.email) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.client.email)) {
      this.errorMessage = 'Informe um e-mail válido.';
      return;
    }

    if (this.isEditMode) {
      this.clientService.updateClient(this.id!, this.client).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao atualizar';
        },
      });
    } else {
      this.clientService.createClient(this.client).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao criar';
        },
      });
    }
  }
}
