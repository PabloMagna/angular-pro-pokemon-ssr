import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta, platformBrowser } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {

  #title = inject(Title);
  #meta = inject(Meta);
  #platform = inject(PLATFORM_ID);


  ngOnInit() {
    this.#title.setTitle('Pricing Page');
    this.#meta.updateTag({ name: 'description', content: 'Este es mi pricing page' });
    this.#meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.#meta.updateTag({ name: 'keywords', content: 'hola,mundo,curso,angular,pro' });
  }
}
