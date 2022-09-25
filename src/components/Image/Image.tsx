import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify'
import './Image.css'

type slideImage = {
  data: {
    id: string
    slideId: string
    fileName: string
    storage: {
      totalSize: number
    }
  }
}

const imageUrl: string = 'https://wsi001.api.preci.cloud/api/WholeSlideImages/'

const SlideImage = (): JSX.Element => {
  const [image, setImage] = useState<slideImage>({
    data: { id: '', slideId: '', fileName: '', storage: { totalSize: 0 } },
  })
  const { id } = useParams()
  const fetchData = async () => {
    try {
      await axios
        .get<slideImage>(
          `https://imgmgt.api.preci.cloud/api/SlideImages/${id}`,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((res) => {
          setImage(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  })

  return (
    <div className="container_image">
      <div key={image.data.id}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: image.data.fileName,
              isFluidWidth: true,
              src: imageUrl + image.data.id + '/Thumbnails/512x512.jpeg',
            },
            largeImage: {
              src: imageUrl + image.data.id + '/Thumbnails/512x512.jpeg',
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerDimensions: {
              width: '150%',
              height: '150%',
              enlargedImageContainerClassName: 'l_image'
            },
          }}
        />
        <p>{image.data.fileName}</p>
      </div>
    </div>
  )
}

export default SlideImage
