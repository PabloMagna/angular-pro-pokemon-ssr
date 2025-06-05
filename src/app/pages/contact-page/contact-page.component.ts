import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {

  #title = inject(Title);
  #meta = inject(Meta);


  ngOnInit() {
    this.#title.setTitle('Contact Page');
    this.#meta.updateTag({ name: 'description', content: 'Este es mi contact page' });
    this.#meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.#meta.updateTag({ name: 'keywords', content: 'hola,mundo,curso,angular,pro, contact' });
  }
}
