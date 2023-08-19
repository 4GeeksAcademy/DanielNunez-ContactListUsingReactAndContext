const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			single: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: async ()=> {
				try {
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/argelio')
					const data = await response.json()
					console.log(data)
					setStore({
						contacts: data
					})
				} catch (error) {
					console.log(error)
				}
			},

			addContact: async (contact)=> {
				let myBody = JSON.stringify(contact)
				let options = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: myBody,
					redirect: 'follow'
				}

				const store = getStore()
				setStore({
					contacts: [...store.contacts, contact]
				})

				try {
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', options)
					const data = await response.json()
					console.log(data)
					return data
				} catch (error) {
					console.log(error)
				}
			},

			deleteContact: async (contact_id)	=>{
				const store = getStore()
				let options = {
					method: "DELETE",
					redirect: "follow"

				}

				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact_id}`, options)
					const data = await response.json()
					if(response.ok){
						const newContacts = store.contacts.filter(contact => contact.id !== contact_id)
						setStore({
							contacts: newContacts
						})
					}
					return data
					

				} catch (error) {
					console.log(error)
				}
			},

			getContact: async (id)=>{
				const contact_id = parseInt(id)
				const store = getStore()
				const options = {
					method: 'GET',
					redirect: 'follow'
				}
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact_id}`, options)
					const data = await response.json()
					setStore({
						single: data[0]
						})
					document.getElementById("inputName").value = store.single.full_name
					document.getElementById("InputEmail").value = store.single.email
					document.getElementById("inputPhone").value = store.single.phone
					document.getElementById("inputAddress").value = store.single.address
					return data
				} catch (error) {
					console.log(error)
				}
			},

			updateContact: async (contact, id)=>{
				//const store = getStore()
				const myBody = JSON.stringify(contact)
				const options = {
					method: 'PUT',
					headers: {"Content-Type": "application/json"},
					body: myBody,
					redirect: "follow"
				}
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, options)
					const data = await response.json()
					return data	
				} catch (error) {
					console.log(error)
				}

			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;