import { Component, OnInit, SimpleChange } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

import EditorJS, { SanitizerConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import { MyParagraph } from './custom-blocks/my-paragraph';
import { position, offset, Offset } from 'caret-pos';
import { off } from 'process';

@Component({
  selector: 'app-editor-textarea',
  templateUrl: './editor-textarea.component.html',
  styleUrls: ['./editor-textarea.component.scss']
})
export class EditorTextareaComponent implements OnInit {

  public editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editor-content',
    placeholder: 'Escribe \'/\' para usar un comando',

    /** 
     * Available Tools list. 
     * Pass Tool's class or Settings object for each Tool you want to use 
     */ 
    tools: { 
      paragraph: MyParagraph,
      header: Header,
    },

    /**
     * Internationalzation config
     */
    i18n: {
      /**
       * @type {I18nDictionary}
       */
      messages: {
        /**
         * Other below: translation of different UI components of the editor.js core
         */
        ui: {
          "blockTunes": {
            "toggler": {
              "Click to tune": "Pulsa para editar",
              "or drag to move": "o desliza para mover"
            },
          },
          "inlineToolbar": {
            "converter": {
              "Convert to": "Convertir en"
            }
          },
          "toolbar": {
            "toolbox": {
              "Add": "Añadir"
            }
          }
        },
    
        /**
         * Section for translation Tool Names: both block and inline tools
         */
        toolNames: {
          "Text": "Párrafo",
          "Heading": "Encabezado",
          "List": "Lista"
        },
    
        /**
         * Section allows to translate Block Tunes
         */
        blockTunes: {
          /**
           * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
           * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
           *
           * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
           */
          "delete": {
            "Delete": "Eliminar"
          },
          "moveUp": {
            "Move up": "Mover arriba"
          },
          "moveDown": {
            "Move down": "Mover abajo"
          }
        },
      }
    }
  });

  subscription: Subscription;

  public writting = 0;
  public command = "";
  public caretPosition: Offset;
  public publicBlockIndex = 0;
  public searchResults = [];
  public selectedItemList = 0;
  public commandsList = [
    {
      'title': 'Texto',
      'description': 'Empieza con un texto plano',
      'img': 'text.png',
      'action': 'addText',
      'commands': ['texto', 'parrafo']
    },
    {
      'title': 'Nueva diapositiva',
      'description': 'Inserte una nueva diapositiva',
      'img': 'slide.png',
      'action': 'addSlide',
      'commands': ['nueva', 'new', 'agregar', 'diapositiva']
    },
    {
      'title': 'Título 1',
      'description': 'Título de la diapositiva',
      'img': 'header.png',
      'action': 'addHeader',
      'commands': ['h1', 'heading1', 'titulo1']
    },
    {
      'title': 'Título 2',
      'description': 'Título de sección',
      'img': 'subheader.png',
      'action': 'addSubheader',
      'commands': ['h2', 'heading2', 'titulo2']
    },
    {
      'title': 'Guardar',
      'description': 'Guardar cambios',
      'img': 'subheader.png',
      'action': 'save',
      'commands': ['guardar', 'save']
    }
  ]

  constructor() { }

  ngOnInit() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
        var newStyle = document.getElementsByClassName('ce-toolbar__plus')[0].getAttribute('style');
        document.getElementsByClassName('ce-toolbar__actions')[0].setAttribute('style', newStyle);
      });    
    });
      
    var target = document.getElementsByClassName('ce-toolbar__plus')[0];
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });

    document.addEventListener('keydown', (e) => {
      if (e['keyCode'] === 27) {
        this.writting = 0;
        this.selectedItemList = 0;
        var divList = document.getElementById('commandsList');
        divList.style.top = '-100%';
        divList.style.left = '-100%';
      }
      if (e['keyCode'] === 55 && e['target']['nodeName'] != "INPUT") {
        this.writting = 1;
        this.command = "";
        this.selectedItemList = 0;
        this.searchResults = this.search(this.command);
        this.caretPosition = offset(document.querySelector('.cdx-block'));
        var divList = document.getElementById('commandsList');
        divList.style.left = this.caretPosition.left + 'px';
        if (this.caretPosition.top > (window.innerHeight / 2)) {
          divList.style.top = 'auto';
          divList.style.bottom = window.innerHeight - this.caretPosition.top + 'px';
        } else {
          divList.style.top = this.caretPosition.top + this.caretPosition.height + 'px';
        }

      } else if (this.writting == 1 && e['keyCode'] != 32 && e['keyCode'] != 13) {
        if (e['keyCode'] === 40) {
          e.preventDefault();
          if (this.searchResults.length > (this.selectedItemList + 1)) {
            this.selectedItemList++;
            this.scrollCommandPanel();
          }
        } else if (e['keyCode'] === 38) {
          e.preventDefault();
          if (this.selectedItemList > 0) {
            this.selectedItemList--;
            this.scrollCommandPanel();
          }
        } else if ((48 <= e['keyCode'] && e['keyCode'] <= 90) || (96 <= e['keyCode'] && e['keyCode'] <= 111)) {
          this.command += e['key'];
        } else if (e['keyCode'] === 8) {
          if (this.command === "") {
            this.writting = 0;
            this.selectedItemList = 0;
            var divList = document.getElementById('commandsList');
            divList.style.top = '-100%';
            divList.style.left = '-100%';
          }
          this.command = this.command.substring(0, this.command.length - 1);
          if (e['altKey'] === true) {
            this.command = "";
          } else if (e['metaKey'] === true) {
            this.writting = 0;
            this.selectedItemList = 0;
            var divList = document.getElementById('commandsList');
            divList.style.top = '-100%';
            divList.style.left = '-100%';
          }
        }
        this.searchResults = this.search(this.command);
      } else if (this.writting == 1 && e['keyCode'] === 13) {
        this.doAction(this.searchResults[this.selectedItemList].action, this.command.length + 1);
      } else {
        this.writting = 0;
        this.selectedItemList = 0;
        var divList = document.getElementById('commandsList');
        divList.style.top = '-100%';
        divList.style.left = '-100%';
      }
    })
  }

  ngOnDestroy() {
  
  }

  search(input: string) {
    var results = [];

    if (input == "") results = this.commandsList;

    var searchVal = input;
    for (var i=0 ; i < this.commandsList.length ; i++)
    {
      for (var j=0 ; j < this.commandsList[i].commands.length ; j++)
      {
        var simil = this.similarity(this.commandsList[i].commands[j], searchVal);
        if (simil >= 0.14) {
          if (results.indexOf(this.commandsList[i]) == -1) {
            results.push(this.commandsList[i]);
            results[results.indexOf(this.commandsList[i])].similarity = simil;
          } else if (results[results.indexOf(this.commandsList[i])].similarity < simil) {
            results[results.indexOf(this.commandsList[i])].similarity = simil;
          }
        }
      }
    }

    this.selectedItemList = 0;

    return results.sort(function(a, b){
      return b.similarity-a.similarity
   });
  }

  similarity(s1: string, s2: string) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength.toString());
  }

  editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  selectItem(i: number) {
    this.selectedItemList = i;
  }

  setBlockIndex() {
    this.publicBlockIndex = this.editor.blocks.getCurrentBlockIndex();
  }

  doAction(action: string, backspaces: number, originBlockIndex?: number) {
    this.editor.save().then((outputData) => {
      var blockIndex = this.editor.blocks.getCurrentBlockIndex() - 1;
      if (originBlockIndex != null) {
        var blockIndex = originBlockIndex;
      }
      var blockOrigin = outputData.blocks[blockIndex];
      var dataOrigin = blockOrigin.data;
      dataOrigin.text = dataOrigin.text.substring(0, dataOrigin.text.length - backspaces);
      var newBlockIndex = blockIndex + 1;

      if (dataOrigin.text != "") {
        this.editor.blocks.delete(blockIndex);
        this.editor.blocks.insert(blockOrigin.type, dataOrigin, null, blockIndex);
        this.editor.caret.setToBlock(blockIndex); // revisar si genera conflicto al agregar el bloque
      } else {
        this.editor.blocks.delete(blockIndex);
        newBlockIndex = blockIndex;
      }

      // Una vez se ha quitado el comando del bloque, se continua con la ejecución del comando
      switch (action) {
        case 'addText':
          this.editor.blocks.insert('paragraph');
          this.editor.blocks.move(newBlockIndex, blockIndex + 1)
          this.editor.caret.setToBlock(newBlockIndex, "start");
          break;

        case 'addHeader':
          this.editor.blocks.insert('header');
          this.editor.blocks.move(newBlockIndex, blockIndex + 1)
          this.editor.caret.setToBlock(newBlockIndex, "start");
          break;

        case 'save':
          // Cambiar por la funcionalidad
          console.log('Guardado');
          break;
          
        default:
          console.error('Acción no encontrada');
          break;
      }

      // Para finalizar, se resetea el slasher
  
      this.writting = 0;
      this.selectedItemList = 0;
      var divList = document.getElementById('commandsList');
      divList.style.top = '-100%';
      divList.style.left = '-100%';

    }).catch((error) => {
      console.log('Saving failed: ', error)
    });

  }

  scrollCommandPanel() {
    if (this.searchResults.length * 55 > document.getElementById('commandsList').clientHeight) {
      document.getElementById('commandsList').scrollTo(0, this.selectedItemList * 54);
    }
  }
}
