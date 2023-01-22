import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-mod',
  templateUrl: './contact-mod.component.html',
  styleUrls: ['./contact-mod.component.scss']
})
export class ContactModComponent {

  contactForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private contactsService: ContactsService, 
    private router: Router) {}

  ngOnInit(): void {
    this.buildContactForm();
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

  addContact() {
    this.contactsService.addContact(this.contactForm.value).subscribe(() => 
    this.router.navigate(['/contacts']));
  }

}
