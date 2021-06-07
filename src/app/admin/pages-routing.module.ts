import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeComponent} from './homes/home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./sys_config/users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'roles',
      loadChildren: () => import('./sys_config/roles/roles.module')
        .then(m => m.RolesModule),
      data: {
        breadcrumb: 'Quản lý nhóm quyền'
      }
    },
    {
      path: 'action',
      loadChildren: () => import('./sys_config/actions/actions.module')
        .then(m => m.ActionsModule),
    },
    {
      path: 'color',
      loadChildren: () => import('./sys_config/colors/colors.module')
        .then(m => m.ColorsModule),
    },
    {
      path: 'size',
      loadChildren: () => import('./sys_config/sizes/sizes.module')
        .then(m => m.SizesModule),
    },
    {
      path: 'objects',
      loadChildren: () => import('./sys_config/objects/objects.module')
        .then(m => m.ObjectsModule),
    },
    {
      path: 'category',
      loadChildren: () => import('./major/category/category.module')
        .then(m => m.CategoryModule),
    },
    {
      path: 'logs',
      loadChildren: () => import('./sys_config/logs/logs.module')
        .then(m => m.LogsModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
