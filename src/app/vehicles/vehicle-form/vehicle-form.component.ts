import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RentalService } from 'src/app/services/rental.service';
import { RentalItemService } from 'src/app/services/rentalItem.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  providers: [RentalItemService, RentalService],
})
export class VehicleFormComponent {
  kinds: any[] = [];

  form = new FormGroup({
    kindTypeId: new FormControl(0, [Validators.required]),
    kindId: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    rentalRate: new FormControl(0, [Validators.required]),
  });

  submitted = false;

  constructor(private itemService: RentalItemService, private service: RentalService, public dialogRef: MatDialogRef<VehicleFormComponent>) { }

  ngOnInit() {
    this.getKinds();
  }

  getKinds(): void {
    this.service.getKinds().subscribe(kinds => (this.kinds = kinds));
  }

  onSubmit() {
    const postedData = {
      kindTypeId: this.form.value.kindTypeId ?? -1,
      kindId: this.form.value.kindId ?? -1,
      name: this.form.value.name ?? '',
      rentalRate: this.form.value.rentalRate ?? -1,
    };

    this.itemService.createRentalItem(postedData).subscribe((response) => {
      this.submitted = true;
      this.dialogRef.close(true);
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
