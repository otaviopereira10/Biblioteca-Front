import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Ilivro } from '@app/service/model/ilivro';
import { Router } from '@angular/router';
import { LivroService } from '@app/service/livroservice';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-livro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [LivroService],
  templateUrl: './form-livro.component.html',
  styleUrls: ['./form-livro.component.scss']
})
export class FormComponent {
  livro: Ilivro = {
    title: '',
    price: '',
    imageUrl: '',
  };

  constructor(private livroService: LivroService, private router: Router) {}

  // Método para enviar o formulário
  onSubmit(): void {
    // Enviar o produto ao serviço LivroService
    this.livroService.addLivro(this.livro).subscribe(
      (response) => {
        Swal.fire({
          title: "Item Cadastrado!",
          text: "success",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
      },
      (error: any) => {
        console.error('Erro ao adicionar o produto:', error);
      }
    );
  }
}
