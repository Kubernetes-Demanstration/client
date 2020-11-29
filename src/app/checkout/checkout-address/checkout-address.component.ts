import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/models/address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
 @Input() checkoutForm: FormGroup;
  constructor(private accountService: AccountService, private toastrService: ToastrService, ) { }

  ngOnInit(): void {
  }

  saveUserAddress(): void {
     this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe((address: IAddress) => {
       this.toastrService.success('Address saved');
       this.checkoutForm.get('addressForm').reset(address);
     }, error => {
       this.toastrService.error(error.message);
     });
  }
}
