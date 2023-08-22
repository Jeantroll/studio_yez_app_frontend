import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { inputModel } from 'src/app/shared/models/input.model';
import { ApiGetService } from 'src/app/shared/services/api-get.service';
import { ApiPostService } from 'src/app/shared/services/api-post.service';
import { ApiPutService } from 'src/app/shared/services/api-put.service';
import { ButtonService } from 'src/app/shared/services/button.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { environments } from 'src/environments/environments';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss'],
})
export class SalesFormComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private apiPost = inject(ApiPostService);
  private apiPut = inject(ApiPutService);
  private apiGet = inject(ApiGetService);
  private modalService = inject(ModalService);
  private buttonService = inject(ButtonService);
  private router = inject(Router)
  private activateR = inject(ActivatedRoute)
  private loader = inject(LoaderService);
  private utilities = inject(UtilitiesService)


  // salesForm!: FormGroup;
  private baseUrl: string = environments.baseUrl;
  sub$!: Subscription;

  token!: string;
  saleId: string = '';
  sale!: any;


  // salesFormInit(): FormGroup {
  //   return this.fb.group({
  //     quantity: ['', [Validators.required]],
  //     wholesalePrice: ['', [Validators.required]],
  //     unitPrice: ['', [Validators.required]],
  //     sellingPrice: ['', [Validators.required]],
  //     salesperson: ['', [Validators.required]],
  //   });
  // }

  selects: any;

  salesForm: FormGroup = this.fb.group({
      products: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      wholesalePrice: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      sellingPrice: ['', [Validators.required]],
      salesperson: ['', [Validators.required]],
  });

  arrayInput1: inputModel = {
    labelExists: true,
    iconExists: false,
    decimal: false,
    name: 'Cantidad',
    placeholder: 'Cantidad',
    icon: 'fa-solid fa-hashtag',
    controlName: 'quantity',
    type: 'number',
  };

  arrayInput3: inputModel = {
    labelExists: true,
    iconExists: false,
    decimal: true,
    name: 'Precio mayorista',
    placeholder: 'Precio mayorista',
    icon: 'fa-solid fa-money-check-dollar',
    controlName: 'wholesalePrice',
    type: 'text',
  };

  arrayInput4: inputModel = {
    labelExists: true,
    iconExists: false,
    decimal: true,
    name: 'Precio unidad',
    placeholder: 'Precio unidad',
    icon: 'fa-solid fa-money-check-dollar',
    controlName: 'unitPrice',
    type: 'text',
  };

  arrayInput5: inputModel = {
    labelExists: true,
    iconExists: false,
    decimal: true,
    name: 'Precio venta',
    placeholder: 'Precio venta',
    icon: 'fa-solid fa-money-check-dollar',
    controlName: 'sellingPrice',
    type: 'text',
  };

  arrayInput6: inputModel = {
    labelExists: true,
    iconExists: false,
    decimal: false,
    name: 'Vendedor',
    placeholder: 'Vendedor',
    icon: 'fa-solid fa-user',
    controlName: 'salesperson',
    type: 'text',
  };

  ngOnInit(): void {
    this.sub$ = this.auth.getUsuario.subscribe((usuario) => {
      this.token = 'Bearer ' + usuario.token;
    });

    this.getProductos();

    this.saleId = this.activateR.snapshot.paramMap.get('id') as string;
    if (this.saleId) {
      this.getIDUrl();
    }
  }


  getProductos(){
    this.loader.setLoader(true);
    const UrlApi = `${this.baseUrl}/api/v1/productos`;
    const headers = {'Authorization': this.token};

    this.apiGet.getDebtInfo(UrlApi, headers)
    .subscribe((resp)=>{
      this.loader.setLoader(false);  
      this.selects = resp.data    
    })
  }

  getProductid(){
    const UrlApi = `${this.baseUrl}/api/v1/productos`;
    const headers = {'Authorization': this.token};

    this.apiGet.getDebtInfo(UrlApi, headers)
    .subscribe((resp)=>{
      this.loader.setLoader(false);  
      this.selects = resp.data    
    })
  }

  changeProduct(){

    const ocupacion = this.salesForm.get('products')?.value;
    this.onChangeOcupacion(parseInt(ocupacion));

  }

  onChangeOcupacion(product: number){

    const UrlApi = `${this.baseUrl}/api/v1/productos/${product}`;
    const headers = {'Authorization': this.token};

    this.apiGet.getDebtInfo(UrlApi, headers)
    .subscribe((resp)=>{ 
      console.log(resp); 
      this.salesForm.patchValue({
        wholesalePrice:  this.utilities.formatoMilesMillones(resp.data.precio_por_mayor?.toString()),
        unitPrice:  this.utilities.formatoMilesMillones(resp.data.precio_por_unidad?.toString())
      });   
    })

  }

  getIDUrl(){
    this.loader.setLoader(true);

    const UrlApi = `${this.baseUrl}/api/v1/ventas/${this.saleId}`;
    const headers = {'Authorization': this.token};

    this.apiGet.getDebtInfo(UrlApi, headers)
    .subscribe((resp)=>{
      this.loader.setLoader(false);
      this.sale = resp;  
      this.salesForm.patchValue({
        quantity: this.sale.data.cantidad ,
        wholesalePrice:  this.utilities.formatoMilesMillones(this.sale.data.precio_mayorista.toString()),
        unitPrice:  this.utilities.formatoMilesMillones(this.sale.data.precio_unidad.toString()),
        sellingPrice:  this.utilities.formatoMilesMillones(this.sale.data.precio_venta.toString()),
        salesperson: this.sale.data.vendedor,
      });  
    }) 
  }

  getSubmit() {
    const formData = this.salesForm.getRawValue();
    const currentDate: Date = new Date();
    const formattedDate: string = this.formatDate(currentDate);
  
    const paramsBody = {
      cantidad: formData.quantity,
      fecha: formattedDate,
      precio_mayorista: formData.wholesalePrice.replace(/\./g, ''),
      precio_unidad: formData.unitPrice.replace(/\./g, ''),
      precio_venta: formData.sellingPrice.replace(/\./g, ''),
      vendedor: formData.salesperson,
    };
  
    const headers = {
      Authorization: this.token,
    };
  
    const UrlApi = this.saleId
      ? `${this.baseUrl}/api/v1/ventas/${this.saleId}`
      : `${this.baseUrl}/api/v1/ventas`;
  
    const apiObservable = this.saleId
      ? this.apiPut.updateDebtInfo(UrlApi, paramsBody, headers)
      : this.apiPost.getDebtInfo(UrlApi, paramsBody, headers);
  
    apiObservable.subscribe(
      (resp) => {
        this.buttonService.setCHange(false);
        this.router.navigate(['/home/ventas']);
      },
      (error) => {}
    );
  }
  

  doSomething(){
    this.router.navigate(['/home/ventas']);
  }

  formatDate(date: Date): string {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
