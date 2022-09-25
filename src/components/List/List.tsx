import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './List.css'

type slideImages = {
  data: [
    {
      id: string
      slideId: string
      fileName: string
      storage: {
        totalSize: number
      }
    }
  ]
}

const SlideList = (): JSX.Element => {
  const [image, setImage] = useState<slideImages>({
    data: [{ id: '', fileName: '', slideId: '', storage: { totalSize: 0 } }]
  })
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      await axios
        .get<slideImages>('https://imgmgt.api.preci.cloud/api/SlideImages', {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
          setImage(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='list_container'>
      <h1>Welcome to the Slide Show</h1>
      <hr />
      <div className='image_list_container'>
        {image.data.map(images => (
          <div
            className='image_container'
            key={images.id}
            onClick={() => navigate(`/image/${images.id}`)}
          >
            <img
              src={`https://wsi001.api.preci.cloud/api/WholeSlideImages/${images.id}/Thumbnails/512x512.jpeg`}
              alt={images.fileName}
            />
            <p>
              <b>Title: </b> {images.fileName}
            </p>
            <p>
              <b>Image Size: </b> {images.storage.totalSize}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlideList
