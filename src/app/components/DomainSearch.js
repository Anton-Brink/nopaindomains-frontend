'use client'
import { useState } from 'react'
import { Search } from "@deemlol/next-icons"
import {Star} from "@deemlol/next-icons"

export default function DomainSearch(props) {
    const [domain, setDomain] = useState('google.com')
    const [domainAvailability, setDomainAvailability] = useState('Unavailable')
    console.log("props: ", props)
    const {token} = props;
    const handleCheckDomain = async () => {
        await fetch(`http://localhost:8000/api/external-data?type=domain_lookup&domain=${domain}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).then(async res => {
            const result = await res.json();
            console.log(result);
            setDomainAvailability('Available')
        }).catch(err => {
            console.log(err)
            setDomainAvailability('Unavailable')
        });
    }

    const handleWishlistDomain = async () => {
        // Wishlist logic
    }

    return (
        <div>
            <div className='flex flex-col items-center justify-center text-center'>
                <h3 className='font-bold text-2xl'>How it works</h3>
                <p className='text-sm w-1/2 text-center m-3'>
                    No Pain Domains allows you to lookup whether a specific domain is available and wishlist it so you can
                    receive an email when it does become available.
                </p>
                <p className='text-sm w-1/2 text-center m-3'>
                    Enter domains in the format: mytestdomain.com. Supported domain types include generic TLDs (e.g., .com, .net) and country-specific domains (e.g., .co.za)
                </p>
                <div className='flex flex-row items-center justify-center'>
                    <input
                        type="text"
                        placeholder="Enter a domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className='border border-gray-300 p-2'
                    />
                    <button className='border border-gray-300 p-2 hover:text-blue-600' onClick={handleCheckDomain}><Search size={24}/></button>
                    <button className='border border-gray-300 p-2 hover:text-amber-200' onClick={handleWishlistDomain}><Star size={24} /></button>
                </div>
            </div>
            <div>
                <h3>
                    Result
                </h3>
                <p>The domain &quot;{domain}&quot; is {domainAvailability}</p>
            </div>
        </div>
    )
}