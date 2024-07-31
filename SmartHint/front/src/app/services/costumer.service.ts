import { HttpClient, HttpParams } from "@angular/common/http";
import { TableLazyLoadEvent } from "primeng/table";
import { Costumer } from "../models/costumer";
import { map, take } from "rxjs/operators";
import { PaginatedResult } from "../models/Pagination";
import { Injectable } from "@angular/core";
import { PersonType } from "@models/person-type";
import { Gender } from "@models/gender";

@Injectable()
export class CostumerService {
  private url = 'https://localhost:7000/Client';

  constructor(
    private http: HttpClient,
  ) { }

  getClients(ev: TableLazyLoadEvent) {
    const paginatedResult: PaginatedResult<Costumer[]> = new PaginatedResult<Costumer[]>();
    let params = new HttpParams;

    if(ev.first != null && ev.rows != null){
      params = params.append('page', ev.first);
      params = params.append('size', ev.rows);
    }

    if(ev.globalFilter != null && ev.globalFilter != '')
      params = params.append('term', ev.globalFilter?.toString());

    return this.http
      .get<Costumer[]>(`${this.url}/GetClients`, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body ?? [];
          if(response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') ?? '');
          }
          return paginatedResult;
        }));
  }

  getClientById(id: number) {
    return this.http
      .get<Costumer>(`${this.url}/GetClients/${id}`, { observe: 'response' })
      .pipe(
        take(1),
        map((response) => {
          return response.body ?? { };
        }));
  }

  getPersonTypes() {
    return this.http
      .get<PersonType[]>(`${this.url}/GetPersonTypes`, { observe: 'response' })
      .pipe(
        take(1),
        map((response) => {
          return response.body ?? [];
        }));
  }

  getGenders() {
    return this.http
      .get<Gender[]>(`${this.url}/GetGenders`, { observe: 'response' })
      .pipe(
        take(1),
        map((response) => {
          return response.body ?? [];
        }));
  }

  verifyEmail(email: string, id: number) {
    let params = new HttpParams;

    params = params.append('email', email);
    params = params.append('id', id);

    return this.http
      .get<boolean>(`${this.url}/VerifyEmail`, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          return response.body ?? false;
        }));
  }

  verifyCpfCnpj(cpf_cnpj: string, id: number) {
    let params = new HttpParams;

    params = params.append('cpf_cnpj', cpf_cnpj);
    params = params.append('id', id);
    
    return this.http
      .get<boolean>(`${this.url}/VerifyCpfCnpj`, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          return response.body ?? false;
        }));
  }

  save(costumer: Costumer) {
    return this.http
      .post<Costumer>(`${this.url}/Save`, costumer, { observe: 'response' })
      .pipe(take(1));
  }
}