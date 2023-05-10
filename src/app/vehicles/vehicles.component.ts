import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RentalItem } from '../dto/hire-requests/rental';
import { Vehicle } from '../dto/product/vehicle';
import { RentalItemService } from '../services/rentalItem.service';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  providers: [RentalItemService],
})

export class VehiclesComponent {
  displayedColumns: string[] = ['id', 'kindId', 'name', 'rentalRate'];
  rentalItems: RentalItem[] = [];

  constructor(private service: RentalItemService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getRentalItems();
  }

  getRentalItems(): void {
    this.service.getRentalItems()
      .subscribe(rentalItems => (this.rentalItems = rentalItems));
  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(VehicleFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRentalItems();
      }
    });
  }
}
