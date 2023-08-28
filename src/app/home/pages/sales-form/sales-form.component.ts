import { Component, HostListener, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
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
import { Producto } from '../../models/login.model';

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
  private router = inject(Router);
  private activateR = inject(ActivatedRoute);
  private loader = inject(LoaderService);
  private utilities = inject(UtilitiesService);

  private baseUrl: string = environments.baseUrl;
  private subscriptions$ = new Subscription();

  token!: string;
  id!: string;
  valid: boolean = false;
  validProduct: boolean = false;

  codigoBuscado: string = '';

  cantidadProducto: number = 1;
  multiplicador: number = 2;
  private timeout: any;
  quantities: { [index: number]: number } = {};

  total = signal(0);
  p: number = 1;


  productosFiltrados: any[] = [];
  productos: any[] = [];

  saleForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    cell: ['', [Validators.required]],
  });

  //por si necesito centralizarlo en un servicio
  // this.getArrayObservable()
  // .subscribe((newArray) => {
  //   this.productosFiltrados = newArray;
  // });
  // productosNew: any[] = [];
  // productsSubject = new BehaviorSubject<any>(this.productosNew);
  // public getArray(): any {
  //   return {...this.productosNew};
  // }
  // public setArray(newArray: any) {
  //   this.productosNew = newArray;
  //   this.productsSubject.next(this.productosNew);
  // }
  // public getArrayObservable() {
  //   return this.productsSubject.asObservable();
  // }

  arrayInput1: inputModel = {
    labelExists: true,
    iconExists: false,
    decimal: false,
    name: 'Nombre',
    placeholder: 'Ingresa el nombre',
    icon: 'fa-solid fa-hashtag',
    controlName: 'name',
    type: 'text',
  };

  arrayInput2: inputModel = {
    labelExists: true,
    iconExists: false,
    decimal: false,
    name: 'Celular',
    placeholder: 'Ingresa el celular',
    icon: 'fa-solid fa-hashtag',
    controlName: 'cell',
    type: 'text',
  };

  // scannedCodes: string[] = [];
  // currentCode: string = '';

  // @HostListener('document:keydown', ['$event'])
  // handleKeyDown(event: KeyboardEvent) {
  //   // Verificar si la tecla presionada es "Enter"
  //   // console.log(event);
  //   if (event.key === 'Enter') {
  //     this.scannedCodes.push(this.currentCode);
  //     this.currentCode = ''; // Limpiar el código actual
  //     // console.log(this.scannedCodes);
  //   } else {
  //     this.currentCode += event.key;
  //   }
  // }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.auth.getUsuario.subscribe((usuario) => {
        this.token = 'Bearer ' + usuario.token;
        this.id = usuario.id;
      })
    );
    this.getProductos();
  }

  onEnterPressed() {
    const productosEncontrados = this.productos.filter((elemento: any) => elemento.codigo === this.codigoBuscado);
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

  onCantidadChange(producto: any, index: number) {
    const indexEnProductosFiltrados = this.productosFiltrados.findIndex((item) => item.codigo === producto.codigo);
    let cantidad = this.quantities[index];
    this.productosFiltrados[indexEnProductosFiltrados].total = producto.precio_por_unidad * cantidad;
    this.productosFiltrados[indexEnProductosFiltrados].cantidad = cantidad;
    this.actualizarTotalGeneral();
  }

  onDeleteProducto(producto: any) {
    const index = this.productosFiltrados.findIndex((item) => item.codigo === producto.codigo);
    this.productosFiltrados.splice(index, 1);
    this.actualizarTotalGeneral();
  }

  private actualizarTotalGeneral() {
    const totalGeneral = this.calcularTotalGeneral();
    this.total.set(totalGeneral);
  }

  calcularTotalGeneral() {
    return this.productosFiltrados.reduce((total, producto) => total + Number(producto.total),0);
  }

  private obtenerDatosCombinados() {
    const productosReducidos = this.productosFiltrados.map((producto) => {
      return {
        cantidad: producto.cantidad,
        codigo: producto.codigo,
        total: producto.total,
      };
    });

    return productosReducidos;
  }

  isItemsArrayValid(): boolean {
    return this.productosFiltrados.length > 0;
  }

  getProductos() {
    this.loader.setLoader(true);
    const UrlApi = `${this.baseUrl}/api/v1/productos`;
    const headers = { Authorization: this.token };

    this.apiGet.getDebtInfo(UrlApi, headers).subscribe((resp) => {
      this.loader.setLoader(false);
      this.productos = resp.data;
      console.log(this.productos);
      this.productos.forEach((producto, index) => {
        this.quantities[index] = 1;
      });
    });
  }

  getSubmit() {

    const formData = this.saleForm.getRawValue();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', this.token);

    var raw = JSON.stringify({
      vendedor: this.id,
      nombre_comprador: formData.name,
      numero_comprador: formData.cell,
      cantidad: this.obtenerDatosCombinados().length,
      productos: this.obtenerDatosCombinados(),
      precio_venta: this.total(),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: undefined,
    };

    fetch(`${this.baseUrl}/api/v1/ventas`, requestOptions)
      .then((response) => response.text())
      .then(
        (result) => {
          this.buttonService.setCHange(false);
          this.router.navigate(['/home/ventas']);
        })
      .catch((error) => console.log('error', error));

  }

  ngOnDestroy(): void {
    if (this.subscriptions$) this.subscriptions$.unsubscribe();
    this.loader.setLoader(false);
  }

  doSomething() {
    this.router.navigate(['/home/ventas']);
  }
}



