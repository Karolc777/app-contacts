import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildContactForm();
  }

  private buildContactForm() {

    // Model logiczny formularza
    this.contactForm = this.fb.group({
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })

  }

}
