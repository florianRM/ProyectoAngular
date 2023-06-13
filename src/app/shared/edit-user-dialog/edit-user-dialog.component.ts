import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/interface/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  user!: User;
  myForm!: FormGroup;
  mouseIn: boolean = false;
  file!: File | null;
  mimeTypesAllowed: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/webp'];
  profileImg!: string | ArrayBuffer | null;
  updatedSucces: boolean = false;

  json: any = {
    name: '',
    surName: '',
    lastName: ''
  }

  constructor(private fb: FormBuilder, private userService: UserService, private dynamicDialogRef: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: res => {
        this.user = res;
        this.myForm = this.fb.group({
          username: [`${this.user.username}`],
          email: [`${this.user.email}`],
          name: [`${this.user.name || ''}`],
          surname: [`${this.user.surName || ''}`],
          lastname: [`${this.user.lastName || ''}`],
          img: [''],
          fileSource: ['']
        });
        if(res.img) {
          this.profileImg = res.img;
        } else {
          this.profileImg = "assets/no-photo.webp"
        }
      }
    })
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    if(this.file != null && this.file != undefined) {
      if(this.file!.size > 1048576) {
        Swal.fire({
          icon: 'error',
          title: 'Wow, an error has occurred',
          text: 'Images larger than 1 mb are not allowed'
        })
      } else if(!this.mimeTypesAllowed.includes(this.file?.type!)) {
        Swal.fire({
          icon: 'error',
          title: 'Wow, an error has occurred',
          text: 'The mimetype are not allowed'
        })
      } else {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          //Primero verificamos si ha leído los datos y no son nulos
          if (fileReader.result) {
            //Aquí convertimos los resultados en un ArrayBuffer
            const arrayBuffer = fileReader.result as ArrayBuffer;
            //Lo convertimos a un array de bytes
            const uint8Array = new Uint8Array(arrayBuffer);
            //Convierte los bytes en su carácter correspondiente
            const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
            //Finalmente convertimos una cadena de bytes a un string en base64
            const base64String = btoa(binaryString);

            this.profileImg = 'data:image/jpeg;base64,' + base64String;
          }
        };
        //Por último leemos la imagen
        fileReader.readAsArrayBuffer(this.file)
        this.myForm.patchValue({
          fileSource: this.file
        })
      }
    }
  }

  changeMouseStatus(): void {
    this.mouseIn = !this.mouseIn;
  }

  closeModal(): void {
    this.dynamicDialogRef.close();
  }

  save() {
    this.json.name = this.myForm.get('name')?.value;
    this.json.surName = this.myForm.get('surname')?.value;
    this.json.lastName = this.myForm.get('lastname')?.value;

    const file: File = this.myForm.get('fileSource')?.value;
    this.userService.updateUser(this.user.username, this.json, file)
    .subscribe({
      next: () => {
        this.updatedSucces = true;
        setTimeout(() => {
          this.updatedSucces = false;
        }, 5000);
      }
    })
  }

}
