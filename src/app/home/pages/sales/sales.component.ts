import { Component, inject } from '@angular/core';
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
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {

  
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


  public data: any = {};
  public page: number = 0;

  sub$! : Subscription;

  ngOnInit(): void {
  
    this.loader.setLoader(true);

    let token;
    this.sub$ = this.auth.getUsuario.subscribe(usuario => { 
      token = 'Bearer '+ usuario.token; 
    });
  
    const UrlApi = `${this.baseUrl}/api/v1/ventas`;
    const headers = {'Authorization': token};

    this.apiGet.getDebtInfo(UrlApi, headers)
    .subscribe((resp)=>{
      this.loader.setLoader(false);
      this.data = resp
    })
  }

  ngOnDestroy(): void{
  
  };

  nextPage(){
    this.page += 5;
  }

  prevPage(){
    if (this.page > 0) {
      this.page -= 5;
    }
  }

  doSomething(){
    this.router.navigate(['/home/ventas-form']);
  }

}