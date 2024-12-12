import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroService } from '@app/service/livroservice';
import { Ilivro } from '../service/model/ilivro'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [LivroService],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  livros: Ilivro[] = []; // Nome atualizado para refletir que é uma lista

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    // Busca todos os livros ao inicializar o componente
    this.livroService.getLivro().subscribe((livros) => {
      this.livros = livros; // Certifique-se de que a API retorna um array
    });
  }
}
