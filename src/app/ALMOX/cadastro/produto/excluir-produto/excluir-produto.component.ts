import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-excluir-produto',
  templateUrl: './excluir-produto.component.html',
  styleUrls: ['./excluir-produto.component.scss']
})
export class ExcluirProdutoComponent implements OnInit {
  items: Array<any>;
  mapa: Mapa = new Mapa();
  itens_mapa;
  cod;
  lOk: boolean;
  statusOptions: Array<PoSelectOption>

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.excluirProduto()
  }

  excluirProduto() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
      var produtos = [];
      this.almoxService.getProductid(id).subscribe(dados => {
        this.itens_mapa = [];
        this.itens_mapa = dados
        debugger
        this.items = this.itens_mapa
       .map( data => {
          return {
            cod: data.cod,
            //datent: data.datent,
            descprod: data.descprod,
            //datsaida: data.datsaida,
            estminimo: data.estminimo,
            unimed: data.unimed,
            valunit: data.valunit
          }
      });
      if (this.items.length > 0) {
        for(var i = 0; i < this.items.length; i++){
          this.mapa.codprod = this.items[i].cod;
          this.mapa.descprod = this.items[i].descprod;
          this.mapa.valunit = this.items[i].valunit;
          this.mapa.estminimo = this.items[i].estminimo;
          this.mapa.unimed = this.items[i].unimed;
          this.mapa.estminimo = this.items[i].estminimo;
        }
      }
      })
    }
    Exclui() {
      this.almoxService.deleteProduct(this.mapa.codprod).subscribe(() => {
        this.lOk = true
        this.router.navigate(["/produto"]);
        this.poNotification.success("Registro ecluido com sucesso!");
      })

      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

      // Aguarda 5 segundos
      sleep(5000).then(() => {
        if (!this.lOk) {
          this.poNotification.error("Erro na inclus??o!");
        }
      });
    }

    CancelProd(){
      this.router.navigate(['produto']);
    }

    readonly SelUnimed: Array<PoSelectOption> = [
      { label: 'Caixa', value: 'CX' },
      { label: 'Unidade', value: 'UN' },
      { label: 'Gal??o', value: 'GL' },
      { label: 'Pe??a', value: 'PC' },
      { label: 'Pacote', value: 'PT' },
      { label: 'Fardo', value: 'FD' },
      { label: 'Par', value: 'PR' },
    ];

}
