import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiempoTranscurridoPipe } from './tiempo-transcurrido.pipe';

@NgModule ( {
  declarations: [	
      TiempoTranscurridoPipe
   ],
  imports: [CommonModule],
  exports: [TiempoTranscurridoPipe]
})
export class PipesModule { }
