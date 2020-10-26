import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LiveService } from './lives.service';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.css']
})
export class LivesComponent implements OnInit {

  #lives;

  constructor(private router: Router, private service: LiveService) {
    service.listAll().subscribe(
      response => {
        this.#lives = response;
      },
      error => {
        this.#lives = [];
      })
  }

  ngOnInit(): void {
  }

  get lives(): Object[] {
    return this.#lives;
  }

  play(user) {
    this.router.navigate([`/play/@${user}`]);
  }

}
