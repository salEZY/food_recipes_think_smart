import React from 'react'
import axios from 'axios'


import './Categories.css'
import Category from './Category'
import Loader from '../../../Loader/Loader'

const Categories = () => {
    const [categories, setCategories] = React.useState([])
    const [loaded, setLoaded] = React.useState(true)

    React.useEffect(() => {
        setLoaded(true)
        axios.get('/api/categories').then((data) => {
            setCategories(data.data)

        })
        setLoaded(false)
    }, [])

    return (
        <>
            {loaded ? <Loader /> : (
                <div className="categories-div">
                    <h2>Categories</h2>
                    <p className="cat-para">Below you can find the list of available categories. Each category contains many tasty recipes to satisfy your hunger. Choose wisely!</p>
                    <div className="categories-holder">
                        {categories && categories.map((c) => {
                            return (
                                <Category data={c} key={c.name} />
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default Categories
