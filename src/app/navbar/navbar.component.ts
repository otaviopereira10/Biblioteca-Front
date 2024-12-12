import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Adicione isso!
import { FormsModule } from '@angular/forms'; // Para ngModel
import { CommonModule } from '@angular/common'; // Para *ngIf e *ngFor

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  searchBook(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.http.get<any[]>(`http://localhost:8080/livro?query=${encodeURIComponent(this.searchTerm)}`)
      .subscribe(
        (results) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Erro ao buscar livros:', error);
        }
      );
  }
}
