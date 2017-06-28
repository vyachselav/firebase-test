import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../shared/user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

export interface DataEvent {
  data: any[];
}

@Component({
  selector: 'app-user-pager',
  templateUrl: 'user-pager.component.html',
  styles: [`
    .row {padding:20px 0;}
    td{padding:5px;}
  `]
})

export class UserPagerComponent implements OnInit {

  @Input() public itemsPerPage: number;
  @Input() public field: string = 'timestamp';

  @Output() public loadingChanged: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() public dataChanged: EventEmitter<DataEvent> = new EventEmitter<DataEvent>();

  private data: any[];

  public firstEntry: any;
  public lastEntry: any;

  private prevValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private nextValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private startAtValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private endAtValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  queryableNext = false;
  queryablePrev = false;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.getFirst(this.field)
      .flatMap((entry) => {
        this.firstEntry = entry;
        return this.userService.getLast(this.field);
      })
      .map((entry) => {
        this.lastEntry = entry;
        return true;
      })
      .subscribe(() => {
        this.startAt().subscribe((result) => {
          this.onResult(result);
        });

        this.endAt().subscribe((result) => {
          this.onResult(result);
        });

        if (this.firstEntry != null) {
          this.startAtValue.next(this.firstEntry[this.field]);
        }
      });
  }

  private startAt() {
     return this.userService.getUsersList({
      query: {
        orderByChild: this.field,
        limitToFirst: (this.itemsPerPage + 1),
        startAt: this.startAtValue
      }
    })
      .filter((ref) => this.startAtValue.getValue() !== 0);
  }

  private endAt() {
     return this.userService.getUsersList({
      query: {
        orderByChild: this.field,
        limitToLast: (this.itemsPerPage + 1),
        endAt: this.endAtValue
      }
    })
      .filter((ref) => this.endAtValue.getValue() !== 0);
  }

  private onResult(result: any[]) {
    if (result != null && result.length > 0) {
      let count = result.length;

      this.prevValue.next(result[0][this.field]);

      this.nextValue.next(result[count - 1][this.field]);

      if (count === (this.itemsPerPage + 1)) {
        result = result.slice(0, count - 1);
        count = result.length;
      }
      this.data = result;

      this.queryablePrev = !(this.firstEntry.$key === this.data[0].$key);
      this.queryableNext = !(this.lastEntry.$key === this.data[count - 1].$key);
    } else {
      this.queryableNext = false;
      this.queryablePrev = false;
      this.data = null;
    }

    this.dataChanged.emit({
      data: this.data
    });

    this.loadingChanged.emit(false);
  }

  public noPrevious(): boolean {
    return !this.queryablePrev;
  }

  public noNext(): boolean {
    return !this.queryableNext;
  }

  public nextPage(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.queryableNext) {
      if (event && event.target) {
        const target: any = event.target;
        target.blur();
      }
      this.loadingChanged.emit(true);
      this.startAtValue.next(this.nextValue.getValue());
    }
  }

  public prevPage(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.queryablePrev) {
      if (event && event.target) {
        const target: any = event.target;
        target.blur();
      }
      this.loadingChanged.emit(true);
      this.endAtValue.next(this.prevValue.getValue());
    }
  }

}
