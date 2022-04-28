import { Component, OnInit, Input } from '@angular/core';
import { Heroine } from '../heroine';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { heroines } from '../heroines';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input() heroine?: Heroine;
  @Input() src?: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

}
