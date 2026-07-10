import React from 'react'
import Categories from './Categories'

export const metadata = {
  title: "Product & Service Categories | Manufacturers, Suppliers & Exporters | Inquiry Bazaar",
  description: "Discover thousands of B2B product and service categories. Find verified manufacturers, suppliers, exporters, traders, dealers, and service providers across India and send inquiries directly through Inquiry Bazaar.",
};

export default async function page() {
  return (
    <Categories />
  )
}
