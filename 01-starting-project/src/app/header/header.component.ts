import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    // template: '<h1>Hello</h1>',
    standalone: true,  //standalone component;  set to false for module based component
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {}