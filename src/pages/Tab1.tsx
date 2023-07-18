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
import './Tab1.css';


import { OverlayEventDetail } from '@ionic/core/components';
import axios from 'axios';
import { useFormik } from 'formik';

function Example() {
const [data,setdata]=useState([]);
const [isOpen, setIsOpen] = useState(false);
const [isbtn,setbtn]=useState(false);
const[retrive,setretrive]: any=useState({
  productname: "",
  price: "",
  oldprice: "",
  category: "",
  active: "",
  description: ""
});

console.log(retrive)
const[isUpdateOpen , setisUpdateOpen ]= useState(false);



// useEffect to fetch data from the API during initial Loading

useEffect(()=>{
  getdata();
    },[retrive,isUpdateOpen]);

//Formik to read,validate and store data to API
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

  let getdata= async() =>{
    try {
      let datas=await axios.get("https://64b573c2f3dbab5a95c757c4.mockapi.io/api/product/product");
    setdata(datas.data);
    } catch (error) {
      console.log("get data error",error)
    }
    
 }
  
 
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }


  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  const handleEdit = async(id: number) =>{
let update = await axios.get(`https://64b573c2f3dbab5a95c757c4.mockapi.io/api/product/product/${id}`);

// myFormik.setValues(update.data);

// setIsOpen(true);
console.log(update);
console.log(update.data);

setretrive(update.data);
console.log(retrive);
  }

  const updatedata=async(e: any)=>{
    e.preventDefault()
    console.log(retrive,"retrivessss")
    let update = await axios.put(`https://64b573c2f3dbab5a95c757c4.mockapi.io/api/product/product/${retrive.id}`,retrive);
    console.log("Updateed",update);

    if(update.status === 200)
    {
      setisUpdateOpen(false);
    }
  }

  const handleDelete= async(id: number) =>{
   let confirm = window.confirm("Are you sure you want to delete")
   
   if(confirm){
    await axios.delete(`https://64b573c2f3dbab5a95c757c4.mockapi.io/api/product/product/${id}`)
   }
getdata();
  }

  const updatehandlechange = (e:any) =>{
const{name,value}=e.target;
setretrive((set:any)=>({...set,[name]:value}))

  }
  return (
    
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products Modal</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* //Table data */}
<div className="container">
<div className="row">
<div className="ion-padding ">
        <div className="col-l2">
        <IonButton expand="block" slot="end" onClick={() => {setIsOpen(true)} }>
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
              <IonInput ref={input} type="text" name='productname'  placeholder="Your name" onIonChange={myFormik.handleChange} required/>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Price</IonLabel>
              <IonInput ref={input} type="number" name='price'  placeholder="Your price" onIonChange={myFormik.handleChange} required/>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Old Price</IonLabel>
              <IonInput ref={input} type="number" name="oldprice"  placeholder="Your old price" onIonChange={myFormik.handleChange} required/>
            </IonItem>
            <IonItem>
              <IonSelect label="Category" name="category" placeholder="Your Category"  onIonChange={myFormik.handleChange}  >
              <IonSelectOption value="Vegetables">Vegetables</IonSelectOption>
          <IonSelectOption value="Fruits & Nuts">Fruits & Nuts</IonSelectOption>
          <IonSelectOption value="Dairy & creams">Dairy & creams</IonSelectOption>
          <IonSelectOption value="Packages Food">Packages Food</IonSelectOption>
          <IonSelectOption value="Staples">Staples</IonSelectOption>


              </IonSelect>
            </IonItem>
            <IonItem>
            <IonCheckbox color="primary" name="active"  onIonChange={myFormik.handleChange}>is active</IonCheckbox >
            </IonItem>
            <IonItem>
              <IonTextarea label="Description" placeholder="Your description" name="description" onIonChange={myFormik.handleChange} required />
            </IonItem>
 <IonButton disabled={isbtn} type="submit" expand='block'>{isbtn ? "Submitting..." : "Submit"}</IonButton>
            
          </form>
        </IonModal>
      </div>
</div>

<div className="row">
<table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Old Price</th>
      <th scope="col">Category</th>
      <th scope="col">is Active</th>
      <th scope="col">Description</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>

  
  <tbody>
  {data.map((ele:any,index)=>{
        return ( <>
        <tr>
      <th scope="row">{index}</th>
      <td>{ele.productname}</td>
      <td>{ele.price}</td>
      <td>{ele.oldprice}</td>
      <td>{ele.category}</td>
      <td>{ele.active}</td>
      <td>{ele.description}</td>

      <td>
        <IonButton id="open-modal" onClick={()=>{handleEdit(ele.id); setisUpdateOpen(true)}}>Edit</IonButton>
        <IonButton onClick={()=>{handleDelete(ele.id)}} color="danger">Delete</IonButton></td>
    </tr>
        </>
        )
      })}
  </tbody>
</table>
        
  </div>

   </div>
      
      {/* Second Modal */}
        <IonModal isOpen={isUpdateOpen}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setisUpdateOpen(false)}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Product Card</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          
          <form className="ion-padding" onSubmit={(e) => updatedata(e)}>
            <IonItem>
              <IonLabel position="stacked">Product name</IonLabel>
              <IonInput ref={input} type="text" name='productname' value={retrive?retrive.productname:""} placeholder="Your name" onIonChange={updatehandlechange} required/>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Price</IonLabel>
              <IonInput ref={input} type="number" name='price' value={retrive?retrive.price:""} placeholder="Your price" onIonChange={updatehandlechange} required/>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Old Price</IonLabel>
              <IonInput ref={input} type="number" name="oldprice" value={retrive?retrive.oldprice:""} placeholder="Your old price" onIonChange={updatehandlechange} required/>
            </IonItem>
            <IonItem>
              <IonSelect label="Category" name="category" placeholder="Your Category" value={retrive?retrive.category:""} onIonChange={updatehandlechange}  >
              <IonSelectOption value="Vegetables">Vegetables</IonSelectOption>
          <IonSelectOption value="Fruits & Nuts">Fruits & Nuts</IonSelectOption>
          <IonSelectOption value="Dairy & creams">Dairy & creams</IonSelectOption>
          <IonSelectOption value="Packages Food">Packages Food</IonSelectOption>
          <IonSelectOption value="Staples">Staples</IonSelectOption>


              </IonSelect>
            </IonItem>
            <IonItem>
            <IonCheckbox color="primary" checked={retrive.active ? true : false} name="active" value={retrive?retrive.active:""} onIonChange={updatehandlechange}>is active</IonCheckbox >
            </IonItem>
            <IonItem>
              <IonTextarea label="Description" placeholder="Your description" name="description" value={retrive?retrive.description:""} onIonChange={updatehandlechange} required />
            </IonItem>
<IonButton disabled={isbtn} type="submit" expand='block' >{isbtn ? "Updating..." : "Update"}</IonButton>        
          </form>
        </IonModal>
    </IonPage>
    </>
  );
}

export default Example;