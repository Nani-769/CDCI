import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { SliderModule } from 'primeng/slider';
import { HttpClientModule } from '@angular/common/http'; 
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ImageModule } from 'primeng/image';

import { ChipModule } from 'primeng/chip';
import { BlockUIModule } from 'primeng/blockui';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';

import {ChartModule} from 'primeng/chart';
import {SelectButtonModule} from 'primeng/selectbutton';

import {ProgressBarModule} from 'primeng/progressbar';
import {TimelineModule} from 'primeng/timeline';
// import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    DialogModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    CardModule, 
    ButtonModule, 
    CarouselModule,
    PasswordModule,
    TableModule,
    ChipModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    RadioButtonModule,
    PanelModule,
    RouterModule,
    FormsModule,
    ToastModule,
    AccordionModule,
    MegaMenuModule,
    MenuModule,
    MultiSelectModule,
    OverlayPanelModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    KeyFilterModule,
    FileUploadModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ImageModule,
    BlockUIModule,
    DividerModule,
    SliderModule,
    ChartModule,
    ProgressBarModule,
    TimelineModule,
    SelectButtonModule
  ],
  exports: [
    CommonModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    CarouselModule,
    DialogModule,
    PasswordModule, 
    TableModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    RadioButtonModule,
    PanelModule,
    ChipModule,
    AccordionModule,
    ToastModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MultiSelectModule,
    OverlayPanelModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    BrowserAnimationsModule, 
    KeyFilterModule,
    FileUploadModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    TooltipModule,
    ColorPickerModule,
    ImageModule,
    BlockUIModule,
    DividerModule,
    SliderModule,
    ChartModule,
    ProgressBarModule,
    TimelineModule,
    SelectButtonModule
  ]
})
export class SharedModule { }
