import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  constructor(private topicService: TopicService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {
  }
  lisTopic;
  loading = false;
  key;
  test;
  nextPage(x) {
    const url = '/readingdetails/' + x.id;
    this.router.navigate([url]);
    console.log(x);
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      console.log("reading")
      this.key = params['id'];
      this.topicService.lisTopic({
        idPartTopic: this.key,
      }).subscribe(
        (res) => {
          console.log(res);
          this.lisTopic = res.body.data.list;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    });
  }

}
