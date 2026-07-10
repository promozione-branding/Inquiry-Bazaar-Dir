import React from 'react'
import Industries from './Industries'

export const metadata = {
    title: "Industries Directory - Manufacturers, Suppliers & Service Providers | Inquiry Bazaar",
    description: "Browse industries across India and connect with verified manufacturers, suppliers, exporters, traders, dealers and service providers. Explore thousands of products and services on Inquiry Bazaar.",
};

export default async function page() {
    return (
        <Industries />
    )
}
