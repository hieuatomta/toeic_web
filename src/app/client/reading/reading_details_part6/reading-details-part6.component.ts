import {Component, OnDestroy, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {QuestionsService} from "../../../@core/services/questions.service";


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./reading-details-part6.component.scss'],
  templateUrl: './reading-details-part6.component.html',
})
export class ReadingDetailsPart6Component implements OnInit, OnDestroy {

  ngOnDestroy(): void {
  }

  constructor(private topicService: TopicService,
              private activatedRoute: ActivatedRoute,
              private questionsService: QuestionsService,
              private router: Router) {}
  result: Array<any> = [];
  lisTopic;
  disableButton = false;
  results: Array<{ index: any, result: any }> = [];
  key;
  loading;
  answerCheck: Array<any> = [];
  listColorResult: Array<any> = [];
  submitCheck: boolean = false;
  countAnswerCheck: boolean = true;
  countAnswer: number = 0;
  clickBtnSubmitCheck: boolean = false;
  listTopic2;
  countClickNextQuestion: number = 0;
  historyShowCheck: boolean = false;
  selectFile(event) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log("params:", params)
      this.key = parseFloat(params['key']);
      this.questionsService.getQuestionsPart6({
        id: this.key,
      }).subscribe(
        (res ) => {
          this.lisTopic = res.body.listQuestion1;
          this.listTopic2 = res.body.listQuestion2;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    });
  }

  nextQuestion() {
    this.answerCheck = [];
    this.listColorResult = [];
    this.result = [];
    this.countAnswer = 0;
    this.clickBtnSubmitCheck = false;
    this.submitCheck = false;
    this.lisTopic = this.listTopic2;
    if (this.countClickNextQuestion === 2 || this.countClickNextQuestion > 2) {
      this.historyShowCheck = true;
    }
  }

  somethingChanged( s: string) {
    console.log(s);
}
  checkAnswer(your_answer: string, order_number: number) {
  }

  counter(i: number) {
    return new Array(i);
  }

  submitComplete() {
    this.answerCheck = [];
    this.listColorResult = [];
    this.countAnswer = 0;
    this.clickBtnSubmitCheck = true;
    for (let i = 0; i < this.result.length; i++) {
      if (this.result[i] !== null && this.result[i] !== undefined) {
        this.countAnswer++;
      }
    }
    if (this.countAnswer === Object.keys(this.lisTopic).length) {
      this.submitCheck = true;
      this.countAnswerCheck = true;
      this.clickBtnSubmitCheck = false;
      this.countClickNextQuestion = this.countClickNextQuestion + 1;
      for (let i = 0; i < this.result.length; i++) {
        if (this.result[i] === '1') {
          this.answerCheck.push("Đáp án SAI");
          this.listColorResult.push(false);
        } else {
          this.answerCheck.push("Đáp án ĐÚNG");
          this.listColorResult.push(true);
        }
      }
    } else {
      this.submitCheck = false;
      this.countAnswerCheck = false;
    }


  }
  radioChange() {
    this.countAnswer = 0;
    for (let i = 0; i < this.result.length; i++) {
      if (this.result[i] !== null && this.result[i] !== undefined) {
        this.countAnswer++;
      }
    }
    if (this.countAnswer === Object.keys(this.lisTopic).length) {
      this.countAnswerCheck = true;
    } else if (this.clickBtnSubmitCheck) {
      this.countAnswerCheck = false;
    }
  }
  similarExercise() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
}
