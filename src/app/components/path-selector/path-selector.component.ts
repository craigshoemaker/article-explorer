import { Component, Input, OnInit } from '@angular/core';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-path-selector',
  templateUrl: require('./path-selector.component.html'),
  styleUrls: [require('./path-selector.component.scss')]
})
export class PathSelectorComponent implements OnInit {
  @Input() path: string;

  constructor(private pathService: PathService) {}

  pathChanged() {
    this.pathService.changePath(this.path);
  }

  ngOnInit() {
    this.path = this.pathService.getPath();
  }
}
