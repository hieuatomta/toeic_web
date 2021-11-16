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
  resultTotal: Array<{ topicName: string, correct: number, total: number }> = [];
  key;
  loading = false;
  answerCheck: Array<any> = [];
  listColorResult: Array<any> = [];
  submitCheck: boolean = false;
  countAnswerCheck: boolean = true;
  countAnswer: number = 0;
  clickBtnSubmitCheck: boolean = false;
  listTopic2;
  countClickNextQuestion: number = 0;
  historyShowCheck: boolean = false;
  bodyCopy: any;
  countExamDefault;
  countExamIndex: number = 1;
  correct: number = 0;
  topicName;
  pathImg;
  selectFile(event) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loading = true;
      this.key = parseFloat(params['key'].substr(0, params['key'].indexOf('_')));
      this.topicName = params['key'].substr(params['key'].indexOf('_') + 1)
      this.questionsService.getQuestionsPart6({
        id: this.key,
      }).subscribe(
        (res ) => {
          this.lisTopic = res.body.listQuestion1;
          this.listTopic2 = res.body.listQuestion2;
          this.countExamDefault = Object.keys(res.body).length
          this.pathImg = Object.values(res.body.listQuestion1)[0][0].pathCategory
          console.log(this.pathImg)
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
    this.countExamIndex = this.countExamIndex + 1;
    this.answerCheck = [];
    this.listColorResult = [];
    this.result = [];
    this.countAnswer = 0;
    this.clickBtnSubmitCheck = false;
    this.submitCheck = false;
    this.lisTopic = this.listTopic2;
    this.pathImg = Object.values(this.lisTopic)[0][0].pathCategory
    if (this.countClickNextQuestion === 2 || this.countClickNextQuestion > 2) {
      this.historyShowCheck = true;
    } else if (this.listTopic2 === undefined || this.listTopic2 === null || this.countExamDefault === 1) {
      this.historyShowCheck = true;
    }
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
      let lisTopicCopy = new Array();
      const valueOfLisTopic = new Array();
      valueOfLisTopic.push(Object.values(this.lisTopic));
      for (let i = 0; i < valueOfLisTopic.length; i++) {
        for (let j = 0; j < valueOfLisTopic[i].length; j++) {
          lisTopicCopy = lisTopicCopy.concat(valueOfLisTopic[i][j]);
        }
      }
      lisTopicCopy = lisTopicCopy.reverse();
      this.submitCheck = true;
      this.countAnswerCheck = true;
      this.clickBtnSubmitCheck = false;
      this.countClickNextQuestion = this.countClickNextQuestion + 1;
      for (let i = 0; i < this.result.length; i++) {
        for (let j = 0; j < lisTopicCopy.length; j++) {
          if (this.result[i] === lisTopicCopy[j].id && lisTopicCopy[j].answer === '1') {
            this.answerCheck.push("Đáp án SAI");
            this.listColorResult.push(false);
          } else if (this.result[i] === lisTopicCopy[j].id && lisTopicCopy[j].answer === '0') {
            this.answerCheck.push("Đáp án ĐÚNG");
            this.listColorResult.push(true);
            this.correct = this.correct + 1;
          }
        }
      }
      this.resultTotal.push({topicName: this.topicName, correct: this.correct, total: Object.keys(this.lisTopic).length})
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
    const currentUrl = '/readingdetails-part6/' + this.key + '_' + this.topicName;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
