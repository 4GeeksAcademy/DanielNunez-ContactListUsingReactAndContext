import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export function Home(){
	const {store, actions} = useContext(Context)

	const deleteClick = (e, contact)=>{
		e.preventDefault()
		actions.deleteContact(contact.id)
		alert(`${contact.full_name} has been deleted from your agenda`)
	}
	useEffect(()=>{actions.getContacts()}, [])

	return (
		<div className="d-flex flex-column">
			{ store.contacts.map((contact, id)=>(
				<div className="d-flex justify-content-between" id="mainContainer" >
					<div className="container col-3" id='imgContainer'>
						<img src="https://reqres.in/img/faces/1-image.jpg" class="img-thumbnail" alt="..."/>
					</div>
					<div className="d-flex flex-column align-items-start col-6" id='infoContainer'>
						<h4>{contact.full_name}</h4>
						<p>{contact.address}</p>
						<p>{contact.email}</p>
						<p>{contact.phone}</p>
					</div>
					<div className="container col-3" id='buttonsContainer'>
						<button onClick = {(e)=>{deleteClick(e, contact)}} class="btn btn-primary"><i class="bi bi-trash3-fill"></i>Delete</button>
						<Link to={`/edit/${contact.id}`}><button class="btn btn-primary"><i class="bi bi-trash3-fill"></i>Edit</button></Link>
					</div>
				</div>
		))}
		</div>
		
	)
}