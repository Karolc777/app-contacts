import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ContactModel } from '../models/ContactModel';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolveService implements Resolve<ContactModel> {

  constructor(private contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.contactsService.getContact(route.params['id']);
  }
}
