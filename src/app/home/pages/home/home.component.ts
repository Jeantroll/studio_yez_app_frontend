import { Component, Input, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription, retry } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiPostService } from 'src/app/shared/services/api-post.service';
import { ButtonService } from 'src/app/shared/services/button.service';
import { EncryptationService } from 'src/app/shared/services/encryptation.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { environments } from 'src/environments/environments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  private fb = inject(FormBuilder); 
  private auth = inject(AuthService); 
  private apiPost = inject(ApiPostService);
  private modalService = inject(ModalService);
  private buttonService = inject(ButtonService);
  public  encryptation = inject(EncryptationService);
  private loader = inject(LoaderService);
  private utilities = inject(UtilitiesService)


  cardPs: any = {
    icon:'bx bx-dock-left icon',
    coloricon:'#EA353B',
    title:'Paz y salvo',
    route:'cleared',
    subtitle: 'Comprobante de Deudas Pagadas.',
  }
  cardSc: any = {
    icon:'bx bx-calculator icon',
    coloricon:'rgb(181 215 124)',
    title:'Simulador',
    route:'credit-simulator',
    subtitle: 'Encuentra tu Mejor Opción Financiera.',
  }
  cardPy: any = {
    icon:'bx bx-credit-card icon',
    coloricon:'#ffa534',
    title:'Pagos',
    route:'pays',
    subtitle: 'Gestiona tus Pagos con Facilidad.',
  }
  cardCont: any = {
    icon:'bx bxs-contact icon',
    coloricon:'rgb(113 144 209)',
    title:'Contacto',
    route:'contact-us',
    subtitle: 'Estamos Aquí para Ayudarte.',
  }

  public data: any = {};

  sub$! : Subscription;

  ngOnInit(): void {
    if (localStorage.getItem('acr_d_u')) {
      this.data =  this.auth.getItemFromLocalStorage('acr_d_u');
    }else{
      this.homeInicializacion();
    }
  };

  ngOnDestroy(): void{
    if(this.sub$) this.sub$.unsubscribe();
  };

  homeInicializacion(){

  // this.loader.setLoader(true);

  }

}
