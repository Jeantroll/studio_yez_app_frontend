import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSale'
})
export class SearchSalePipe implements PipeTransform {

  transform(items: any[], filtro: string, valor: string): any[] {
    if (!items || !filtro || !valor) {
      return items;
    }

    return items.filter(item => {   
      if (filtro === 'codigo_factura') { 
        return item.codigo_factura.includes(valor);
      } else if (filtro === 'name') {
        return item.name.includes(valor);
      } else {
        return false;
      }
    });
  }

}
