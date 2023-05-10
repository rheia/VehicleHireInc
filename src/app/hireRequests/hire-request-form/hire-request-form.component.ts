import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { RequestStatus } from '../../dto/shared/constants';
import { RentalService } from 'src/app/services/rental.service';
import { Kind } from 'src/app/dto/shared/kind';
import { CreateRental, RentalItem } from 'src/app/dto/hire-requests/rental';
import { RentalItemService } from 'src/app/services/rentalItem.service';

@Component({
  selector: 'app-hire-request-form',
  templateUrl: './hire-request-form.component.html',
  styleUrls: ['./hire-request-form.component.scss'],
  providers: [RentalService, RentalItemService, DatePipe],
})

export class HireRequestFormComponent {
  kinds: Kind[] = [];
  availableItems: RentalItem[] = [];
  form = new FormGroup({
    kindId: new FormControl(0, [Validators.required]),
    rentalDate: new FormControl(new Date(), [Validators.required]),
    customerName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    customerPhoneNumber: new FormControl('', [Validators.required]),
    itemId: new FormControl(),
  });

  submitted = false;

  constructor(private service: RentalService, private itemService: RentalItemService, public dialogRef: MatDialogRef<HireRequestFormComponent>) { }

  ngOnInit() {
    this.getKinds();
  }

  getKinds(): void {
    this.service.getKinds()
      .subscribe(kinds => (this.kinds = kinds));
  }

  getItems(event: any): void {
    const kindId = event.value;
    this.itemService.getRentalItems(kindId).subscribe(availableItems => (this.availableItems = availableItems));
  }

  onSubmit() {
    if (this.form.valid) {
      const postedData: CreateRental = {
        kindId: this.form.value.kindId ?? -1,
        rentalDate: this.form.value.rentalDate ?? new Date(),
        customerName: this.form.value.customerName ?? '',
        customerPhoneNumber: this.form.value.customerPhoneNumber ?? '',
        status: RequestStatus.New,
        rentalItemId: this.form.value.itemId ?? -1,
      };

      this.service.createRental(postedData).subscribe((response) => {
        this.submitted = true;
        this.dialogRef.close(true);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
