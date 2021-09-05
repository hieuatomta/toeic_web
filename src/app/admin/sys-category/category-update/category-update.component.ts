import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {NbDialogRef, NbTabComponent, NbTabsetComponent, NbToastrService} from '@nebular/theme';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesService} from '../../../@core/services/roles.service';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ObjectsService} from "../../../@core/services/objects.service";
import {CategoriesService} from "../../../@core/services/categories.service";
import {TopicService} from "../../../@core/services/topic.service";

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


  listRole = null;
  lstRole1 = [];
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];

  listQue = [
    {stt: 1, name: '', transscript: '', answer: null, listAnswers: [{stt: 1, value: ""}]},
  ];

  validateListQue() {
    for (let i = 0; i < this.listQue?.length; i++) {
      if (this.listQue[i].name === '' || this.listQue[i].name === null) {
        this.toastr.danger("Vui long dien question cau " + (i + 1), this.translate.instant('common.title_notification'));
        this.inputUser.get("listQue").setValue(null);
        return false;
      }
      if (this.listQue[i].listAnswers === null || this.listQue[i].listAnswers?.length === 0) {
        this.toastr.danger("Cau hoi" + (i + 1) + " it nhat 1 dap an", this.translate.instant('common.title_notification'));
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
    protected cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    private topicService: TopicService,
    private translate: TranslateService,
    private categoriesService: CategoriesService) {
  }

  listTopic: any;   // ds type of category
  listPart: any; // ds part
  lisTopic: any; // ds topic name

  ngOnInit(): void {
    console.log(this.data);
    this.inputUser = new FormGroup({
      code: new FormControl(null, []),
      name: new FormControl(this.data?.name, []),
      categoryName: new FormControl(this.data?.categoryName, [Validators.required]),
      idType: new FormControl(this.data?.idType, [Validators.required]),
      nameType: new FormControl(null, []),
      idPartTopic: new FormControl(this.data?.idPartTopic, [Validators.required]),
      topicId: new FormControl(this.data?.topicId, [Validators.required]),
      listQue: new FormControl(null, []),
      namePartTopic: new FormControl(this.data?.namePartTopic, []),
      creationTime: new FormControl(null, []),
      updateTime: new FormControl(null, []),
      status: new FormControl(null, []),
      transscript: new FormControl(null, []),
      question: new FormControl(null, []),
    });
    this.getTopic(0)
    console.log(this.data?.idType)
    if (this.data?.idType !== null) {
      this.getTopic(this.data?.idType)
      // this.inputUser.get('namePartTopidPartTopicic').setValue(this.data?.idType);
    }
  };

  fields: any;

  patch() {
    const control = <FormArray>this.inputUser.get('type.options');
    this.fields.type.options.forEach(x => {
      control.push(this.patchValues(x.label, x.value))
    })
  }

  patchValues(label, value) {
    return this.fb.group({
      value: [value]
    })
  }

  addQue(type: any, obj: any) {
    if (type === 0) {
      this.listQue.push({
          stt: this.listQue.length + 1,
          name: '',
          answer: null,
          transscript: '',
          listAnswers: []
        }
      )
      for (let i = 0; i < this.listQue.length; i++) {
        this.listQue[i].stt = (i + 1);
      }
      this.listQue[obj].listAnswers.push({stt: 1, value: ''})
    } else if (type === 1) {
      this.listQue[obj].listAnswers.push({
          stt: 1, value: ""
        }
      )
      for (let i = 0; i < this.listQue[obj].listAnswers.length; i++) {
        this.listQue[obj].listAnswers[i].stt = (i + 1);
      }
    }

  }

  remoteQue(type: any, obj: any, idRemote: any) {
    if (type === 0) {
      if (this.listQue.length <= 1) {
        this.toastr.danger("1 chu de co it nhat 1 cau hoi", this.translate.instant('common.title_notification'));
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
        this.toastr.danger("1 cau hoi co it nhat 1 cau tl", this.translate.instant('common.title_notification'));
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
        this.categoriesService.insert(data).subscribe(
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
        this.categoriesService.update(data).subscribe(
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
