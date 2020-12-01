import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: {asiento: any}) { }

  ngOnInit(): void {
  }

  emitirCompra(dia: number){
    this.dialogo.close({dia,datos: this.datos});
  }
}
