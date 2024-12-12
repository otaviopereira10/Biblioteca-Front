import { Ilivro } from './model/ilivro';
import { HttpClient } from '@angular/common/http'; // Cliente HTTP para comunicação com a API
import { Injectable } from '@angular/core'; // Para tornar o serviço injetável
import { Observable, catchError, of } from 'rxjs'; // Gerenciamento de fluxos assíncronos e erros
import { livro } from './model/data/mock-dados';


@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private apiUrl = 'http://localhost:8080/livro'; // URL da API Spring Boot

  constructor(private http: HttpClient) {}

  // Método para obter todos os livro da API
  getLivro(): Observable<Ilivro[]> {
    return this.http.get<Ilivro[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao buscar posts da API, usando livro locais:', error);
        return of(livro); // Retorna os dados locais como Observable
      })
    );
  }

 // Método para obter um livro por ID da API
  geLivrotById(id: number): Observable<Ilivro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ilivro>(url).pipe(
      catchError((error) => {
        console.error(`Erro ao buscar o livro com ID ${id}:`, error);
        return of(null as any); // Retorna null como Observable em caso de erro
      })
    );
  }

  // Método para adicionar um novo livro à API
  addLivro(newPost: Ilivro): Observable<Ilivro> {
    return this.http.post<Ilivro>(this.apiUrl, newPost).pipe(
      catchError((error) => {
        console.error('Erro ao adicionar um novo livro:', error);
        return of(null as any); // Retorna null como Observable em caso de erro
      })
    );
  }

  // Método para atualizar um livro existente na API
  updateLivro(updatedPost: Ilivro): Observable<Ilivro> {
    const url = `${this.apiUrl}/${updatedPost.id}`;
    return this.http.put<Ilivro>(url, updatedPost).pipe(
      catchError((error) => {
        console.error(`Erro ao atualizar  o livro com ID ${updatedPost.id}:`, error);
        return of(null as any); // Retorna null como Observable em caso de erro
      })
    );
  }

  // Método para deletar um livro por ID na API
  deleteLivro(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error(`Erro ao deletar o post com ID ${id}:`, error);
        return of(); // Retorna um Observable vazio em caso de erro
      })
    );
  }
}
