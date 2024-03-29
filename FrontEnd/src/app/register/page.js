'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Header from '@/components/Header'
import Image from 'next/image'
import TermsAndConditionsModal from '@/components/TermsAndConditionsModal'

const RegisterPage = () => {
  const carouselImages = [
    '/la-beriso.png',
    '/la-vela-puerca.png',
    '/los-pericos.png',
    '/la-beriso.png',
    '/la-vela-puerca.png',
    '/los-pericos.png',
  ]

  const [showTermsModal, setShowTermsModal] = useState(false)

  const handleTermsClick = (e) => {
    e.preventDefault()
    setShowTermsModal(true)
  }

  const handleCloseTermsModal = () => {
    setShowTermsModal(false)
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Obtener los valores del formulario
    const nombre = e.target.elements.nombre.value
    const apellido = e.target.elements.apellido.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    // Construir el objeto de datos a enviar al backend
    const userData = {
      nombre,
      apellido,
      email,
      password,
    }

    try {
      // Enviar los datos al backend utilizando fetch o axios
      const response = await fetch(
        'https://c16-02-m-node-reactv2.onrender.com/user/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      )

      if (response.ok) {
        // Si la respuesta es exitosa, obtener el nombre de usuario desde la respuest
        const data = await response.json()
        const { nombre, favoritos, id } = data.user
        // console.log({nombre});
        // Almacenar el nombre de usuario en localStorage
        localStorage.setItem('userId', id)
        // console.log(id);
        localStorage.setItem('userName', nombre)
        localStorage.setItem('favorites', JSON.stringify(favoritos))
        // Si la respuesta es exitosa, redirigir al usuario a la página de dashboard
        window.location.href = '/dashboard'
      } else {
        // Si la respuesta es un error, mostrar un mensaje de error al usuario
        console.error('Error al registrar el usuario')
      }
    } catch (error) {
      console.error('Error al enviar los datos al backend', error)
    }
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 p-4">
          <div className="relative">
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full"
            >
              &gt;
            </button>
            <Image
              src={carouselImages[currentImageIndex]}
              alt={`Imagen ${currentImageIndex + 1}`}
              className="w-full"
              width={300}
              height={300}
            />
          </div>
        </div>

        <div className="w-1/2 p-4 flex flex-col items-center">
          <h2 className="text-6xl inter-regular mb-4">Club Festival</h2>
          <Image
            src="/logo.svg"
            alt="Logo"
            className="mb-4"
            width={250}
            height={250}
          />

          <form
            className="w-full max-w-sm flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-gray-700 mb-2 inter-semibold"
              >
                Nombre
              </label>
              <input
                required
                type="text"
                id="nombre"
                className="w-full md:w-96 border border-gray-400 px-4 py-2 rounded-md inter-regular"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="apellido"
                className="block text-gray-700 font-bold mb-2 inter-semibold"
              >
                Apellido
              </label>
              <input
                required
                type="text"
                id="apellido"
                className="w-full md:w-96 border border-gray-400 px-4 py-2 rounded-md inter-regular"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2 inter-semibold"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                className="w-full md:w-96 border border-gray-400 px-4 py-2 rounded-md inter-regular"
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2 inter-semibold"
              >
                Contraseña
              </label>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full md:w-96 border border-gray-400 px-4 py-2 rounded-md pr-10 inter-regular"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-2 transform translate-y-1/2 text-gray-500 focus:outline-none inter-regular"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 font-bold mb-2 inter-semibold"
              >
                Confirmar Contraseña
              </label>
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                className="w-full md:w-96 border border-gray-400 px-4 py-2 rounded-md pr-10 inter-regular"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-1/2 right-2 transform translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mb-4 flex items-center">
              <input required type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700 inter-medium">
                He leído y acepto los&nbsp;
                <Link
                  href="#"
                  onClick={handleTermsClick}
                  className="text-blue-500 inter-semibold"
                >
                  términos y condiciones
                </Link>
                .
                {showTermsModal && (
                  <TermsAndConditionsModal
                    isOpen={true}
                    onClose={handleCloseTermsModal}
                  />
                )}
              </label>
            </div>
            <button
              type="submit"
              className="bg-pink-300 bg-opacity-80 text-gray-800 py-2 px-4 rounded-lg mr-4 inter-semibold"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
