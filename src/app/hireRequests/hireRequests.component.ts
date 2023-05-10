import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Rental } from '../dto/hire-requests/rental';
import { RentalService } from '../services/rental.service';
import { HireRequestDetailComponent } from './hire-request-detail/hire-request-detail.component';
import { HireRequestFormComponent } from './hire-request-form/hire-request-form.component';

@Component({
  selector: 'app-hire-requests',
  templateUrl: './hireRequests.component.html',
  styleUrls: ['./hireRequests.component.scss'],
  providers: [RentalService],
})

export class HireRequestsComponent {
  displayedColumns: string[] = ['id', 'kindId', 'rentalDate', 'customerName', 'customerPhoneNumber', 'status'];

  rentals: Rental[] = [];

  constructor(
    private rentalService: RentalService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getRentals();
  }

  getRentals(): void {
    this.rentalService.getRentals().subscribe(rentals => (this.rentals = rentals));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(HireRequestFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRentals();
      }
    });
  }

  getRow(row: Rental) {
    const dialogRef = this.dialog.open(HireRequestDetailComponent, {
      minWidth: '50vw',
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: { ...row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRentals();
      }
    });
  }

}
