import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestStatus, Symbols } from '../../dto/shared/constants';
import { Rental, RentalItem } from 'src/app/dto/hire-requests/rental';
import { RentalService } from 'src/app/services/rental.service';
import { RentalItemService } from 'src/app/services/rentalItem.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-hire-request-detail',
  templateUrl: './hire-request-detail.component.html',
  styleUrls: ['./hire-request-detail.component.scss'],
  providers: [RentalService, RentalItemService, PaymentService],
})
export class HireRequestDetailComponent {
  submitted = false;
  rental: Rental;
  symbols = Symbols;
  availableItems: RentalItem[] = [];
  currency: string = 'EUR';

  form = new FormGroup({
    damages: new FormControl(),
    fuelConsumed: new FormControl(),
  });
  totalCost: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Rental,
    private service: RentalService,
    private itemService: RentalItemService,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<HireRequestDetailComponent>) { }

  ngOnInit() {
    this.service.getRental(this.data.id).subscribe(rental => this.rental = rental);

    if (this.data.status === RequestStatus.New) { this.getItems(this.data.kindId); }
  }

  getItems(kindId: number): void {
    this.itemService.getRentalItems(kindId).subscribe(availableItems => (this.availableItems = availableItems));
  }

  onCalculate() {
    var fuel = this.form.value.fuelConsumed ?? 0;
    var days = this.getDiffDays(this.rental.rentalDate, this.rental.returnDate ?? new Date()) ?? 0;
    const ammount = (fuel * 5) + (days * this.rental.rentalItem!.rentalRate!) + (0 /*damage value */);

    this.paymentService.convert('EUR', this.currency, ammount).subscribe((response) => {
      this.totalCost = response.success ? response.result : -1;
    });
  }

  changeCurrency(event: any) {
    this.currency = event.value;
  }

  getDiffDays(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let days = Math.floor((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  onSubmit() {
    let postedData;
    if (this.rental.status === RequestStatus.New) {
      postedData = {
        ...this.rental,
        status: RequestStatus.InProgress,
      }
    } else {
      postedData = {
        ...this.rental,
        status: RequestStatus.Returned,
        returnDate: new Date(),
        totalCost: this.totalCost,
        rentalItem: {
          ...this.rental.rentalItem,
          fuelConsumed: this.form.value.fuelConsumed,
          damages: this.form.value.damages,
        }
      }
    }

    this.service.updateRental(this.data.id, postedData)
      .subscribe((response) => {
        this.submitted = true;
        this.dialogRef.close(true);
      });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }


}
