'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ProjectImage } from '@/modules/shared/utils/types'
import { Modal } from '@/modules/shared/components/ui'

interface ProjectGalleryProps {
  images: ProjectImage[]
  projectTitle: string
  className?: string
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  projectTitle,
  className = '',
}) => {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openImageModal = (image: ProjectImage) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const primaryImage = images.find(img => img.isPrimary) || images[0]
  const otherImages = images.filter(img => img.id !== primaryImage?.id)

  if (images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500">No images available for this project</p>
      </div>
    )
  }

  return (
    <>
      <div className={`space-y-4 ${className}`}>
        {primaryImage && (
          <div 
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openImageModal(primaryImage)}
          >
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              width={800}
              height={320}
              className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={true}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            {primaryImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white text-sm">{primaryImage.caption}</p>
              </div>
            )}
          </div>
        )}

        {otherImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherImages.map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openImageModal(image)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={200}
                  height={128}
                  className="w-full h-24 md:h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 25vw, 20vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="xl"
        title={`${projectTitle} - Image Gallery`}
      >
        {selectedImage && (
          <div className="space-y-4">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              sizes="80vw"
              priority={true}
            />
            {selectedImage.caption && (
              <p className="text-gray-600 text-center">{selectedImage.caption}</p>
            )}
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-gray-500">
                Image {images.findIndex(img => img.id === selectedImage.id) + 1} of {images.length}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
                    setSelectedImage(images[prevIndex])
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
                    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
                    setSelectedImage(images[nextIndex])
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ProjectGallery