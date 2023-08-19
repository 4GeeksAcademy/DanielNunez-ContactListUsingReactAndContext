import { useContext, useEffect, useState } from "react";
import React from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export function EditForm(){
    
    const {store, actions} = useContext(Context)
    const params = useParams()
    useEffect(()=>{actions.getContact(params.id)},[])    

    const handleClick = (e)=>{
        e.preventDefault()
        const contact = {
            "full_name": document.getElementById('inputName').value,
            "email": document.getElementById('InputEmail').value,
            "agenda_slug": 'argelio',
            "address": document.getElementById('inputAddress').value,
            "phone": document.getElementById('inputPhone').value
        }
        console.log(contact)
        actions.updateContact(contact, params.id)
        alert('Your contact has been updated')     
    }
    
    return (
        <div className="container-fluid">
            <form>
                <div class="mb-3">
                    <label for="inputName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="inputName" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="InputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="inputPhone" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="inputPhone" />
                </div>
                <div class="mb-3">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input type="text" class="form-control" id="inputAddress"/>
                </div>
                <div className="container-fluid">
                     <button onClick = {(e)=>{handleClick(e)}} type="submit" class="btn btn-primary">Save</button>
                     <Link to='/'>Go back to your contacts</Link>
                </div>
           </form>
        </div>
    )
}