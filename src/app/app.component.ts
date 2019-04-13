import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'froalaTest';
  public editorContent: string;

  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', 'underline','insertImage']
  }


  public imprimirRes() {
    console.log(this.editorContent)
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(this.editorContent, 'text/html');
    let elementosImg = document.getElementsByTagName('img');
    if (elementosImg.length > 0) {
      for (let i = 0; i < elementosImg.length; i++) {
        fetch(elementosImg[i].src)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'dot.png', blob)
            this.getBase64(file);
          })
      }

    }


  }


  public getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
