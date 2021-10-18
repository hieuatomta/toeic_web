import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params} from "@angular/router";
import {QuestionsService} from "../../../@core/services/questions.service";


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./reading-details.component.scss'],
  templateUrl: './reading-details.component.html',
})
export class ReadingDetailsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }


  constructor(private topicService: TopicService,
              private activatedRoute: ActivatedRoute,
              private questionsService: QuestionsService,
  ) {
  }

  lisTopic;
  loading = false;
  key;
  listQuestion = [];
  dem = 0;
  questionCount = 0;
  randomCheck = [];
  ramdomValue;
  questionNumber;
  answerCheck = false;

  selectFile(event) {
  }

  nextPage(x) {
    console.log(x);
    this.key = x;
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.key = 15;
      this.questionsService.getQuestions({
        id: this.key,
      }).subscribe(
        (res) => {
          if (res.body.length <= 10) {
            this.questionCount = res.body.length
          } else this.questionCount = 10;
          for (let i = 0; i < this.questionCount; i++) {
            this.ramdomValue = Math.floor(Math.random() * res.body.length);
            while (this.randomCheck.includes(this.ramdomValue)) {
              this.ramdomValue = Math.floor(Math.random() * res.body.length);
            }
            this.randomCheck.push(this.ramdomValue);
            this.listQuestion.push(res.body[this.ramdomValue]);
          }
          this.questionNumber = 0;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    });
  }
  nextQuestion(): void {
    this.questionNumber = this.questionNumber + 1 ;
    for ( let i = 0 ; i < 4; i++ ) {
      i = i + 1;
    }
  }

  checkAnswer(correr_answer: number, your_answer: number) {
    this.answerCheck = correr_answer === your_answer ? true : false;
    this.questionNumber < this.listQuestion.length ? this.questionNumber += 1 : null;
  }

}
