import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chip } from 'src/app/interfaces/Chip.interface';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {
  @Input() chips: Chip[];
  @Output()
  selectChip = new EventEmitter<Chip>();

  constructor() {
    
  }

  ngOnInit(): void {
  }

  remove(chip: Chip): void {
    chip.removable = false;
    this.selectChip.emit(chip);
  }
  
  select(chip: Chip): void {
    chip.removable = true;
    this.selectChip.emit(chip);
  }

}
