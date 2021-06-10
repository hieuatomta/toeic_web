import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeClientComponent} from './home_client/home-client.component';
import {ContactComponent} from './contact/contact.component';
import {ClientComponent} from './client.component';
import {BlogComponent} from './news/blog/blog.component';
import {BlogDetailComponent} from './news/blog-detail/blog-detail.component';



const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'trang-chu',
        component: HomeClientComponent,
      },
      {
        path: 'tin-tuc/:key',
        component: BlogComponent,
      },
      {
        path: 'chi-tiet-tin-tuc/:key',
        component: BlogDetailComponent,
      }, {
        path: 'lien-he',
        component: ContactComponent,
      },
      {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
