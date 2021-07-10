import React from 'react'
import axios from 'axios'

import './Categories.css'

const Categories = () => {
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        axios.get('/api/categories').then((data) => {
            console.log(data)
            setCategories(data.data)
        })
    },[])
    return (
        <div className="categories-div">
            <h2>Categories</h2>
            <p className="cat-para">Below you can find the list of available categories. Each category contains many tasty recipe to satisfy your hunger. Choose wisely!</p>
            <div className="categories-holder">
               {categories.map((c) => {
                   return(
                    <div className="category">
                   <h3>{c.name}</h3>
                   </div>
                   )
               })} 
          </div>
        </div>
    )
}

export default Categories
