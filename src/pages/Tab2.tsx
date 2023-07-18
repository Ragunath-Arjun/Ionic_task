import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import React, { useState, useRef, useEffect } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonToast
} from '@ionic/react';
import axios from 'axios';
import { useFormik } from 'formik';

const Tab2: React.FC = () => {
  const [data,setdata]=useState([]);
const [isOpen, setIsOpen] = useState(false);
const [isbtn,setbtn]=useState(false);
const[retrive,setretrive]=useState([]);
const[isUpdateOpen , setisUpdateOpen ]= useState(false);
const modal = useRef<HTMLIonModalElement>(null);
const input = useRef<HTMLIonInputElement>(null);

const myFormik = useFormik({
  initialValues: {
    productname: "",
    price: "",
    oldprice: "",
    category: "",
    active: "",
    description: ""

  },
  validate: (values) => {
    let errors = {};

    // if (!values.email) {
    //   errors.email = "Email cannot be blank";
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = "Invalid email address";
    // } else if (values.email.length <= 3) {
    //   errors.email = "Enter Valid email";
    // }
    // if (!values.password) {
    //   errors.password = "Password cannot be blank";
    // } else if (values.password.length <= 5) {
    //   errors.password = "Password length should be more than 5 characters";
    // }
    return errors;
  },
  onSubmit: async (values) => {
    try {
      setbtn(true);
      let createdata = await axios.post("https://64b573c2f3dbab5a95c757c4.mockapi.io/api/product/product",values);
      console.log(createdata);
      

      if(createdata.status === 201)
      {
        setbtn(false);
        setIsOpen(false);
      }
      // 

    } catch (error) {
      console.log("Error", error);
      alert("Validation Error");
    }
  },
});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="col-l2">
        <IonButton expand="block" slot="end" onClick={() => {setIsOpen(true)
        setretrive([])} }>
          Add Product
        </IonButton>
        </div>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Product Card</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          
          <form className="ion-padding" onSubmit={myFormik.handleSubmit}>
            <IonItem>
              <IonLabel position="stacked">Product name</IonLabel>
              <IonInput ref={input} type="text" name='productname' value={retrive?retrive.productname:""} placeholder="Your name" onIonChange={myFormik.handleChange} required/>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Price</IonLabel>
              <IonInput ref={input} type="number" name='price' value={retrive?retrive.price:""} placeholder="Your price" onIonChange={myFormik.handleChange} required/>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Old Price</IonLabel>
              <IonInput ref={input} type="number" name="oldprice" value={retrive?retrive.oldprice:""} placeholder="Your old price" onIonChange={myFormik.handleChange} required/>
            </IonItem>
            <IonItem>
              <IonSelect label="Category" name="category" placeholder="Your Category" value={retrive?retrive.category:""} onIonChange={myFormik.handleChange}  >
              <IonSelectOption value="Vegetables">Vegetables</IonSelectOption>
          <IonSelectOption value="Fruits & Nuts">Fruits & Nuts</IonSelectOption>
          <IonSelectOption value="Dairy & creams">Dairy & creams</IonSelectOption>
          <IonSelectOption value="Packages Food">Packages Food</IonSelectOption>
          <IonSelectOption value="Staples">Staples</IonSelectOption>


              </IonSelect>
            </IonItem>
            <IonItem>
            <IonCheckbox color="primary" checked={retrive.active ? true : false} name="active" value={retrive?retrive.active:""} onIonChange={myFormik.handleChange}>is active</IonCheckbox >
            </IonItem>
            <IonItem>
              <IonTextarea label="Description" placeholder="Your description" name="description" value={retrive?retrive.description:""} onIonChange={myFormik.handleChange} required />
            </IonItem>
<IonButton disabled={isbtn} type="submit" expand='block'>{isbtn ? "Updating..." : "Update"}</IonButton>        
          </form>
        </IonModal>
    </IonPage>
  );
};

export default Tab2;
