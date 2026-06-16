import { ArrowLeftIcon, FilterIcon, Verified } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate,useSearchParams } from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import FilterSidebar from '../components/FilterSidebar'

const Marketplace = () => {

   const [SearchParams]=useSearchParams()
   const search = SearchParams.get("search")

  const navigate=useNavigate()
  const [showFilterPhone, setShowFilterPhone]=useState(false)
  const [filters, setFilters]= useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche:null,
    verified: false,
    monetized: false,
  })

  const {listings}=useSelector(state=> state.listing)
  const filterListings=listings.filter((listing)=>{

    // Platform filter
    if (filters.platform && filters.platform.length > 0) {
      if (!filters.platform.includes(listing.platform)) return false;
    }

    // Price filter
    if (filters.maxPrice){
       if(listing.price > filters.maxPrice) return false
    }

    // Minimum followers
    if (filters.minFollowers){
       if(listing.followers_count < filters.minFollowers) return false
    }

   // Niche Filters
    if (filters.niche && filters.niche.length > 0){
       if(!filters.niche.includes(listing.niche)) return false
    }

    // verification status
    if(filters.verified && listing.verified !== filters.verified) return false

    if(filters.monetized && listing.monetized !== filters.monetized) return false

     if(search){
        const trimmed=search.trim().toLowerCase();
        if(
           !listing.title?.toLowerCase().includes(trimmed) &&
    !listing.username?.toLowerCase().includes(trimmed) &&
    !listing.description?.toLowerCase().includes(trimmed) &&
    !listing.platform?.toLowerCase().includes(trimmed) &&
    !listing.niche?.toLowerCase().includes(trimmed)
        )
        return false
    }
    return true; 
  });




  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex items-center justify-between text-slate-500'>
        <button onClick={()=>{navigate('/'); scrollTo(0,0)}}
          className='flex items-center gap-2 py-5'>
          <ArrowLeftIcon className='size-4'/>
          Back to Home
        </button>
        <button onClick={()=>setShowFilterPhone(true)} className='flex sm:hidden items-center gap-2 py-5'>
          <FilterIcon className='size-4'/>
          Filters
        </button>
      </div>

      <div className='relative flex items-start justify-between gap-8 pb-8'>
        <FilterSidebar setFilters={setFilters} filters={filters} setShowFilterPhone={setShowFilterPhone} showFilterPhone={showFilterPhone}/>
        <div className='flex-1 grid xl:grid-cols-2 gap-4'>
          {filterListings.sort((a,b)=>a.featured ? -1 : b.featured ? 1:0).
          map((listing, index)=>(
            <ListingCard listing={listing} key={index}/>
          ))}
        </div>
      </div>      
    </div>
  )
}

export default Marketplace
