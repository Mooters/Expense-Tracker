import React, { useState, useEffect } from 'react'
import axios from 'axios'

const List = (props) => {
  return (
    <div className="row" style={{display : 'flex', justContent : 'center', alignItems : 'center'}}>

    <div className="col-sm-3">
     <h3>{props.name}</h3>
    </div>

    <div className="col-sm-3">
     <h3>${props.number}</h3>
    </div>

    <div className="col-sm-3">
     <h3>{props.category}</h3>
    </div>

    <div className="col-sm-3">
      <button className="btn btn-danger" onClick={props.deletema}><i className="glyphicon glyphicon-remove"></i></button>
    </div>

    </div>
  )
}

const App = () => {

  // grand array of entries
  const [ items, setItems ] = useState([])

  // get data from server
  useEffect(() => {

    axios
      .get('https://mooter-backend-test.herokuapp.com/api/datama')
      .then(response => {
          console.log('database promise fulfilled')
          setItems(response.data)
      })
  }, [])

  // name, cost, category field char arrays
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ newCat, setNewCat] = useState('')

  // handle name and data field updates
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleCatChange = (event) => {
    console.log(event.target.value)
    setNewCat(event.target.value)
  }

  // add an item
  const addItem = (event) => {
    event.preventDefault()

    const entry = {
      name: newName,
      number: newNum,
      category: newCat,
    }

    const url = 'https://mooter-backend-test.herokuapp.com/api/datama'

    axios
      .post(url, entry)
      .then(() => {
        // get updated list
        return axios.get('https://mooter-backend-test.herokuapp.com/api/datama')
      })
      .then(response => {
          console.log('add promise fulfilled')
          setItems(response.data)
      })

    setNewName('')
    setNewNum('')
    setNewCat('')
  }

  // delete an entry
  const deleter = id => {
    window.confirm("Are you sure you want to delete this entry?")
    const url = `https://mooter-backend-test.herokuapp.com/api/datama/${id}`

    axios
      .delete(url)
      .then(() => {
        // get updated list
        return axios.get('https://mooter-backend-test.herokuapp.com/api/datama')
      })
      .then(response => {
          console.log('delete promise fulfilled')
          setItems(response.data)
      })
  }

  // render site
  return (
    <>
      <div className="container-fluid">
        <div className="row">
        <div className="jumbotron" style={{backgroundColor : '#34ebc3'}}>
          <h1>Expense Tracker</h1>
          <p>Use me to watch your budget! Price field is mandatory.</p>
        </div>
        </div>
      </div>

      <div className="container text-center">
      <form onSubmit={addItem}>

        <div className="col-sm-3">
          <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-shopping-cart"></i></span>
          <input className="form-control"
            placeholder="Burger"
            value={newName}
            onChange={handleNameChange}
          />
          </div>
        </div>

        <div className="col-sm-3">
          <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-usd"></i></span>
          <input className="form-control"
            placeholder="5.99"
            value={newNum}
            onChange={handleNumChange}
          />
          </div>
        </div>

        <div className="col-sm-3">
          <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-menu-hamburger"></i></span>
          <input className="form-control"
            placeholder="Food"
            value={newCat}
            onChange={handleCatChange}
          />
          </div>
        </div>

        <div className="col-sm-3">
          <div className="input-group">
          <button className="btn btn-default" type="submit">Add item!</button>
          </div>
        </div>

      </form>
      </div>

      <div className="container">
        <div className="page-header">
          <h1>Items</h1>
        </div>
      </div>

      <div className="container text-center">
        {items.map(x =>
            <List
              key={x.id}
              name={x.name}
              number={x.number}
              category={x.category}
              deletema={() => deleter(x.id)}
            />
          )}
      </div>
    </>
  )
}

export default App
