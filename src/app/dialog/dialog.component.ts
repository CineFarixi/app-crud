import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Movie } from '../models/movie.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
    movieDialog !: Movie
    movieForm !: NgForm
    constructor(public dialog: MatDialog) {
        this.movieDialog = {} as Movie;
    }

    openDialog(): void{
        const dialogRef  = this.dialog.open(DialogContentExampleDialog, {
            width: '250px',
            data: {name: this.movieDialog.name,
               photoUrl: this.movieDialog.photoUrl, 
               duration: this.movieDialog.duration, genre: this.movieDialog.genre}
            
        });
      console.log(this.movieDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.movieDialog = result;
        });
      
              
    }
  
}


@Component({
    selector: 'content-dialog',
    templateUrl: 'content-dialog.component.html',
    
  })
export class DialogContentExampleDialog {
    constructor(
        public dialogRef: MatDialogRef<DialogContentExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Movie) {}

        onNoClick(): void {
            this.dialogRef.close();
        }
}
