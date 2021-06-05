import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../../../@theme/theme.module';

import {ObjectsRoutingModule} from './objects-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../shares/shared.module';
import {ObjectsComponent} from './objects.component';
import {ObjectUpdateComponent} from './object-update/object-update.component';
import {TreeviewModule} from 'ngx-treeview';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { DropdownTreeviewSelectModule } from '../../../shares/directives/tree-picker/ngx-treeview/dropdown-treeview-select';


@NgModule({
  imports: [
    ThemeModule,
    ObjectsRoutingModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule,
    NbFormFieldModule,
    TranslateModule,
    NgSelectModule, SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NbSpinnerModule, NbToggleModule, TreeviewModule, DropdownTreeviewSelectModule,
  ],
  entryComponents: [
    ObjectUpdateComponent, MapPopupComponent
  ],
  declarations: [ObjectsComponent, ObjectUpdateComponent, MapPopupComponent],
})
export class ObjectsModule {
}
