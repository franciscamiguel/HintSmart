import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Costumer } from '../../../models/costumer';
import { PaginatedResult } from '../../../models/Pagination';
import { CostumerService } from '../../../services/costumer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    CommonModule,
    TableModule,
    TagModule,
    ToastModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DatePipe
  ],
  providers: [CostumerService, MessageService],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent implements OnInit {
  loading = false;
  searchValue = '';
  data?: PaginatedResult<Costumer[]>;

  constructor(
    private router: Router,
    private appService: CostumerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    
  }

  loadCostumers(ev: TableLazyLoadEvent){
    this.loading = true;

    this.appService
      .getClients(ev)
      .subscribe({
        next: (paginatedResult: PaginatedResult<Costumer[]>) => {
          this.data = paginatedResult;
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao listar os clientes' });
        }
      })
      .add(() => this.loading = false);
  }

  newCostumer(){
    this.router.navigate(['/clientes/novo']);
  }

  editCostumer(id: number){
    this.router.navigate([`/clientes/${id}`]);
  }
}
