import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {NbDialogRef, NbTabComponent, NbTabsetComponent, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesService} from '../../../@core/services/roles.service';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ObjectsService} from "../../../@core/services/objects.service";
import {CategoriesService} from "../../../@core/services/categories.service";
import {TopicService} from "../../../@core/services/topic.service";
import {Track} from "ngx-audio-player";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-user-update',
  styleUrls: ['./category-update.component.scss'],
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
  templateUrl: './category-update.component.html',
})
export class CategoryUpdateComponent implements OnInit {
  @Input() value: any;
  @Input() readonly: boolean;
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

  @ViewChild("tabset") tabsetEl: NbTabsetComponent;
  @ViewChild("addTab") addTabEl: NbTabComponent;

  ActivateTabAdd() {
    console.log("asd");
    this.tabsetEl.selectTab(this.addTabEl);
  }

  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  onAudioPlay() {
    this.audioPlayerRef.nativeElement.play();
  }

  @ViewChild('figAudio') figAudio: ElementRef; // audio tag reference
  audSrc = 'C:\\Users\\hieutt1\\Desktop\\ETS2016new-Test 01-Part1-01.mp3';

  audFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const audSrc = URL.createObjectURL(event.target.files[0]);
      this.figAudio.nativeElement.src = this.audSrc;
    }
  }

  listRole = null;
  lstRole1 = [];
  lisFile = [];
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];

  listQue = [
    {stt: 1, name: '', transscript: '', answer: null, status: 1, listAnswers: [{stt: 1, value: ""}]},
  ];

  validateListQue() {
    for (let i = 0; i < this.listQue?.length; i++) {
      if (this.listQue[i].name === '' || this.listQue[i].name === null) {
        this.toastr.danger("Vui long dien question cau " + (i + 1), this.translate.instant('common.title_notification'));
        this.inputUser.get("listQue").setValue(null);
        return false;
      }
      if (this.listQue[i].listAnswers === null || this.listQue[i].listAnswers?.length === 0) {
        this.toastr.danger("Question" + (i + 1) + "at least one answer", this.translate.instant('common.title_notification'));
        this.inputUser.get("listQue").setValue(null);
        return false;
      } else {
        for (let j = 0; j < this.listQue[i].listAnswers.length; j++) {
          if (this.listQue[i].listAnswers[j].value === '' || this.listQue[i].listAnswers[j].value === null) {
            this.toastr.danger("Dien day du thong tin dap an cau hoi " + (i + 1), this.translate.instant('common.title_notification'));
            this.inputUser.get("listQue").setValue(null);
            return false;
          }
        }
      }
      this.inputUser.get("listQue").setValue(this.listQue);
      console.log(this.inputUser);
      return true;
    }
  }

  inputUser: any;
  inputUser1: any;
  itemRoles: any;
  loading = false;
  title: string;
  questionForm: FormGroup;
  isCheck: number;
  data: any;
  mask;
  isDis = null;
  url: SafeUrl = '';
  selectedFiles: FileList;
  constructor(
    private toastr1: ToastrService,
    private fb: FormBuilder,
    private objectsService: ObjectsService,
    public ref: NbDialogRef<CategoryUpdateComponent>,
    private rolesService: RolesService,
    private sanitizer: DomSanitizer,
    private sanitize: DomSanitizer,
    protected cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    private topicService: TopicService,
    private translate: TranslateService,
    private categoriesService: CategoriesService) {
  }

  listTopic: any;   // ds type of category
  listPart: any; // ds part
  lisTopic: any; // ds topic name
  playAudio() {
    const audio = new Audio();
    audio.src = "http://localhost:4201/toeic-web/assets/audio/category/Universitye4234333333/102021120920217457_ETS2016new-Test-01-Part1-01.mp3";
    audio.load();
    audio.play();
  }


  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisablePositionSlider = true;

// Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: null,
      link: null,
      artist: null,
    }
  ];

  ngOnInit(): void {
    console.log(this.isCheck);
    // this.playAudio();
    this.loading = true;
    this.inputUser = new FormGroup({
      code: new FormControl(this.data?.code, []),
      name: new FormControl(this.data?.name, []),
      categoryName: new FormControl(this.data?.categoryName, [Validators.required, Validators.maxLength(100)]),
      idType: new FormControl(null, [Validators.required]),
      nameType: new FormControl(null, []),
      idPartTopic: new FormControl(null, [Validators.required]),
      topicId: new FormControl(null, [Validators.required]),
      listQue: new FormControl(null, []),
      namePartTopic: new FormControl(this.data?.namePartTopic, []),
      status: new FormControl(this.data?.status === undefined ? 1 : this.data?.status, []),
    });
    if (this.isCheck === 0) {
      this.inputUser.get("status").disable();
      this.inputUser.get("idType").disable();
      this.inputUser.get("idPartTopic").disable();
      this.inputUser.get("topicId").disable();
      this.isDis = true;

    }
    if (this.data === null || this.data === undefined) {
      this.getTopic(0)
      console.log(this.data?.idType)
      if (this.data?.idType !== null) {
        this.getTopic(this.data?.idType);
      }
    } else {
      this.categoriesService.doSearchDetail({
        idType: this.data?.idType,
        idPartTopic: this.data?.idPartTopic,
        id: this.data?.id
      }).subscribe(
        (res) => {
          console.log(res);
          this.lisFile = [];
          this.listTopic = res.body.data.list.listTopic;
          this.listPart = res.body.data.list.listPart;
          this.lisTopic = res.body.data.list.lisTopic;
          this.listQue = res.body.data.list.listQue;
          this.lisFile = res.body.data.list.lisFile;
          for (let i = 0; i < this.lisFile?.length; i++) {
            console.log(this.lisFile[i]);
            if (this.lisFile[i].typeFile === '1') {
              this.url = this.lisFile[i].path;
            } else if (this.lisFile[i].typeFile === '0') {
              this.msaapPlaylist[0].link = this.lisFile[i].path;
              console.log(this.msaapPlaylist)
            }
          }
          this.inputUser.get("idType").setValue(this.data?.idType);
          this.inputUser.get("idPartTopic").setValue(this.data?.idPartTopic);
          this.inputUser.get("topicId").setValue(this.data?.topicId);
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    }
  };

  fields: any;

  // xu ly file
  selectFile(event) {
    if (event !== null) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles);
      this.url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(event.target.files[0])
      );
    } else {
      this.selectedFiles = null;
    }
  }


  addQue(type: any, obj: any) {
    if (type === 0) {
      this.listQue.push({
          stt: this.listQue.length + 1,
          name: '',
          answer: null,
          status: 1,
          transscript: '',
          listAnswers: []
        }
      )
      for (let i = 0; i < this.listQue.length; i++) {
        this.listQue[i].stt = (i + 1);
      }
      this.listQue[(this.listQue.length - 1)].listAnswers.push({stt: 1, value: ''})
    } else if (type === 1) {
      if (this.listQue[obj].listAnswers.length < 4) {
        this.listQue[obj].listAnswers.push({
            stt: 1, value: ""
          }
        )
        for (let i = 0; i < this.listQue[obj].listAnswers.length; i++) {
          this.listQue[obj].listAnswers[i].stt = (i + 1);
        }
      } else {
        this.toastr.danger("Maximun is 5 answers", this.translate.instant('common.title_notification'));
      }

    }

  }

  remoteQue(type: any, obj: any, idRemote: any) {
    if (type === 0) {
      if (this.listQue.length <= 1) {
        this.toastr.danger("Category have at least one question", this.translate.instant('common.title_notification'));
        return;
      }
      const index = this.listQue.findIndex(x => x.stt === obj);
      if (index > -1) {
        this.listQue.splice(index, 1);
        for (let i = 0; i < this.listQue.length; i++) {
          this.listQue[i].stt = (i + 1);
        }
      }
    } else if (type === 1) {
      if (idRemote === -1) {
        return;
      }
      if (this.listQue[obj].listAnswers.length <= 1) {
        this.toastr.danger("1 question have at least a answer", this.translate.instant('common.title_notification'));
        return;
      }
      console.log(this.listQue[obj].listAnswers);
      const index = this.listQue[obj].listAnswers.findIndex(x => x.stt === idRemote);
      if (index > -1) {
        this.listQue[obj].listAnswers.splice(index, 1);
        for (let i = 0; i < this.listQue[obj].listAnswers.length; i++) {
          this.listQue[obj].listAnswers[i].stt = (i + 1);
        }
      }
    }

  }

  public getTopic(id) {
    this.loading = true;
    this.objectsService.queryTopic(id
    ).subscribe(
      (res) => {
        if (id === 0) {
          this.listTopic = res.body;
        } else {
          this.listPart = res.body
        }
      },
      (error) => {
        this.loading = false;
      },
      () => this.loading = false,
    );
  };

  getLisTopic() {
    if (this.inputUser.get('idType').value !== null && this.inputUser.get('idPartTopic').value !== null) {
      // goi api lay ds topic name
      this.loading = true;
      this.inputUser.get('topicId').setValue(null);
      this.lisTopic = null;
      this.topicService.lisTopic({
        idType: this.inputUser.get("idType").value,
        idPartTopic: this.inputUser.get("idPartTopic").value
      }).subscribe(
        (res) => {
          console.log(res);
          this.lisTopic = res.body.data.list;
          // this.onSuccess(res.body.data, res.headers, pageToLoad);
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    } else {
      this.lisTopic = null;
    }
  }

  channeTyoe() {
    console.log(this.inputUser.get('idType').value);
    if (this.inputUser.get('idType').value !== null) {
      if (this.inputUser.get('idPartTopic').value !== null) {
        this.inputUser.get('idPartTopic').setValue(null);
        this.listPart = null;
      }
      this.getTopic(this.inputUser.get('idType').value);
    } else {
      this.listPart = null;
      this.lisTopic = null;
    }
  }

  changeValue() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  submit() {
    this.inputUser.markAllAsTouched();
    if (this.inputUser.valid && this.validateListQue() === true) {
      // this.loading = true;
      const data = Object.assign({}, this.inputUser.value);
      data.id = this.data?.id;
      console.log(data);
      console.log(this.listQue);
      if (this.data == null) {
        console.log(this.selectedFiles);
        this.categoriesService.insert(data, this.selectedFiles).subscribe(
          (value) => {
            this.ref.close(value);
          },
          error => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false,
        );
      } else {
        console.log(data);
        this.categoriesService.update(data,  this.selectedFiles).subscribe(
          (value) => {
            this.ref.close(value);
          },
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false
        )
        ;
      }
    } else {
    }
  }

  cancel() {
    this.ref.close();
  }
}
