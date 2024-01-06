import { Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiGetService } from 'src/app/shared/services/api-get.service';
import { ApiPostService } from 'src/app/shared/services/api-post.service';
import { ButtonService } from 'src/app/shared/services/button.service';
import { EncryptationService } from 'src/app/shared/services/encryptation.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { environments } from 'src/environments/environments';

@Component({
  selector: 'app-sales',
  templateUrl: './devoluciones-form.component.html',
  styleUrls: ['./devoluciones-form.component.scss']
})
export class DevolucionesFormComponent {

  
  private fb = inject(FormBuilder); 
  private auth = inject(AuthService); 
  private apiPost = inject(ApiPostService);
  private modalService = inject(ModalService);
  private buttonService = inject(ButtonService);
  public  encryptation = inject(EncryptationService);
  private loader = inject(LoaderService);
  private utilities = inject(UtilitiesService)
  private apiGet = inject(ApiGetService);


  private baseUrl: string = environments.baseUrl;

  constructor(
    private router: Router
  ) {}

  arraySelects: any = {
    selects: [
      {
        value: 0,
        name: '0',
      },
      {
        value: 1,
        name: '1',
      },
      {
        value: 2,
        name: '2',
      },
      {
        value: 3,
        name: '3',
      },
      {
        value: 4,
        name: '4',
      },
      {
        value: 5,
        name: '5',
      },
      {
        value: 6,
        name: '6',
      },
      {
        value: 7,
        name: '7',
      },
      {
        value: 8,
        name: '8',
      },
      {
        value: 9,
        name: '9',
      },
      {
        value: 10,
        name: '10',
      },
      {
        value: 11,
        name: '11',
      },
      {
        value: 12,
        name: '12',
      },
      {
        value: 13,
        name: '13',
      },
      {
        value: 14,
        name: '14',
      },
      {
        value: 15,
        name: '15',
      },
      {
        value: 16,
        name: '16',
      },
      {
        value: 17,
        name: '17',
      },
      {
        value: 18,
        name: '18',
      },
      {
        value: 19,
        name: '19',
      },
      {
        value: 20,
        name: '20',
      },
      {
        value: 21,
        name: '21',
      },
      {
        value: 22,
        name: '22',
      },
      {
        value: 23,
        name: '23',
      },
      {
        value: 24,
        name: '24',
      },
      {
        value: 25,
        name: '25',
      },
      {
        value: 26,
        name: '26',
      },
      {
        value: 27,
        name: '27',
      },
      {
        value: 28,
        name: '28',
      },
      {
        value: 29,
        name: '29',
      },
      {
        value: 30,
        name: '30',
      },
      {
        value: 31,
        name: '31',
      },
      {
        value: 32,
        name: '32',
      },
      {
        value: 33,
        name: '33',
      },
      {
        value: 34,
        name: '34',
      },
      {
        value: 35,
        name: '35',
      },
      {
        value: 36,
        name: '36',
      },
      {
        value: 37,
        name: '37',
      },
      {
        value: 38,
        name: '38',
      },
      {
        value: 39,
        name: '39',
      },
      {
        value: 40,
        name: '40',
      },
      {
        value: 41,
        name: '41',
      },
      {
        value: 42,
        name: '42',
      },
      {
        value: 43,
        name: '43',
      },
      {
        value: 44,
        name: '44',
      },
      {
        value: 45,
        name: '45',
      },
      {
        value: 46,
        name: '46',
      },
      {
        value: 47,
        name: '47',
      },
      {
        value: 48,
        name: '48',
      },
      {
        value: 49,
        name: '49',
      },
      {
        value: 50,
        name: '50',
      },
      {
        value: 51,
        name: '51',
      },
      {
        value: 52,
        name: '52',
      },
      {
        value: 53,
        name: '53',
      },
      {
        value: 54,
        name: '54',
      },
      {
        value: 55,
        name: '55',
      },
      {
        value: 56,
        name: '56',
      },
      {
        value: 57,
        name: '57',
      },
      {
        value: 58,
        name: '58',
      },
      {
        value: 59,
        name: '59',
      },
      {
        value: 60,
        name: '60',
      },
      {
        value: 61,
        name: '61',
      },
      {
        value: 62,
        name: '62',
      },
      {
        value: 63,
        name: '63',
      },
      {
        value: 64,
        name: '64',
      },
      {
        value: 65,
        name: '65',
      },
      {
        value: 66,
        name: '66',
      },
      {
        value: 67,
        name: '67',
      },
      {
        value: 68,
        name: '68',
      },
      {
        value: 69,
        name: '69',
      },
      {
        value: 70,
        name: '70',
      },
      {
        value: 71,
        name: '71',
      },
      {
        value: 72,
        name: '72',
      },
      {
        value: 73,
        name: '73',
      },
      {
        value: 74,
        name: '74',
      },
      {
        value: 75,
        name: '75',
      },
      {
        value: 76,
        name: '76',
      },
      {
        value: 77,
        name: '77',
      },
      {
        value: 78,
        name: '78',
      },
      {
        value: 79,
        name: '79',
      },
      {
        value: 80,
        name: '80',
      },
      {
        value: 81,
        name: '81',
      },
      {
        value: 82,
        name: '82',
      },
      {
        value: 83,
        name: '83',
      },
      {
        value: 84,
        name: '84',
      },
      {
        value: 85,
        name: '85',
      },
      {
        value: 86,
        name: '86',
      },
      {
        value: 87,
        name: '87',
      },
      {
        value: 88,
        name: '88',
      },
      {
        value: 89,
        name: '89',
      },
      {
        value: 90,
        name: '90',
      },
      {
        value: 91,
        name: '91',
      },
      {
        value: 92,
        name: '92',
      },
      {
        value: 93,
        name: '93',
      },
      {
        value: 94,
        name: '94',
      },
      {
        value: 95,
        name: '95',
      },
      {
        value: 96,
        name: '96',
      },
      {
        value: 97,
        name: '97',
      },
      {
        value: 98,
        name: '98',
      },
      {
        value: 99,
        name: '99',
      },
      {
        value: 100,
        name: '100',
      }
    ]
    
  }

