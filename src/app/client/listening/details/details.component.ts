import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Track} from "ngx-audio-player";
import {SafeUrl} from "@angular/platform-browser";


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./details.component.scss'],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisablePositionSlider = true;
  url: SafeUrl = '';

// Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: 'http://localhost:4201/toeic-web/assets/audio/category/Universitye4234333333/102021120920217457_ETS2016new-Test-01-Part1-01.mp3',
      artist: 'Audio One Artist',
    }
    ]

  constructor(private topicService: TopicService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  lisTopic;
  loading = false;
  key;
  selectFile(event) {
    // if (event !== null) {
    //   this.selectedFiles = event.target.files;
    //   this.url = this.sanitizer.bypassSecurityTrustUrl(
    //     window.URL.createObjectURL(event.target.files[0])
    //   );
    // } else {
    //   this.selectedFiles = null;
    // }
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
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
