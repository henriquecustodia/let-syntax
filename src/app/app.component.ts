import { AsyncPipe, CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { interval } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [AsyncPipe, TitleCasePipe, CurrencyPipe],
  template: `
    <fieldset>
      @let text = title + " Henrique!";

      <h1>{{ text }}</h1>
    </fieldset>

    <fieldset>
      @let time = interval | async;

      @let notNullableTime = time ?? 0;

      @let seconds = notNullableTime + "s";

      <h1>{{ seconds }}</h1>
    </fieldset>

    <fieldset>
      <div #greeting>Heyy</div>

      @let greetingText = greeting.textContent + " Code Dimension!";

      <h1 [innerHTML]="greetingText"></h1>
    </fieldset>

    <fieldset>
      <ul>
        @for (p of products(); track p.id) {
          @let name = p.name | titlecase;
          @let price = p.price | currency;

          @let title = name + " - " + price;

          <li>
            {{ title }}

            @let categories = p.categories;
            <ul>
              @for (c of categories; track c) {
                @let categoryName = c | titlecase;

                <li>{{ categoryName }}</li>
              }
            </ul>
          </li>
        }
      </ul>
    </fieldset>
  `,
  styles: [],
})
export class AppComponent {
  title = "Oi";

  interval = interval(1000);

  products = signal([
    {
      id: 1,
      name: "product 1",
      price: 10,
      categories: ["category 1", "category 2"],
    },
    {
      id: 2,
      name: "product 2",
      price: 10,
      categories: ["category 1", "category 2"],
    },
  ]);
}
