import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jam',
  templateUrl: './jam.page.html',
  styleUrls: ['./jam.page.scss'],
  standalone: false,
})
export class JamPage implements OnInit {

  selectedJam: string = '';

selectJam(jam: string) {
  this.selectedJam = jam;
}

  constructor() { }

  ngOnInit() {
  }

}
