import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-mod',
  templateUrl: './contact-mod.component.html',
  styleUrls: ['./contact-mod.component.scss']
})
export class ContactModComponent {

  contact: any = [];

  contactForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private contactsService: ContactsService, 
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadContact();
    console.log(this.contact);
    this.buildContactForm();
    this.addDataToForm();
    this.compareData();
  }

  private buildContactForm() {

    const surnamePattern: string | RegExp = '^[A-ż]{3,10}$';
    const firstNamePattern: string | RegExp = '^[A-ż]{3,10}$';
    const phoneNumberPattern: string | RegExp = '^[0-9]{9,15}$';

    // Model logiczny formularza
    this.contactForm = this.fb.group({
      surname: ['', [Validators.required, Validators.pattern(surnamePattern)]],
      firstName: ['', [Validators.required, Validators.pattern(firstNamePattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneNumberPattern)]]
    })

  }

  updateContact() {
    this.contactsService.updateContact(this.contact[0].id, this.contactForm.value).subscribe(() => 
    this.router.navigate(['/contacts']));
  }

  loadContact() {
    this.contact = this.route.snapshot.data['contact'];
  }

  addDataToForm() {
    this.contactForm.setValue({

      "surname": this.contact[0].surname,
      "firstName": this.contact[0].firstName,
      "phoneNumber": this.contact[0].phoneNumber

    })
  }

  compareData() {
    const dataFromForm = this.contactForm.value;
    const dataFromSrv = this.contact[0];
    delete(dataFromSrv.id);

    // console.log(dataFromForm);
    // console.log(dataFromSrv);

    if(JSON.stringify(dataFromForm) === JSON.stringify(dataFromSrv)) {
      return true;
    } else {
      return false;
    }
  }

}
