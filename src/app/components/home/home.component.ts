import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { fetchUserAttributes } from 'aws-amplify/auth';

interface TableRow {
  id: number;
  description: string;
  children?: TableRow[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  rows: TableRow[] = [
    {
      id: 1,
      description: 'Noob 1',
      children: [
        {
          id: 2,
          description: 'Under Noob 1',
          children: [
            {
              id: 3,
              description: 'Under under Noob 1',
              children: [],
            },
          ],
        },
        {
          id: 4,
          description: 'Under Noob 2',
          children: [
            {
              id: 5,
              description: 'Under under Noob 2',
              children: [],
            },
          ],
        },
      ],
    },
  ];

  columns: (keyof TableRow)[] = ['id', 'description'];

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit() {}

  fetchUser() {
    fetchUserAttributes().then((user) => {
      console.log(user);
    });
  }
}
