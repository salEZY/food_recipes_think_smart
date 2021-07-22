import React from 'react'
import axios from 'axios'

const Category = ({ data }) => {
    const [image, setImage] = React.useState("")

    React.useEffect(() => {
        axios.get(`/api/categories/img/${data._id}`, {
            cache: 'no-cache',
            headers: {
                'Content-Type': 'image/png'
            }
        }).then((data) => {
            setImage(data.data)
        })
    }, [data._id])

    return (
        <div className="category"  >
            <h3>{data.name}</h3>
            <img src={image} alt="category" />
        </div>
    )
}

export default Category
