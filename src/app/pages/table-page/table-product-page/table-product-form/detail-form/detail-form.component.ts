import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/model/products.model';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss'],
})
export class DetailFormComponent implements OnInit {
  public defaultimg = {
    img1: 'assets/image/default_Img_x.jpg',
    img2: 'assets/image/default_Img_y.jpg',
  };
  public controlDetail = {
    developer: 'developer',
    categlory: 'categlory',
    description: 'description',
    feature: 'feature',
    systemrequiment: 'systemrequiment',
    rating: 'rating',
    imgList: 'imgList',
    url: 'url',
    title: 'title',
    os: 'os',
    cpu: 'cpu',
    memory: 'memory',
    gpu: 'gpu',
    directX: 'directX',
    soundCard: 'soundCard',
  };
  public displayModalCategolry!: boolean;
  public displayModdalFeature!: boolean;
  public productDetailForm!: FormGroup;
  @Input() categlorys!: Product.Categlory[];
  @Input() developers!: Product.Developer[];
  @Input() features!: Product.Feature[];
  constructor(
    private formBuilder: FormBuilder,

  ) {}
  @Input() set productDetail(data: Product.Product) {
    const me = this;
    me.initFormDetail();
    setTimeout(() => {
      me.productDetailForm.patchValue({
        ...data,
        [me.controlDetail.developer]: data?.detail?.developer._id,
      });
  
      data?.detail?.categlory.map((item) => {
        return me.categloryList.push(me.formBuilder.control(item));
      });
      data?.detail?.feature.map((item) => {
        return me.featureList.push(me.formBuilder.control(item));
      });
      data?.detail?.imgList.map((img) => {
        return me.imgList.push(me.createImg(img.url, img.title));
      });
      data?.detail?.systemrequiment.map((item) => {
        return me.systemrequimentList.push(me.createSystemRequiment(item));
      });
    }, 1000);


  }
  @Output() productDetailChange = new EventEmitter<Product.Detail>();
  private initFormDetail() {
    const me = this;
    me.productDetailForm = me.formBuilder.group({
      [me.controlDetail.developer]: ['', Validators.required],
      [me.controlDetail.categlory]: me.formBuilder.array([]),
      [me.controlDetail.description]: ['', Validators.required],
      [me.controlDetail.feature]: me.formBuilder.array([]),
      [me.controlDetail.systemrequiment]: me.formBuilder.array([]),
      [me.controlDetail.imgList]: me.formBuilder.array([]), 
    });
  }

  public addCateglory(item: Product.Categlory) {
    const me = this;
    const a = me.categloryList.controls.map((cate) => {
      return cate.value._id;
    });
    if (a.includes(item._id)) {
      alert("asd")
    } else {
      me.categloryList.push(me.formBuilder.control(item));
      console.log(me.productDetailForm.value);
    }
  }
  public createCateglory(item: Product.Categlory) {
    const me = this;
    return me.formBuilder.group({
      cateId: [item._id, Validators.required],
      cateName: [item.cateName],
      description: [item.description],
    });
  }
  public removeCateglory(item: any) {
    const me = this;
    me.categloryList.removeAt(item);
  }

  public addFeature(item: Product.Feature) {
    const me = this;
    const a = me.featureList.controls.map((fea) => {
      return fea.value._id;
    });
    if (a.includes(item._id)) {
      // alert('co roi');
    } else {
      me.featureList.push(me.formBuilder.control(item));
    }
  }
  public removeFeature(item: any) {
    const me = this;
    me.featureList.removeAt(item);
  }
  //handle Img
  public addImage(url: string, title: string) {
    const me = this;
    me.imgList.push(me.createImg(url, title));
  }

  public deleteImg(index: number) {
    const me = this;
    me.imgList.removeAt(index);
    console.log(me.imgList.value);
  }
  private createImg(url: any, title: any) {
    const me = this;
    return me.formBuilder.group({
      [me.controlDetail.url]: [url, Validators.required],
      [me.controlDetail.title]: [title],
    });
  }
  public createSystemRequiment(item: Product.Systemrequiment) {
    const me = this;
    return me.formBuilder.group({
      [me.controlDetail.os]: [item.os, Validators.required],
      [me.controlDetail.cpu]: [item.cpu, Validators.required],
      [me.controlDetail.memory]: [item.memory, Validators.required],
      [me.controlDetail.gpu]: [item.gpu, Validators.required],
      [me.controlDetail.directX]: [item.directX, Validators.required],
      [me.controlDetail.soundCard]: [item.soundCard, Validators.required],
    });
  }

  public changeProductDetail() {
    const me = this;
    me.productDetailChange.emit(me.productDetailForm.value);
    console.log(me.productDetailForm.value)
  }
  get imgList(): FormArray {
    const me = this;
    return me.productDetailForm.get(me.controlDetail.imgList) as FormArray;
  }
  get categloryList(): FormArray {
    const me = this;
    return me.productDetailForm.get(me.controlDetail.categlory) as FormArray;
  }
  get featureList(): FormArray {
    const me = this;
    return me.productDetailForm.get(me.controlDetail.feature) as FormArray;
  }
  get systemrequimentList(): FormArray {
    const me = this;
    return me.productDetailForm.get(
      me.controlDetail.systemrequiment
    ) as FormArray;
  }
  ngOnInit(): void {
    const me = this;
    me.initFormDetail();
    setTimeout(() => {
      console.log(me.productDetailForm.value)
    }, 2000);
    console.log("asd")
  }
}
