import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';

import { Costumer } from '@models/costumer';
import { Gender } from '@models/gender';
import { PersonType } from '@models/person-type';
import * as PERSON_TYPE from '@enums/PersonType';
import { CostumerService } from '@services/costumer.service';

@Component({
  selector: 'app-detalhe-cliente',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    CalendarModule,
    SelectButtonModule,
    PasswordModule,
  ],
  providers: [CostumerService, MessageService],
  templateUrl: './detalhe-cliente.component.html',
  styleUrl: './detalhe-cliente.component.scss'
})
export class DetalheClienteComponent implements OnInit{
  id?: number = 0;
  costumer = {} as Costumer;
  form!: FormGroup;
  personTypes: PersonType[] = [];
  genders: Gender[] = [];
  submitted: boolean = false;
  showContainer: boolean = false;
  mask = '999.999.999-99';
  situation: any[] = [{ label: 'Sim', value: true },{ label: 'Não', value: false }];
  password_aux ='';
  cpf_cpnj_already_in_use = false;
  email_already_in_use = false;

  get f(): any {
    return this.form?.controls;
  }

  constructor(
    private fb: FormBuilder,
    private costumerService: CostumerService,
    private messageService: MessageService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }

  console(){
    console.log(this.costumer)
  }

  ngOnInit(): void {
    this.validation();

    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id != null && id != '' && !isNaN(parseInt(id))){
      this.id = parseInt(id);
      this.costumerService
      .getClientById(this.id)
      .subscribe({
        next: (response: Costumer) => {
          this.costumer = response;
          this.costumer.data_nascimento = new Date(response.data_nascimento ?? '');
          this.toogleContainer(this.costumer.tipoPessoa ?? 0);
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar cliente' });
        }
      });
    }

    this.costumerService
      .getPersonTypes()
      .subscribe({
        next: (response: PersonType[]) => {
          this.personTypes = response;
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar tipos de pessoa' });
        }
      });

    this.costumerService
      .getGenders()
      .subscribe({
        next: (response: Gender[]) => {
          this.genders = response;
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar gêneros' });
        }
      });
  }

  toogleContainer(value: number){
    switch(value){
      case PERSON_TYPE.PersonType.LEGAL_PERSON:
        this.mask = "99.999.999/9999-99";
        this.showContainer = false;
        break;
      case PERSON_TYPE.PersonType.PHYSICAL_PERSON:
        this.mask = "999.999.999-99";
        this.showContainer = true;
        break;
    }
  }

  verifyEmail(){
    if(this.costumer.email == null || this.costumer.email == '')
      return;

    this
      .costumerService
      .verifyEmail(this.costumer.email, this.id ?? 0)
      .subscribe({
        next: (response: boolean) => {
          if(response){
            this.messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'O email inserido já está em uso!' });
            this.email_already_in_use = true;
            return;
          } else {
            this.email_already_in_use = false;
          }
        }
      });
  }

  verifyCpfCnpj(){
    if(this.costumer.cpf_cnpj == null || this.costumer.cpf_cnpj == ''){
      return;
    }

    this
      .costumerService
      .verifyCpfCnpj(this.costumer.cpf_cnpj, this.id ?? 0)
      .subscribe({
        next: (response: boolean) => {
          if(response){
            this.messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'O CPF/CNPJ inserido já está em uso!' });
            this.cpf_cpnj_already_in_use = true;
            return;
          } else {
            this.cpf_cpnj_already_in_use = false;
          }
        }
      });
  }

  cancel(){
    this.router.navigate(['/cilentes/lista']);
  }

  save(){
    if(this.email_already_in_use){
      this.messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'O email inserido já está em uso!' });
      return;
    }

    if(this.cpf_cpnj_already_in_use){
      this.messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'O CPF/CNPJ inserido já está em uso!' });
      return;
    }

    this.costumer = { ...this.form.value };
    this.costumer.id = this.id; // estará fora do form;

    this.costumerService
      .save(this.costumer)
      .subscribe({
        next: (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Alterações salvas!' });
          this.router.navigate(['/cilentes/lista']);
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao salvar alterações' });
        }
      });
  }

  public validation(): void {
    this.form = this.fb.group({
      id: [''],
      nome_razao: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      telefone: ['', [Validators.required, Validators.maxLength(11)]],
      tipoPessoa: ['', Validators.required],
      cpf_cnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      inscricao_estadual: ['', [this.requiredInscricaoEstadual, this.minLengthInscricaoEstadual, this.maxLengthInscricaoEstadual]],
      genero: ['', this.validateFieldsForPhysicalPerson],
      data_nascimento: ['', this.validateFieldsForPhysicalPerson],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirme_senha: ['', Validators.required],
      data_cadastro: [''],
      bloqueado: [''],
    });
  }

  validateFieldsForPhysicalPerson(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }
    
    if (formControl.parent.get('tipoPessoa')?.value?.id == PERSON_TYPE.PersonType.PHYSICAL_PERSON) {
      return Validators.required(formControl); 
    }
    return null;
  }

  requiredInscricaoEstadual(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }
    
    if (formControl.parent.get('tipoPessoa')?.value?.id == PERSON_TYPE.PersonType.LEGAL_PERSON) {
      return Validators.required(formControl); 
    }
    return null;
  }

  minLengthInscricaoEstadual(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }
    
    if (formControl.parent.get('tipoPessoa')?.value?.id == PERSON_TYPE.PersonType.LEGAL_PERSON) {
      return Validators.minLength(14);
    }
    return null;
  }

  maxLengthInscricaoEstadual(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }
    
    if (formControl.parent.get('tipoPessoa')?.value?.id == PERSON_TYPE.PersonType.LEGAL_PERSON) {
      return Validators.maxLength(14);
    }
    return null;
  }
}
