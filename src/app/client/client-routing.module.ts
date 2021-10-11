import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeClientComponent} from './home_client/home-client.component';
import {ContactComponent} from './contact/contact.component';
import {ClientComponent} from './client.component';
import {BlogComponent} from './news/blog/blog.component';
import {BlogDetailComponent} from './news/blog-detail/blog-detail.component';
import {InforUsersComponent} from "./infor_users/infor-users.component";
import {AboutComponent} from "./about/about.component";
import {LsListeningComponent} from "./listening/lsListening/lsListening.component";
import {DetailsComponent} from "./listening/details/details.component";



const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'home',
        component: HomeClientComponent,
      },
      {
        path: 'info-users',
        component: InforUsersComponent,
      },
      {
        path: 'tin-tuc/:key',
        component: BlogComponent,
      },
      {
        path: 'topic/:id',
        component: LsListeningComponent,
      },
      {
        path: 'details/:key',
        component: DetailsComponent,
      }, {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: '',
        redirectTo: 'home',
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