  public data: any = {};
  public page: number = 0;
  p: number = 1;
  token!: string;
  search: string = '';

  quantities: { [index: number]: number } = {};
  total = signal(0);
  valid: boolean = false;
  validProduct: boolean = false;
  existProduct: boolean = false;

  codigoBuscado: string = '';

  cantidadProducto: number = 1;
  multiplicador: number = 2;
  private subscriptions$ = new Subscription();

  productosFiltrados: any[] = [];
  productos: any[] = [];


  onCantidadChange(producto: any, index: number) {
    const indexEnProductosFiltrados = this.productosFiltrados.findIndex((item) => item.codigo === producto.codigo);
    let cantidad = this.quantities[index];
    
    if (producto.cantidad < cantidad) {
      console.log(producto.cantidad);
      console.log(cantidad);
      console.log("Es mayor a la cantidad solicitada")
    }else{
      console.log(producto.cantidad);
      console.log(cantidad);
      console.log("Es menor");
    }
    
    this.productosFiltrados[indexEnProductosFiltrados].total = producto.precio_por_unidad * cantidad;
    this.productosFiltrados[indexEnProductosFiltrados].cantidad = cantidad;
    this.actualizarTotalGeneral();
  }

  
  private actualizarTotalGeneral() {
    const totalGeneral = this.calcularTotalGeneral();
    this.total.set(totalGeneral);
  }

  calcularTotalGeneral() {
    return this.productosFiltrados.reduce((total, producto) => total + Number(producto.total),0);
  }

  ngOnInit(): void {
  
    this.loader.setLoader(true);

    this.subscriptions$.add(
      this.auth.getUsuario.subscribe(usuario => { 
        this.token = 'Bearer '+ usuario.token; 
      })
    );
 
    const UrlApi = `${this.baseUrl}/api/v1/ventas`;
    const headers = {'Authorization': this.token};

    this.subscriptions$.add(
      this.apiGet.getDebtInfo(UrlApi, headers)
      .subscribe((resp)=>{
        this.loader.setLoader(false);
        this.data = resp
        //console.log(this.data);
        
      })
    );
   
  }

  ngOnDestroy(): void{
    if (this.subscriptions$) this.subscriptions$.unsubscribe();
    this.loader.setLoader(false);
  };

  activateSale(id:any, data: any){
    data.loading =  true;

    const UrlApi = `${this.baseUrl}/api/v1/factura`;

    // const paramsBody = {
    //   id: id,
    // };

    // const headers = {'Authorization': this.token};

    // this.apiPost.getDebtInfo(UrlApi, paramsBody, headers)
    // .subscribe((resp)=>{
    //   console.log(resp);    
    // })

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", this.token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("id", id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: undefined
    };

    
    fetch(UrlApi, requestOptions)
      .then(response => response.text())
      .then(result => {
        data.loading =  false;
        window.location.reload();
      })
      .catch(error => console.log('error', error));

  }

  redirigirAPagina(url: string) {
    window.location.href = url;
  }
  nextPage(){
    this.page += 5;
  }

  prevPage(){
    if (this.page > 0) {
      this.page -= 5;
    }
  }

  doSomething(){
    this.router.navigate(['/home/devolucion']);
  }

  onEnterPressed() {
    const productosEncontrados = this.productos.filter((elemento: any) => elemento.codigo === this.codigoBuscado);
  
    if (productosEncontrados.length > 0) {
      if (productosEncontrados[0].existente_en_almacen === 0) {
        this.existProduct = true;
        return;
        } else {
        this.existProduct = false;
        }
    }
    this.valid = productosEncontrados.length === 0;
    this.validProduct = productosEncontrados.length > 0;
    this.codigoBuscado = '';
    if (productosEncontrados.length > 0) {
      const existingIndex = this.productosFiltrados.findIndex((item) => item.codigo === productosEncontrados[0].codigo);
      if (existingIndex === -1) {
        this.productosFiltrados.push(...productosEncontrados);
        this.actualizarTotalGeneral();
        this.validProduct = false;
      } else {
        this.validProduct = true;
      }
    }
  }

}


