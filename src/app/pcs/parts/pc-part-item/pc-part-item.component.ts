import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { PCService } from 'src/app/services/pc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pc-part-item',
  templateUrl: './pc-part-item.component.html',
  styleUrls: ['./pc-part-item.component.css']
})
export class PcPartItemComponent implements OnInit {

  @Input() part: Part;

  @Input() selectedPart: Part;

  @Output() selectedItemChanged: EventEmitter<Part> = new EventEmitter<Part>();

  showDelete: boolean;
  showConfirm: boolean;

  constructor(private service : PCService, private router: Router) {
    this.showDelete = true;
    this.showConfirm = false;
  }

  ngOnInit() {
  }

  getPartType(): string {
    return Part.convertEnumTypeToString(this.part.type);
  }

  listClick() {
    this.selectedItemChanged.emit(this.part);
  }

  clickedDelete() {
    this.showDelete = false;
    this.showConfirm = true;
  }

  clickedConfirmDelete() {
    this.service.deletePart(this.part).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/parts', {type : this.part.type}]);
      }
    );
  }

  clickedCancelDelete() {
    this.showDelete = true;
    this.showConfirm = false;
  }

}
