import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InventoryService }  from './inventory.service';
import { Item } from './Item';

@Component({
  selector: 'item-detail',
  templateUrl:'item.component.html'
})
export class ItemDetailComponent {
  @Input() item: Item;
  @Input() newItem : boolean;
  @Output() onComplete = new EventEmitter<any>();
  message : string ="";

  constructor(private invService : InventoryService){
  }

  save(): void  {
    if (this.newItem) {
      this.invService.saveItem(this.item).subscribe(
          data => {
            console.log('data from saveItem',data)
            this.item=data;
            this.item.id = data[0].id;
            this.message="Success";
            this.onComplete.emit({success: true, item: this.item});
          },
          error => {
            console.error("Error on save operation:"+error);
            this.message="Error on save";
            this.onComplete.emit({success: false, item: this.item, error: error});
          }
        );
    } else {
      this.invService.updateItem(this.item).subscribe(
          data => {
            // this.item=data;
            this.message="Success";
            this.onComplete.emit({success: true, item: this.item});
          },
          error => {
            console.error("Error on save operation:"+error);
            this.message="Error on save";
            this.onComplete.emit({success: false, item: this.item, error: error});
          }
        );
    }
  }

  upload() : void {
    console.log("Upload image called but not implemented");
  }
}
