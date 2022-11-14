import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { Product } from 'src/app/shared/model/products.model';
import { FeatureService } from 'src/app/shared/service/feature.service';

@Component({
  selector: 'app-table-feature-page',
  templateUrl: './table-feature-page.component.html',
  styleUrls: ['./table-feature-page.component.scss']
})
export class TableFeaturePageComponent extends BaseComponent implements OnInit {

  constructor(private featureSv: FeatureService, private formBd: FormBuilder) {
    super();
  }
  public features!:Product.Feature[];
  public feature!: Product.Feature;
  public createNew!: boolean;
  public option!: string[];
  public select!: string;
  public displayModal!: boolean;
  public controlName = {
    featureName: 'featureName',
    description: 'description',
  };
  public featureForm!: FormGroup;
  public createFeature() {
    const me = this;
    me.displayModal = true;
    me.featureForm.reset();
    me.createNew = true;
  }
  public getFeatures(): void {
    const me = this;
    me.featureSv
      .getFeatures()
      .pipe(
        takeUntil(me.destroy$),
        tap((data) => {
          me.features = data;
        })
      )
      .subscribe();
  }
  public getFeature(id: string): void {
    const me = this;
    me.featureSv
      .getFeature(id)
      .pipe(
        takeUntil(me.destroy$),
        tap((data) => {
          me.feature = data;
          console.log(me.feature);
          me.featureForm.patchValue({
            [me.controlName.featureName]: data.featureName,
            [me.controlName.description]: data.description,
          });
        })
      )
      .subscribe({
        next: (_req) => {
          console.log(me.feature);
          me.getFeatures();
          me.displayModal = true;
          me.createNew = false;
        },
      });
  }
  public confirmCreate() {
    const me = this;
    me.featureSv
      .createFeature(me.featureForm.value)
      .pipe(takeUntil(me.destroy$))
      .subscribe({
        next: (_req) => {
          me.getFeatures();
          me.displayModal = false;
        },
      });
  }
  public confirmUpdate() {
    const me = this;
    me.featureSv
      .updateFeature(me.feature._id,me.featureForm.value)
      .pipe(
        takeUntil(me.destroy$),
      )
      .subscribe({
        next: (_req) => {
          me.getFeatures();
          me.displayModal = false;
        },
      });
  }
  private initForm() {
    const me = this;
    me.featureForm = me.formBd.group({
      [me.controlName.featureName]: ['', Validators.required],
      [me.controlName.description]: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const me = this;
    me.getFeatures();
    me.initForm();
  }
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}