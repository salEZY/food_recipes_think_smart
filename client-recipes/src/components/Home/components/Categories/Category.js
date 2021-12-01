import React from 'react'
import axios from 'axios'

import './Category.css'

const Category = ({ data }) => {
    const [image, setImage] = React.useState("")

    React.useEffect(() => {
        axios.get(`/api/categories/img/${data._id}`,
            { responseType: 'blob' }
        ).then((data) => {
            console.log(data)
            let imageUrl = URL.createObjectURL(data.data);

            setImage(imageUrl)
        })
    }, [data._id])

    return (
        <div className="category">
            <h3>{data.name}</h3>
            <img src={image} alt="category" />
        </div>
    )
}

export default Category
