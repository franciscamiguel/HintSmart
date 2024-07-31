import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig, Translation } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smarthint';

  constructor(
    private config: PrimeNGConfig, 
    private http: HttpClient,
  ) {
    this.http.get('../assets/translate/pt-br.json', { responseType: "json" }).subscribe({
      next: (response: Translation) => {
        this.config.setTranslation(response);
      },
      error: (response) => {
        console.error(response);
      }
    });
  }
}
