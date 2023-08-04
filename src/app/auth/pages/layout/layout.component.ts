import { Component } from '@angular/core';
import { ICarouselLittleItem } from 'src/app/shared/models/carousel-little-item.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  carouselData: ICarouselLittleItem[] = [
    { 
      
      imgFondo: 'https://i.ibb.co/KLZHX4P/i-Stock-1363828399.jpg',  
    
    },
    { 
      
      imgFondo: 'https://i.ibb.co/hmkQRXL/i-Stock-1475032404.jpg',
     
    },
    { 
      
      imgFondo: 'https://i.ibb.co/RDbSV40/i-Stock-962842394-1.jpg',
     
    }
  ];

}
