  import { Component, OnInit } from '@angular/core';
  import { ProfileService } from 'src/app/services/profile/profile.service';

  @Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.page.html',
    styleUrls: ['./edit-profile.page.scss'],
    standalone: false,
  })
  export class EditProfilePage implements OnInit {
    user = {
      nama: '',
      email: '',
      telepon: '',
      foto: ''
    };

    constructor(private profileService: ProfileService) {}

    ngOnInit() {
      this.loadProfile();
    }
    

async loadProfile() {
  try {
    const res: any = await this.profileService.getProfile();
    const baseUrl = 'http://localhost:8000'; // base Laravel-mu

    this.user = {
      ...res.data,
      foto: res.data.foto ? `${baseUrl}${res.data.foto}` : ''
    };
  } catch (error) {
    console.error('Gagal ambil profil', error);
  }
}


    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.user.foto = reader.result as string;  // langsung update preview foto
        };
        reader.readAsDataURL(file);
      }
    }

    async saveProfile() {
      try {
        const res: any = await this.profileService.updateProfile({
          nama: this.user.nama,
          foto: this.user.foto // pastikan backend siap terima format ini (base64 string)
        });
        console.log('Profil berhasil diperbarui', res);
      } catch (error) {
        console.error('Gagal update profil', error);
      }
    }
  }
